"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import type { BusinessService } from "@/lib/supabase/types";

const empty = { name: "", duration_minutes: 30, price: 0, description: "" };

export default function HizmetlerClient({ services: initial, businessId }: { services: BusinessService[]; businessId: string }) {
  const [services, setServices] = useState(initial);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<BusinessService | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  const resetForm = () => { setForm(empty); setEditing(null); setShowForm(false); };

  const save = () => {
    startTransition(async () => {
      if (editing) {
        const { data } = await supabase
          .from("business_services")
          .update({ name: form.name, duration_minutes: +form.duration_minutes, price: +form.price, description: form.description })
          .eq("id", editing.id)
          .select()
          .single();
        if (data) setServices((prev) => prev.map((s) => s.id === data.id ? data : s));
      } else {
        const { data } = await supabase
          .from("business_services")
          .insert({ business_id: businessId, name: form.name, duration_minutes: +form.duration_minutes, price: +form.price, description: form.description })
          .select()
          .single();
        if (data) setServices((prev) => [...prev, data]);
      }
      resetForm();
    });
  };

  const toggleActive = (svc: BusinessService) => {
    startTransition(async () => {
      await supabase.from("business_services").update({ is_active: !svc.is_active }).eq("id", svc.id);
      setServices((prev) => prev.map((s) => s.id === svc.id ? { ...s, is_active: !s.is_active } : s));
    });
  };

  const remove = (id: string) => {
    startTransition(async () => {
      await supabase.from("business_services").delete().eq("id", id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    });
  };

  const startEdit = (svc: BusinessService) => {
    setEditing(svc);
    setForm({ name: svc.name, duration_minutes: svc.duration_minutes, price: svc.price, description: svc.description ?? "" });
    setShowForm(true);
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium text-[#181613]" style={{ fontFamily: "var(--font-display)" }}>Hizmetler</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-[#181613] text-[#fafaf7] px-4 py-2 rounded-xl text-sm font-medium"
        >
          + Hizmet Ekle
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-[#e6e3da] rounded-2xl p-5 mb-6">
          <h2 className="text-base font-medium text-[#181613] mb-4" style={{ fontFamily: "var(--font-display)" }}>
            {editing ? "Hizmeti Düzenle" : "Yeni Hizmet"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="block text-xs text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>HİZMET ADI</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613]" placeholder="Klasik Saç Kesimi" />
            </div>
            <div>
              <label className="block text-xs text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>SÜRE (DAK)</label>
              <input type="number" value={form.duration_minutes} onChange={(e) => setForm({ ...form, duration_minutes: +e.target.value })}
                className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613]" />
            </div>
            <div>
              <label className="block text-xs text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>FİYAT (₺)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })}
                className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613]" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>AÇIKLAMA</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
                className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613] resize-none" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={save} disabled={!form.name || isPending}
              className="bg-[#181613] text-[#fafaf7] px-5 py-2.5 rounded-xl text-sm font-medium disabled:opacity-60">
              {isPending ? "Kaydediliyor…" : "Kaydet"}
            </button>
            <button onClick={resetForm} className="border border-[#e6e3da] text-[#5a5750] px-5 py-2.5 rounded-xl text-sm">İptal</button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-white border border-[#e6e3da] rounded-2xl overflow-hidden">
        {!services.length ? (
          <p className="text-sm text-[#908a7e] text-center py-12">Henüz hizmet eklenmedi.</p>
        ) : (
          <div className="divide-y divide-[#f4f3ee]">
            {services.map((svc) => (
              <div key={svc.id} className="flex items-center gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium ${svc.is_active ? "text-[#181613]" : "text-[#908a7e] line-through"}`}>{svc.name}</p>
                    {!svc.is_active && (
                      <span className="text-[10px] bg-[#f4f3ee] text-[#908a7e] px-2 py-0.5 rounded-full">Pasif</span>
                    )}
                  </div>
                  <p className="text-xs text-[#908a7e]">{svc.duration_minutes} dak · ₺{svc.price}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => startEdit(svc)} className="text-xs border border-[#e6e3da] rounded-lg px-3 py-1.5 text-[#5a5750] hover:border-[#d3cfc2]">Düzenle</button>
                  <button onClick={() => toggleActive(svc)} className="text-xs border border-[#e6e3da] rounded-lg px-3 py-1.5 text-[#5a5750] hover:border-[#d3cfc2]">
                    {svc.is_active ? "Pasifleştir" : "Aktifleştir"}
                  </button>
                  <button onClick={() => remove(svc.id)} className="text-xs text-red-500 border border-red-100 rounded-lg px-3 py-1.5 hover:bg-red-50">Sil</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
