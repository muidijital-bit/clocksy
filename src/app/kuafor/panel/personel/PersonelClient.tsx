"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Staff } from "@/lib/supabase/types";

const empty = { name: "", bio: "" };

export default function PersonelClient({ staff: initial, businessId }: { staff: Staff[]; businessId: string }) {
  const [staff, setStaff] = useState(initial);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<Staff | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  const resetForm = () => { setForm(empty); setEditing(null); setShowForm(false); };

  const save = () => {
    startTransition(async () => {
      if (editing) {
        const { data } = await supabase.from("staff").update({ name: form.name, bio: form.bio }).eq("id", editing.id).select().single();
        if (data) setStaff((prev) => prev.map((s) => s.id === data.id ? data : s));
      } else {
        const { data } = await supabase.from("staff").insert({ business_id: businessId, name: form.name, bio: form.bio }).select().single();
        if (data) setStaff((prev) => [...prev, data]);
      }
      resetForm();
    });
  };

  const remove = (id: string) => {
    startTransition(async () => {
      await supabase.from("staff").delete().eq("id", id);
      setStaff((prev) => prev.filter((s) => s.id !== id));
    });
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium text-[#181613]" style={{ fontFamily: "var(--font-display)" }}>Personel</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-[#181613] text-[#fafaf7] px-4 py-2 rounded-xl text-sm font-medium">
          + Personel Ekle
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-[#e6e3da] rounded-2xl p-5 mb-6">
          <h2 className="text-base font-medium text-[#181613] mb-4" style={{ fontFamily: "var(--font-display)" }}>
            {editing ? "Personeli Düzenle" : "Yeni Personel"}
          </h2>
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-xs text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>AD SOYAD</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613]" placeholder="Emirhan Demir" />
            </div>
            <div>
              <label className="block text-xs text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>BİYOGRAFİ</label>
              <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={2}
                className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613] resize-none" placeholder="Kısa tanıtım..." />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={save} disabled={!form.name || isPending} className="bg-[#181613] text-[#fafaf7] px-5 py-2.5 rounded-xl text-sm font-medium disabled:opacity-60">
              {isPending ? "Kaydediliyor…" : "Kaydet"}
            </button>
            <button onClick={resetForm} className="border border-[#e6e3da] text-[#5a5750] px-5 py-2.5 rounded-xl text-sm">İptal</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {!staff.length ? (
          <p className="text-sm text-[#908a7e] col-span-2 text-center py-12">Henüz personel eklenmedi.</p>
        ) : (
          staff.map((s) => {
            const initials = s.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
            return (
              <div key={s.id} className="bg-white border border-[#e6e3da] rounded-2xl p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#181613] flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-[#fafaf7]">{initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#181613]">{s.name}</p>
                  {s.bio && <p className="text-xs text-[#908a7e] mt-0.5 line-clamp-2">{s.bio}</p>}
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => { setEditing(s); setForm({ name: s.name, bio: s.bio ?? "" }); setShowForm(true); }}
                      className="text-xs border border-[#e6e3da] rounded-lg px-3 py-1.5 text-[#5a5750] hover:border-[#d3cfc2]">Düzenle</button>
                    <button onClick={() => remove(s.id)} className="text-xs text-red-500 border border-red-100 rounded-lg px-3 py-1.5 hover:bg-red-50">Sil</button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
