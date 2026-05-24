"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const timeSlots = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "13:00","13:30","14:00","14:30","15:00","15:30",
  "16:00","16:30","17:00","17:30","18:00",
];
const dayNames = ["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"];

function getNextDays(n: number) {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      full: d.toISOString().split("T")[0],
      day: dayNames[d.getDay()],
      date: d.getDate(),
      month: d.getMonth() + 1,
    });
  }
  return days;
}

type Props = {
  user: { id: string };
  businesses: { id: string; name: string; slug: string; type: string }[];
  preselected: { businessId: string | null; tarih: string | null; saat: string | null };
  initialServices: any[];
  initialStaff: any[];
};

export default function BookingClient({ user, businesses, preselected, initialServices, initialStaff }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const days = getNextDays(14);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const [businessId, setBusinessId] = useState(preselected.businessId ?? "");
  const [services, setServices] = useState(initialServices);
  const [staffList, setStaffList] = useState(initialStaff);
  const [serviceId, setServiceId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [selectedDay, setSelectedDay] = useState(preselected.tarih ?? days[0].full);
  const [selectedTime, setSelectedTime] = useState(preselected.saat ?? "");
  const [notes, setNotes] = useState("");

  // İşletme değişince hizmet/personel çek
  useEffect(() => {
    if (!businessId) return;
    setServiceId(""); setStaffId("");
    supabase.from("business_services").select("*").eq("business_id", businessId).eq("is_active", true)
      .then(({ data }) => setServices(data ?? []));
    supabase.from("staff").select("*").eq("business_id", businessId).eq("is_active", true)
      .then(({ data }) => setStaffList(data ?? []));
  }, [businessId]);

  const selectedBusiness = businesses.find((b) => b.id === businessId);
  const selectedService = services.find((s) => s.id === serviceId);
  const selectedStaff = staffList.find((s) => s.id === staffId);

  const canNext = () => {
    if (step === 1) return !!businessId && !!serviceId;
    if (step === 2) return !!staffId;
    if (step === 3) return !!selectedDay && !!selectedTime;
    return true;
  };

  const submit = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("appointments").insert({
      customer_id: user.id,
      business_id: businessId,
      service_id: serviceId || null,
      staff_id: staffId || null,
      appointment_date: selectedDay,
      appointment_time: selectedTime + ":00",
      status: "pending",
      price: selectedService?.price ?? null,
      notes: notes || null,
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#181613] flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L19 7" stroke="#fafaf7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-medium text-[#181613] mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Randevunuz alındı
          </h1>
          <p className="text-sm text-[#5a5750] mb-1">{selectedBusiness?.name}</p>
          <p className="text-sm text-[#5a5750] mb-6">
            {selectedDay.split("-").reverse().join(".")} · {selectedTime}
            {selectedService && ` · ₺${selectedService.price}`}
          </p>
          <p className="text-xs text-[#908a7e] mb-6">İşletme onayladıktan sonra bildirim alacaksınız.</p>
          <button
            onClick={() => router.push("/randevularim")}
            className="w-full bg-[#181613] text-[#fafaf7] py-3 rounded-xl text-sm font-semibold"
          >
            Randevularıma Git
          </button>
        </div>
      </div>
    );
  }

  const steps = ["İşletme & Hizmet", "Usta", "Tarih & Saat", "Onayla"];

  return (
    <div className="min-h-screen bg-[#fafaf7]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-[#181613]" style={{ fontFamily: "var(--font-display)" }}>
            Randevu Al
          </h1>
          <p className="text-sm text-[#908a7e] mt-1">Ödeme salonda alınır.</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                i + 1 < step ? "bg-[#181613] text-[#fafaf7]"
                : i + 1 === step ? "bg-[#181613] text-[#fafaf7]"
                : "bg-[#e6e3da] text-[#908a7e]"
              }`}>
                {i + 1 < step ? "✓" : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i + 1 === step ? "text-[#181613] font-medium" : "text-[#908a7e]"}`}>{s}</span>
              {i < steps.length - 1 && <div className="w-6 h-px bg-[#e6e3da] mx-1" />}
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#e6e3da] rounded-2xl p-6">

          {/* STEP 1: İşletme & Hizmet */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#5a5750] tracking-widest mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                  İŞLETME
                </label>
                <select
                  value={businessId}
                  onChange={(e) => setBusinessId(e.target.value)}
                  className="w-full px-4 py-3 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613] bg-white"
                >
                  <option value="">İşletme seçin…</option>
                  {businesses.map((b) => (
                    <option key={b.id} value={b.id}>{b.name} — {b.type}</option>
                  ))}
                </select>
              </div>

              {businessId && services.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-[#5a5750] tracking-widest mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    HİZMET
                  </label>
                  <div className="space-y-2">
                    {services.map((svc) => (
                      <button
                        key={svc.id}
                        onClick={() => setServiceId(svc.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left ${
                          serviceId === svc.id ? "border-[#181613] bg-[#181613]/[.03]" : "border-[#e6e3da] hover:border-[#d3cfc2]"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-medium text-[#181613]">{svc.name}</p>
                          <p className="text-xs text-[#908a7e]">{svc.duration_minutes} dak</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-[#181613]">₺{svc.price}</span>
                          {serviceId === svc.id && (
                            <span className="w-5 h-5 rounded-full bg-[#181613] flex items-center justify-center">
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5l2 2 4-4" stroke="#fafaf7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {businessId && services.length === 0 && (
                <p className="text-sm text-[#908a7e] text-center py-4">Bu işletmede henüz hizmet tanımlanmamış.</p>
              )}
            </div>
          )}

          {/* STEP 2: Usta */}
          {step === 2 && (
            <div>
              <label className="block text-xs font-semibold text-[#5a5750] tracking-widest mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                USTA SEÇ
              </label>
              {staffList.length === 0 ? (
                <p className="text-sm text-[#908a7e] text-center py-4">Personel bilgisi girilmemiş, devam edebilirsiniz.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {staffList.map((s) => {
                    const initials = s.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
                    return (
                      <button
                        key={s.id}
                        onClick={() => setStaffId(s.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                          staffId === s.id ? "border-[#181613] bg-[#181613]/[.03]" : "border-[#e6e3da] hover:border-[#d3cfc2]"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#181613] flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-[#fafaf7]">{initials}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#181613]">{s.name}</p>
                          {s.bio && <p className="text-xs text-[#908a7e] truncate">{s.bio}</p>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
              {staffList.length === 0 && (
                <p className="text-xs text-[#908a7e] text-center mt-2">Herhangi bir usta atanmadan devam edilecek.</p>
              )}
            </div>
          )}

          {/* STEP 3: Tarih & Saat */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#5a5750] tracking-widest mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  TARİH
                </label>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {days.map((d) => (
                    <button
                      key={d.full}
                      onClick={() => setSelectedDay(d.full)}
                      className={`flex-shrink-0 flex flex-col items-center px-3 py-2.5 rounded-xl text-xs transition-all ${
                        selectedDay === d.full ? "bg-[#181613] text-[#fafaf7]" : "border border-[#e6e3da] text-[#5a5750] hover:border-[#d3cfc2]"
                      }`}
                    >
                      <span className="font-medium">{d.day}</span>
                      <span className="opacity-80 mt-0.5">{d.date}/{d.month}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#5a5750] tracking-widest mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  SAAT
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 rounded-lg text-xs font-medium transition-all ${
                        selectedTime === t ? "bg-[#181613] text-[#fafaf7]" : "border border-[#e6e3da] text-[#5a5750] hover:border-[#d3cfc2]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#5a5750] tracking-widest mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                  NOT (opsiyonel)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Özel bir isteğiniz varsa belirtin…"
                  className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613] resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Özet */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-base font-medium text-[#181613]" style={{ fontFamily: "var(--font-display)" }}>
                Randevu Özeti
              </h2>
              {[
                ["İşletme", selectedBusiness?.name],
                ["Hizmet", selectedService?.name],
                ["Usta", selectedStaff?.name ?? "Belirtilmedi"],
                ["Tarih", selectedDay.split("-").reverse().join(".")],
                ["Saat", selectedTime],
                ["Fiyat", selectedService ? `₺${selectedService.price}` : "—"],
                notes && ["Not", notes],
              ].filter(Boolean).map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm border-b border-[#f4f3ee] pb-3">
                  <span className="text-[#908a7e]">{label}</span>
                  <span className="font-medium text-[#181613] text-right max-w-[60%]">{value}</span>
                </div>
              ))}
              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 border border-[#e6e3da] rounded-xl text-sm text-[#5a5750] hover:border-[#d3cfc2] transition-colors"
              >
                ← Geri
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={() => { if (canNext()) setStep(step + 1); }}
                disabled={!canNext()}
                className="flex-1 py-2.5 bg-[#181613] text-[#fafaf7] rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-[#2a2520] transition-colors"
              >
                Devam Et →
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={loading}
                className="flex-1 py-2.5 bg-[#181613] text-[#fafaf7] rounded-xl text-sm font-semibold disabled:opacity-60 hover:bg-[#2a2520] transition-colors"
              >
                {loading ? "Gönderiliyor…" : "Randevuyu Onayla"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
