-- ============================================================
-- Clocksy — Dummy Data Seed
-- Supabase SQL Editor'da çalıştırın
-- ============================================================

-- ============================================================
-- 1. İŞLETMELER (owner = cemal@test.com)
-- ============================================================

insert into businesses (id, owner_id, slug, name, type, address, phone, about, price_range, rating, review_count, verified, lat, lng) values

('11111111-0000-0000-0000-000000000001',
 (select id from profiles where id in (select id from auth.users where email = 'cemal@test.com')),
 'atelier-41', 'Atelier 41', 'Premium Kuaför',
 'Cumhuriyet Cad. No:41, Merkez, Kütahya', '0274 312 41 41',
 'Kütahya''nın en köklü premium kuaförü. 2018''den bu yana geleneksel teknikleri modern estetikle harmanlıyoruz.',
 '₺₺₺', 4.9, 0, true, 39.4128, 29.9831),

('11111111-0000-0000-0000-000000000002',
 (select id from profiles where id in (select id from auth.users where email = 'cemal@test.com')),
 'tahta-barber', 'Tahta Barber Co.', 'Klasik Kuaför',
 'İnönü Cad. No:12, Merkez, Kütahya', '0274 223 12 34',
 'Rustik atmosfer, geleneksel kesim. Şehrin kalbinde klasik bir kuaför deneyimi.',
 '₺₺', 4.8, 0, true, 39.4201, 29.9712),

('11111111-0000-0000-0000-000000000003',
 (select id from profiles where id in (select id from auth.users where email = 'cemal@test.com')),
 'kutahya-sac-tasarim', 'Kütahya Saç Tasarım', 'Unisex Kuaför',
 'Atatürk Bulvarı No:78, Kütahya', '0274 335 78 78',
 'Kadın ve erkek saç tasarımında 15 yıllık deneyim. Boya, keratin ve özel bakım konusunda öncüyüz.',
 '₺₺₺', 0, 0, true, 39.4089, 29.9944),

('11111111-0000-0000-0000-000000000004',
 (select id from profiles where id in (select id from auth.users where email = 'cemal@test.com')),
 'cini-lounge', 'Çini Lounge', 'Lüks Kuaför',
 'Germiyan Sk. No:5, Merkez, Kütahya', '0274 411 05 05',
 'Çini motiflerinden ilham alan lüks bir kuaför deneyimi. Premium ürünler ve özel danışmanlık.',
 '₺₺₺₺', 0, 0, true, 39.4156, 29.9867),

('11111111-0000-0000-0000-000000000005',
 (select id from profiles where id in (select id from auth.users where email = 'cemal@test.com')),
 'beyaz-salon', 'Beyaz Salon', 'Erkek Kuaförü',
 'Parmakkapı Mah. No:3, Kütahya', '0274 228 33 33',
 'Mahallenizin güvenilir, uygun fiyatlı kuaförü. Hızlı servis, kaliteli kesim.',
 '₺', 0, 0, false, 39.4055, 29.9755),

('11111111-0000-0000-0000-000000000006',
 (select id from profiles where id in (select id from auth.users where email = 'cemal@test.com')),
 'germiyan-studyo', 'Germiyan Stüdyo', 'Erkek Bakım Merkezi',
 'Germiyan Cad. No:19, Kütahya', '0274 322 19 19',
 'Modern erkek bakım merkezi. Saç, sakal ve cilt bakımında uzman ekibimizle hizmetinizdeyiz.',
 '₺₺', 0, 0, true, 39.4178, 29.9803)

on conflict (slug) do update set
  owner_id  = excluded.owner_id,
  name      = excluded.name,
  type      = excluded.type,
  address   = excluded.address,
  phone     = excluded.phone,
  about     = excluded.about,
  price_range = excluded.price_range,
  verified  = excluded.verified;

-- ============================================================
-- 2. HİZMETLER
-- ============================================================

insert into business_services (business_id, name, duration_minutes, price, description, is_active) values

-- Atelier 41
('11111111-0000-0000-0000-000000000001', 'Klasik Saç Kesimi', 30, 450, 'Makas ile özenli kesim, yıkama ve fön dahil', true),
('11111111-0000-0000-0000-000000000001', 'Sakal Tasarımı', 20, 300, 'Şekillendirme ve düzeltme', true),
('11111111-0000-0000-0000-000000000001', 'Saç + Sakal Kombo', 45, 700, 'Tam bakım paketi', true),
('11111111-0000-0000-0000-000000000001', 'Sıcak Havlu Tıraşı', 40, 550, 'Geleneksel ustura tıraşı', true),
('11111111-0000-0000-0000-000000000001', 'Saç Boyama', 90, 1200, 'Profesyonel boya + bakım', true),

-- Tahta Barber
('11111111-0000-0000-0000-000000000002', 'Erkek Saç Kesimi', 25, 250, 'Makas veya makine ile kesim', true),
('11111111-0000-0000-0000-000000000002', 'Sakal Bakımı', 20, 200, 'Düzeltme ve şekillendirme', true),
('11111111-0000-0000-0000-000000000002', 'Klasik Tıraş', 35, 350, 'Köpük ve ustura ile tıraş', true),
('11111111-0000-0000-0000-000000000002', 'Kombo Paket', 45, 400, 'Saç + sakal birlikte', true),

-- Kütahya Saç Tasarım
('11111111-0000-0000-0000-000000000003', 'Kadın Saç Kesimi', 45, 400, 'Yıkama ve fön dahil', true),
('11111111-0000-0000-0000-000000000003', 'Erkek Saç Kesimi', 30, 300, 'Yıkama ve şekillendirme', true),
('11111111-0000-0000-0000-000000000003', 'Keratin Bakım', 120, 1500, 'Profesyonel keratin tedavisi', true),
('11111111-0000-0000-0000-000000000003', 'Saç Boyama (Röfle)', 90, 900, 'Highlights ve renk tazeme', true),
('11111111-0000-0000-0000-000000000003', 'Saç Bakım Maskesi', 30, 350, 'Yoğun nemlendirme', true),

-- Çini Lounge
('11111111-0000-0000-0000-000000000004', 'Signature Kesim', 60, 800, 'Danışmanlık + özel kesim + fön', true),
('11111111-0000-0000-0000-000000000004', 'Lüks Sakal Bakımı', 40, 600, 'Çini yağları ile premium bakım', true),
('11111111-0000-0000-0000-000000000004', 'VIP Paket', 90, 1400, 'Saç + sakal + kafa masajı', true),
('11111111-0000-0000-0000-000000000004', 'Saç Boyama Premium', 120, 2000, 'Balayage ve premium boya', true),

-- Beyaz Salon
('11111111-0000-0000-0000-000000000005', 'Saç Kesimi', 20, 150, 'Hızlı ve kaliteli kesim', true),
('11111111-0000-0000-0000-000000000005', 'Sakal Düzeltme', 15, 100, 'Şekillendirme', true),
('11111111-0000-0000-0000-000000000005', 'Kombo', 30, 220, 'Saç + sakal', true),

-- Germiyan Stüdyo
('11111111-0000-0000-0000-000000000006', 'Modern Kesim', 35, 380, 'Danışmanlık ile birlikte', true),
('11111111-0000-0000-0000-000000000006', 'Sakal Tasarım', 25, 280, 'Sıcak havlu + şekillendirme', true),
('11111111-0000-0000-0000-000000000006', 'Yüz Bakımı', 45, 450, 'Derin temizlik ve nemlendirme', true),
('11111111-0000-0000-0000-000000000006', 'Tam Bakım Paketi', 75, 900, 'Saç + sakal + yüz bakımı', true);

-- ============================================================
-- 3. PERSONEL
-- ============================================================

insert into staff (business_id, name, bio, is_active) values
('11111111-0000-0000-0000-000000000001', 'Emirhan Koç', '8 yıllık deneyim. Klasik teknikler ve modern estetik.', true),
('11111111-0000-0000-0000-000000000001', 'Kaan Yılmaz', 'Modern saç trendleri uzmanı.', true),
('11111111-0000-0000-0000-000000000001', 'Serhat Demir', 'Sakal tasarımı ve ustura tıraşında uzman.', true),

('11111111-0000-0000-0000-000000000002', 'Murat Çelik', 'Klasik kuaförciliğin ustası. 12 yıllık tecrübe.', true),
('11111111-0000-0000-0000-000000000002', 'Hasan Aydın', 'Saç ve sakal kombo konusunda uzman.', true),

('11111111-0000-0000-0000-000000000003', 'Zeynep Arslan', 'Saç boyama ve keratin uzmanı.', true),
('11111111-0000-0000-0000-000000000003', 'Merve Kaya', 'Kadın saç tasarımı uzmanı.', true),

('11111111-0000-0000-0000-000000000004', 'Levent Öztürk', 'VIP hizmet ve signature kesim ustası.', true),
('11111111-0000-0000-0000-000000000004', 'Ayşe Güneş', 'Premium boya ve balayage uzmanı.', true),

('11111111-0000-0000-0000-000000000005', 'Ali Çınar', 'Hızlı ve kaliteli kesim.', true),

('11111111-0000-0000-0000-000000000006', 'Oğuz Erdoğan', 'Modern erkek bakımı uzmanı.', true),
('11111111-0000-0000-0000-000000000006', 'Caner Polat', 'Yüz bakımı ve cilt uzmanı.', true);

-- ============================================================
-- 4. ÇALIŞMA SAATLERİ
-- ============================================================

insert into business_hours (business_id, day_of_week, open_time, close_time, is_closed)
select '11111111-0000-0000-0000-000000000001', d,
  case when d = 0 then null else '09:00'::time end,
  case when d = 0 then null when d = 6 then '18:00'::time else '20:00'::time end,
  d = 0
from generate_series(0,6) d on conflict (business_id, day_of_week) do nothing;

insert into business_hours (business_id, day_of_week, open_time, close_time, is_closed)
select '11111111-0000-0000-0000-000000000002', d, '08:30'::time, '19:00'::time, false
from generate_series(0,6) d on conflict (business_id, day_of_week) do nothing;

insert into business_hours (business_id, day_of_week, open_time, close_time, is_closed)
select '11111111-0000-0000-0000-000000000003', d,
  case when d = 0 then null else '09:00'::time end,
  case when d = 0 then null else '19:00'::time end,
  d = 0
from generate_series(0,6) d on conflict (business_id, day_of_week) do nothing;

insert into business_hours (business_id, day_of_week, open_time, close_time, is_closed)
select '11111111-0000-0000-0000-000000000004', d,
  case when d = 1 then null else '10:00'::time end,
  case when d = 1 then null else '21:00'::time end,
  d = 1
from generate_series(0,6) d on conflict (business_id, day_of_week) do nothing;

insert into business_hours (business_id, day_of_week, open_time, close_time, is_closed)
select '11111111-0000-0000-0000-000000000005', d, '09:00'::time, '18:00'::time, false
from generate_series(0,6) d on conflict (business_id, day_of_week) do nothing;

insert into business_hours (business_id, day_of_week, open_time, close_time, is_closed)
select '11111111-0000-0000-0000-000000000006', d,
  case when d = 0 then null else '10:00'::time end,
  case when d = 0 then null else '20:00'::time end,
  d = 0
from generate_series(0,6) d on conflict (business_id, day_of_week) do nothing;

-- ============================================================
-- 5. YORUMLAR (emirhan@test.com müşteri hesabından, 1-5 dağılımı)
-- ============================================================

do $$
declare
  cust_id uuid;
begin
  select id into cust_id from auth.users where email = 'emirhan@test.com';
  if cust_id is null then
    raise notice 'emirhan@test.com bulunamadı, yorumlar eklenemedi.';
    return;
  end if;

  insert into reviews (customer_id, business_id, rating, comment) values

  -- Atelier 41: yüksek puanlar (4-5)
  (cust_id, '11111111-0000-0000-0000-000000000001', 5, 'Harika bir deneyimdi! Emirhan usta gerçekten işinin ehli.'),
  (cust_id, '11111111-0000-0000-0000-000000000001', 5, 'Fiyat/performans açısından mükemmel. Kesinlikle tekrar geleceğim.'),
  (cust_id, '11111111-0000-0000-0000-000000000001', 4, 'Küçük bir bekleme oldu ama hizmet çok iyiydi.'),
  (cust_id, '11111111-0000-0000-0000-000000000001', 5, 'Sıcak havlu tıraşı muhteşemdi. Arkadaşlara da önerdim.'),
  (cust_id, '11111111-0000-0000-0000-000000000001', 4, 'Temiz mekan, güler yüzlü personel.'),

  -- Tahta Barber: karışık (3-5)
  (cust_id, '11111111-0000-0000-0000-000000000002', 5, 'Klasik kuaför atmosferi tam aradığım şeydi.'),
  (cust_id, '11111111-0000-0000-0000-000000000002', 4, 'Sakal bakımı için geldim, çok memnun kaldım.'),
  (cust_id, '11111111-0000-0000-0000-000000000002', 5, 'Her hafta buraya geliyorum. Kütahya''nın en iyi ustası.'),
  (cust_id, '11111111-0000-0000-0000-000000000002', 3, 'Bekleme süresi biraz uzundu, hizmet ortalama.'),
  (cust_id, '11111111-0000-0000-0000-000000000002', 4, 'Fiyatlar uygun, hizmet iyi.'),

  -- Kütahya Saç Tasarım: karışık (2-5) — filtre testi için
  (cust_id, '11111111-0000-0000-0000-000000000003', 5, 'Zeynep hanım saç boyamada çok başarılı.'),
  (cust_id, '11111111-0000-0000-0000-000000000003', 4, 'Keratin yaptırdım, saçlarım ipek gibi oldu.'),
  (cust_id, '11111111-0000-0000-0000-000000000003', 2, 'Randevu saatine uymadılar, biraz hayal kırıklığı yarattı.'),
  (cust_id, '11111111-0000-0000-0000-000000000003', 3, 'Ortalama bir deneyimdi, fiyatlar yüksek.'),
  (cust_id, '11111111-0000-0000-0000-000000000003', 5, 'Merve hanım çok yetenekli.'),

  -- Çini Lounge: yüksek (4-5)
  (cust_id, '11111111-0000-0000-0000-000000000004', 5, 'Kütahya''da böyle bir yer beklemiyordum. Muhteşem.'),
  (cust_id, '11111111-0000-0000-0000-000000000004', 5, 'VIP paket aldım, buna değer. Kafa masajı harikaydı.'),
  (cust_id, '11111111-0000-0000-0000-000000000004', 4, 'Fiyatlar yüksek ama hizmet kalitesi gerçekten farklı.'),

  -- Beyaz Salon: düşük-orta (1-3) — filtre testi için
  (cust_id, '11111111-0000-0000-0000-000000000005', 3, 'Mahallemizin kuaförü, ama daha iyi olabilir.'),
  (cust_id, '11111111-0000-0000-0000-000000000005', 2, 'Kesim pek istediğim gibi olmadı. Ortalama.'),
  (cust_id, '11111111-0000-0000-0000-000000000005', 1, 'Beklentilerimi karşılamadı. Tekrar gelmem.'),
  (cust_id, '11111111-0000-0000-0000-000000000005', 3, 'Hızlı servis ama kalite düşük.'),

  -- Germiyan Stüdyo: orta (3-4)
  (cust_id, '11111111-0000-0000-0000-000000000006', 4, 'Yüz bakımı yaptırdım, cildim çok daha iyi hissettiriyor.'),
  (cust_id, '11111111-0000-0000-0000-000000000006', 3, 'Modern konsept güzel ama bekleme süresi uzun.'),
  (cust_id, '11111111-0000-0000-0000-000000000006', 4, 'Tam bakım paketi aldım, değdi.');

  raise notice 'Yorumlar eklendi (emirhan customer_id: %)', cust_id;
end $$;

-- ============================================================
-- 6. RATING GÜNCELLEMESİ
-- ============================================================

update businesses set
  rating       = (select coalesce(round(avg(rating)::numeric, 1), 0) from reviews where business_id = businesses.id),
  review_count = (select count(*) from reviews where business_id = businesses.id)
where id in (
  '11111111-0000-0000-0000-000000000001',
  '11111111-0000-0000-0000-000000000002',
  '11111111-0000-0000-0000-000000000003',
  '11111111-0000-0000-0000-000000000004',
  '11111111-0000-0000-0000-000000000005',
  '11111111-0000-0000-0000-000000000006'
);

-- Sonuç kontrolü
select name, type, price_range, rating, review_count
from businesses
order by rating desc;
