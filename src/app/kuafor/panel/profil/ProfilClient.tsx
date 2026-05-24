"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Business = {
  id: string;
  name: string;
  type: string;
  address: string | null;
  phone: string | null;
  about: string | null;
  price_range: string | null;
  slug: string;
  rating: number;
  review_count: number;
};

type Hour = {
  day_of_week: number;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
};

const DAY_NAMES = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

function slugify(s: string) {
  return s.toLowerCase()
    .replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ı/g, "i")
    .replace(/ö/g, "o").replace(/ü/g, "u").replace(/ç/g, "c")
    .replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-");
}

const defaultHours = () => [0, 1, 2, 3, 4, 5, 6].map((d) => ({
  day_of_week: d,
  open_time: d === 0 ? null : "09:00",
  close_time: d === 0 ? null : "19:00",
  is_closed: d === 0,
}));

function BusinessForm({
  initial,
  initialHours,
  ownerId,
  onSaved,
  onCancel,
}: {
  initial: Business | null;
  initialHours: Hour[];
  ownerId: string;
  onSaved: () => void;
  onCancel?: () => void;
}) {
  const supabase = createClient();
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    type: initial?.type ?? "",
    address: initial?.address ?? "",
    phone: initial?.phone ?? "",
    about: initial?.about ?? "",
    price_range: initial?.price_range ?? "₺₺",
  });
  const [hours, setHours] = useState<Hour[]>(
    [0, 1, 2, 3, 4, 5, 6].map((d) => {
      const ex = initialHours.find((h) => h.day_of_week === d);
      return ex ?? { day_of_week: d, open_time: "09:00", close_time: "19:00", is_closed: d === 0 };
    })
  );

  const setHour = (day: number, field: string, value: any) =>
    setHours((prev) => prev.map((h) => h.day_of_week === day ? { ...h, [field]: value } : h));

  const save = () => {
    startTransition(async () => {
      let bizId = initial?.id;
      if (!bizId) {
        const slug = slugify(form.name) || `isletme-${Date.now()}`;
        const { data } = await supabase
          .from("businesses")
          .insert({ owner_id: ownerId, slug, ...form })
          .select()
          .single();
        bizId = data?.id;
      } else {
        await supabase.from("businesses").update(form).eq("id", bizId);
      }
      if (bizId) {
        for (const h of hours) {
          await supabase.from("business_hours").upsert({
            business_id: bizId,
            day_of_week: h.day_of_week,
            open_time: h.is_closed ? null : h.open_time,
            close_time: h.is_closed ? null : h.close_time,
            is_closed: h.is_closed,
          }, { onConflict: "business_id,day_of_week" });
        }
      }
      setSaved(true);
      setTimeout(() => { setSaved(false); onSaved(); }, 1200);
    });
  };

  return (
    <div className="space-y-5">
      {/* Temel bilgiler */}
      <div className="bg-white border border-[#e6e3da] rounded-2xl p-5">
        <h3 className="text-base font-medium text-[#181613] mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Temel Bilgiler
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>İŞLETME ADI</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613]"
              placeholder="Atelier 41" />
          </div>
          <div>
            <label className="block text-xs text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>TİP</label>
            <input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613]"
              placeholder="Kuaför, Berber…" />
          </div>
          <div>
            <label className="block text-xs text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>FİYAT ARALIĞI</label>
            <select value={form.price_range ?? "₺₺"} onChange={(e) => setForm({ ...form, price_range: e.target.value })}
              className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613] bg-white">
              {["₺", "₺₺", "₺₺₺", "₺₺₺₺"].map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>ADRES</label>
            <input value={form.address ?? ""} onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613]"
              placeholder="Cumhuriyet Cad. No:41, Kütahya" />
          </div>
          <div>
            <label className="block text-xs text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>TELEFON</label>
            <input value={form.phone ?? ""} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613]"
              placeholder="0274 312 41 41" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>HAKKINDA</label>
            <textarea value={form.about ?? ""} onChange={(e) => setForm({ ...form, about: e.target.value })} rows={3}
              className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613] resize-none"
              placeholder="İşletmenizi tanıtın…" />
          </div>
        </div>
      </div>

      {/* Çalışma saatleri */}
      <div className="bg-white border border-[#e6e3da] rounded-2xl p-5">
        <h3 className="text-base font-medium text-[#181613] mb-4" style={{ fontFamily: "var(--font-display)" }}>Çalışma Saatleri</h3>
        <div className="space-y-3">
          {hours.map((h) => (
            <div key={h.day_of_week} className="flex items-center gap-3 flex-wrap">
              <span className="w-24 text-sm text-[#5a5750] flex-shrink-0">{DAY_NAMES[h.day_of_week]}</span>
              <label className="flex items-center gap-1.5 flex-shrink-0">
                <input type="checkbox" checked={h.is_closed}
                  onChange={(e) => setHour(h.day_of_week, "is_closed", e.target.checked)}
                  style={{ accentColor: "#181613" }} />
                <span className="text-xs text-[#908a7e]">Kapalı</span>
              </label>
              {!h.is_closed && (
                <>
                  <input type="time" value={h.open_time ?? ""} onChange={(e) => setHour(h.day_of_week, "open_time", e.target.value)}
                    className="border border-[#e6e3da] rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-[#181613]" />
                  <span className="text-[#908a7e] text-sm">–</span>
                  <input type="time" value={h.close_time ?? ""} onChange={(e) => setHour(h.day_of_week, "close_time", e.target.value)}
                    className="border border-[#e6e3da] rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-[#181613]" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={save} disabled={!form.name || isPending}
          className="bg-[#181613] text-[#fafaf7] px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60 hover:bg-[#2a2520] transition-colors">
          {isPending ? "Kaydediliyor…" : "Kaydet"}
        </button>
        {onCancel && (
          <button onClick={onCancel} className="px-5 py-2.5 border border-[#e6e3da] rounded-xl text-sm text-[#5a5750] hover:border-[#d3cfc2] transition-colors">
            İptal
          </button>
        )}
        {saved && <p className="text-sm text-green-600">Kaydedildi ✓</p>}
      </div>
    </div>
  );
}

export default function ProfilClient({
  businesses: initialBusinesses,
  hoursMap,
  ownerId,
}: {
  businesses: Business[];
  hoursMap: Record<string, Hour[]>;
  ownerId: string;
}) {
  const supabase = createClient();
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const deleteBusiness = (id: string) => {
    startTransition(async () => {
      await supabase.from("businesses").delete().eq("id", id);
      setBusinesses((prev) => prev.filter((b) => b.id !== id));
      setDeletingId(null);
      router.refresh();
    });
  };

  const onSaved = () => {
    setEditingId(null);
    router.refresh();
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-[#181613]" style={{ fontFamily: "var(--font-display)" }}>
          İşletmelerim
        </h1>
        {editingId !== "new" && (
          <button
            onClick={() => setEditingId("new")}
            className="flex items-center gap-2 bg-[#181613] text-[#fafaf7] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#2a2520] transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Yeni İşletme Ekle
          </button>
        )}
      </div>

      {/* Mevcut işletmeler */}
      {businesses.map((biz) => (
        <div key={biz.id}>
          {editingId === biz.id ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-medium text-[#181613]">{biz.name} — Düzenle</h2>
              </div>
              <BusinessForm
                initial={biz}
                initialHours={hoursMap[biz.id] ?? defaultHours()}
                ownerId={ownerId}
                onSaved={onSaved}
                onCancel={() => setEditingId(null)}
              />
            </div>
          ) : (
            <div className="bg-white border border-[#e6e3da] rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#181613] flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-[#fafaf7]">
                      {biz.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#181613]">{biz.name}</p>
                    <p className="text-xs text-[#908a7e] mt-0.5">
                      {biz.type}{biz.address ? ` · ${biz.address}` : ""}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-[#908a7e]">
                      <span>★ {biz.rating > 0 ? biz.rating.toFixed(1) : "—"}</span>
                      <span>{biz.review_count} yorum</span>
                      {biz.price_range && <span>{biz.price_range}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setEditingId(biz.id)}
                    className="px-3 py-1.5 border border-[#e6e3da] rounded-lg text-xs text-[#5a5750] hover:border-[#d3cfc2] transition-colors"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => setDeletingId(biz.id)}
                    className="px-3 py-1.5 border border-red-100 rounded-lg text-xs text-red-500 hover:border-red-300 hover:text-red-600 transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </div>

              {/* Silme onayı */}
              {deletingId === biz.id && (
                <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-sm text-red-700 mb-3">
                    <strong>{biz.name}</strong> silinecek. Bu işlem geri alınamaz.
                    Bağlı tüm hizmetler, personel ve randevular da silinir.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteBusiness(biz.id)}
                      disabled={isPending}
                      className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-700 disabled:opacity-60 transition-colors"
                    >
                      {isPending ? "Siliniyor…" : "Evet, Sil"}
                    </button>
                    <button
                      onClick={() => setDeletingId(null)}
                      className="border border-red-200 text-red-600 px-4 py-1.5 rounded-lg text-xs hover:border-red-300 transition-colors"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Hiç işletme yoksa */}
      {businesses.length === 0 && editingId !== "new" && (
        <div className="bg-white border border-[#e6e3da] rounded-2xl p-8 text-center">
          <p className="text-sm text-[#908a7e] mb-4">Henüz işletme eklemediniz.</p>
          <button
            onClick={() => setEditingId("new")}
            className="bg-[#181613] text-[#fafaf7] px-5 py-2.5 rounded-xl text-sm font-medium"
          >
            İlk İşletmeni Ekle
          </button>
        </div>
      )}

      {/* Yeni işletme formu */}
      {editingId === "new" && (
        <div className="space-y-4">
          <h2 className="text-base font-medium text-[#181613]">Yeni İşletme</h2>
          <BusinessForm
            initial={null}
            initialHours={defaultHours()}
            ownerId={ownerId}
            onSaved={onSaved}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}
    </div>
  );
}
