-- ============================================================
-- Clocksy — Supabase Schema
-- Supabase SQL Editor'a bu dosyayı yapıştırın ve çalıştırın
-- ============================================================

-- 1. PROFİLER (auth.users'ı genişletir)
create table if not exists profiles (
  id         uuid references auth.users on delete cascade primary key,
  role       text not null default 'customer' check (role in ('customer', 'business_owner')),
  full_name  text,
  phone      text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Yeni kullanıcı kaydolduğunda otomatik profil oluştur
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'customer'),
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- 2. İŞLETMELER
create table if not exists businesses (
  id           uuid default gen_random_uuid() primary key,
  owner_id     uuid references profiles(id) on delete cascade not null,
  slug         text unique not null,
  name         text not null,
  type         text not null,
  address      text,
  phone        text,
  about        text,
  verified     boolean default false,
  rating       numeric(3,2) default 0,
  review_count int default 0,
  price_range  text,
  lat          numeric,
  lng          numeric,
  created_at   timestamptz default now()
);

-- 3. ÇALIŞMA SAATLERİ
create table if not exists business_hours (
  id           uuid default gen_random_uuid() primary key,
  business_id  uuid references businesses(id) on delete cascade not null,
  day_of_week  int not null check (day_of_week between 0 and 6), -- 0=Pazar
  open_time    time,
  close_time   time,
  is_closed    boolean default false,
  unique (business_id, day_of_week)
);

-- 4. HİZMETLER
create table if not exists business_services (
  id               uuid default gen_random_uuid() primary key,
  business_id      uuid references businesses(id) on delete cascade not null,
  name             text not null,
  duration_minutes int not null,
  price            int not null,
  description      text,
  is_active        boolean default true,
  created_at       timestamptz default now()
);

-- 5. PERSONEL
create table if not exists staff (
  id          uuid default gen_random_uuid() primary key,
  business_id uuid references businesses(id) on delete cascade not null,
  name        text not null,
  bio         text,
  avatar_url  text,
  is_active   boolean default true,
  created_at  timestamptz default now()
);

-- 6. RANDEVULAR
create table if not exists appointments (
  id               uuid default gen_random_uuid() primary key,
  customer_id      uuid references profiles(id) on delete set null,
  business_id      uuid references businesses(id) on delete cascade not null,
  service_id       uuid references business_services(id) on delete set null,
  staff_id         uuid references staff(id) on delete set null,
  appointment_date date not null,
  appointment_time time not null,
  status           text not null default 'pending'
                   check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  notes            text,
  price            int,
  created_at       timestamptz default now()
);

-- 7. YORUMLAR
create table if not exists reviews (
  id             uuid default gen_random_uuid() primary key,
  appointment_id uuid references appointments(id) on delete set null,
  customer_id    uuid references profiles(id) on delete set null,
  business_id    uuid references businesses(id) on delete cascade not null,
  rating         int not null check (rating between 1 and 5),
  comment        text,
  created_at     timestamptz default now()
);

-- Rating otomatik güncelleme
create or replace function update_business_rating()
returns trigger language plpgsql as $$
begin
  update businesses
  set
    rating = (select round(avg(rating)::numeric, 2) from reviews where business_id = coalesce(new.business_id, old.business_id)),
    review_count = (select count(*) from reviews where business_id = coalesce(new.business_id, old.business_id))
  where id = coalesce(new.business_id, old.business_id);
  return new;
end;
$$;

drop trigger if exists on_review_change on reviews;
create trigger on_review_change
  after insert or update or delete on reviews
  for each row execute procedure update_business_rating();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table profiles          enable row level security;
alter table businesses        enable row level security;
alter table business_hours    enable row level security;
alter table business_services enable row level security;
alter table staff             enable row level security;
alter table appointments      enable row level security;
alter table reviews           enable row level security;

-- profiles
create policy "Herkes kendi profilini okur" on profiles for select using (auth.uid() = id);
create policy "Herkes kendi profilini günceller" on profiles for update using (auth.uid() = id);

-- businesses — herkes okur, sadece owner yazar
create policy "İşletmeler herkese açık" on businesses for select using (true);
create policy "Owner işletmesini yönetir" on businesses for all using (owner_id = auth.uid());

-- business_hours — herkes okur, owner yazar
create policy "Saatler herkese açık" on business_hours for select using (true);
create policy "Owner saatleri yönetir" on business_hours for all
  using (business_id in (select id from businesses where owner_id = auth.uid()));

-- business_services — herkes okur, owner yazar
create policy "Hizmetler herkese açık" on business_services for select using (true);
create policy "Owner hizmetleri yönetir" on business_services for all
  using (business_id in (select id from businesses where owner_id = auth.uid()));

-- staff — herkes okur, owner yazar
create policy "Personel herkese açık" on staff for select using (true);
create policy "Owner personeli yönetir" on staff for all
  using (business_id in (select id from businesses where owner_id = auth.uid()));

-- appointments — müşteri kendi randevularını, kuaför işletmesinin randevularını görür
create policy "Müşteri kendi randevularını görür" on appointments for select
  using (customer_id = auth.uid());
create policy "kuaför işletme randevularını görür" on appointments for select
  using (business_id in (select id from businesses where owner_id = auth.uid()));
create policy "Giriş yapan müşteri randevu alır" on appointments for insert
  with check (customer_id = auth.uid());
create policy "kuaför randevu durumunu günceller" on appointments for update
  using (business_id in (select id from businesses where owner_id = auth.uid()));
create policy "Müşteri randevusunu iptal eder" on appointments for update
  using (customer_id = auth.uid());

-- reviews — herkes okur, müşteri yorum yapar
create policy "Yorumlar herkese açık" on reviews for select using (true);
create policy "Müşteri yorum yapar" on reviews for insert
  with check (customer_id = auth.uid());

-- ============================================================
-- ÖRNEK VERİ (isteğe bağlı, geliştirme için)
-- ============================================================

-- Not: business_owner hesabı oluşturup ID'yi buraya yazın
-- insert into businesses (owner_id, slug, name, type, address, phone, about, price_range) values
-- ('owner-uuid-buraya', 'atelier-41', 'Atelier 41', 'Premium kuaför',
--  'Cumhuriyet Cad. No:41, Merkez, Kütahya', '0274 312 41 41',
--  'Kütahya''nın en köklü premium kuaföri.', '₺₺₺');
