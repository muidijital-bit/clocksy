"use client";

import { useState } from "react";
import Link from "next/link";

type Business = {
  id: string;
  slug: string;
  name: string;
  type: string;
  rating: number;
  review_count: number;
  price_range: string | null;
  about: string | null;
  address: string | null;
  phone: string | null;
  verified: boolean;
};

type Service = {
  id: string;
  name: string;
  duration_minutes: number;
  price: number;
  description: string | null;
};

type Hour = {
  day_of_week: number;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
};

const DAY_NAMES = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const TIME_SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"];

function getNextDays(count: number) {
  const days = [];
  const today = new Date();
  const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      label: i === 0 ? "Bugün" : dayNames[d.getDay()],
      date: d.getDate(),
      month: d.getMonth() + 1,
      full: d.toISOString().split("T")[0],
      dayOfWeek: d.getDay(),
    });
  }
  return days;
}

export default function BusinessProfileClient({
  biz,
  services,
  hours,
}: {
  biz: Business;
  services: Service[];
  hours: Hour[];
}) {
  const days = getNextDays(7);
  const [selectedDay, setSelectedDay] = useState(days[0].full);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(services[0] ?? null);

  const initials = biz.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const todayHour = hours.find((h) => h.day_of_week === new Date().getDay());
  const isOpenToday = todayHour && !todayHour.is_closed;

  return (
    <div className="min-h-screen bg-[#fafaf7]">
      {/* Cover */}
      <div
        className="h-[220px] sm:h-[280px] relative"
        style={{
          background: "repeating-linear-gradient(45deg, rgba(24,22,19,.04) 0 16px, rgba(24,22,19,.08) 16px 32px), linear-gradient(135deg, #e8e4dc, #d3cbbf)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf7]/60 via-transparent to-transparent" />
        <Link
          href="/kesifet"
          className="absolute top-4 left-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#e6e3da] rounded-full px-4 py-2 text-sm text-[#5a5750] hover:text-[#181613] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Keşfet
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Avatar row */}
        <div className="flex items-end gap-4 sm:gap-5 -mt-10 mb-6 relative z-10">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-[#181613] flex items-center justify-center flex-shrink-0 border-4 border-[#fafaf7] shadow-lg">
            <span className="text-xl sm:text-2xl font-semibold text-[#fafaf7]" style={{ fontFamily: "var(--font-display)" }}>
              {initials}
            </span>
          </div>
          <div className="pb-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-medium text-[#181613] truncate" style={{ fontFamily: "var(--font-display)" }}>
                {biz.name}
              </h1>
              {biz.verified && (
                <span className="flex items-center gap-1 bg-[#181613] text-[#fafaf7] text-[10px] font-medium px-2 py-0.5 rounded-full tracking-wide flex-shrink-0">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Doğrulanmış
                </span>
              )}
              {isOpenToday && (
                <span className="bg-[#e8f5e9] text-[#2e7d32] text-[10px] font-medium px-2 py-0.5 rounded-full tracking-wide flex-shrink-0">
                  Bugün açık
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
              <span className="flex items-center gap-1 text-sm text-[#5a5750]">
                <span className="text-amber-500">★</span>
                <span className="font-semibold text-[#181613]">{biz.rating > 0 ? biz.rating.toFixed(1) : "—"}</span>
                {biz.review_count > 0 && <span className="text-[#908a7e]">({biz.review_count} yorum)</span>}
              </span>
              <span className="text-[#e6e3da] hidden sm:inline">·</span>
              <span className="text-xs text-[#908a7e] tracking-wider hidden sm:inline" style={{ fontFamily: "var(--font-mono)" }}>
                {biz.type.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 pb-28 lg:pb-16 items-start">
          {/* Left column */}
          <div className="flex-1 min-w-0 w-full space-y-4 sm:space-y-6">

            {/* About */}
            <div className="bg-white border border-[#e6e3da] rounded-2xl p-5">
              <h2 className="text-base font-medium text-[#181613] mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Hakkında
              </h2>
              <p className="text-sm text-[#5a5750] leading-relaxed">
                {biz.about ?? "Bu işletme hakkında henüz bilgi girilmemiş."}
              </p>
              {biz.address && (
                <div className="mt-4 flex items-start gap-2 text-sm text-[#5a5750]">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 flex-shrink-0">
                    <path d="M7 1C4.79 1 3 2.79 3 5c0 3.5 4 8 4 8s4-4.5 4-8c0-2.21-1.79-4-4-4z" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="7" cy="5" r="1.2" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  {biz.address}
                </div>
              )}
              {biz.phone && (
                <div className="mt-2 flex items-center gap-2 text-sm text-[#5a5750]">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                    <path d="M2 2h3l1.5 3.5L5 7a9 9 0 0 0 2 2l1.5-1.5L12 9v3a1 1 0 0 1-1 1A10 10 0 0 1 1 3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>
                  <a href={`tel:${biz.phone}`} className="hover:text-[#181613] transition-colors">{biz.phone}</a>
                </div>
              )}
            </div>

            {/* Services */}
            <div className="bg-white border border-[#e6e3da] rounded-2xl p-5">
              <h2 className="text-base font-medium text-[#181613] mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Hizmetler & Fiyatlar
              </h2>
              {services.length === 0 ? (
                <p className="text-sm text-[#908a7e]">Henüz hizmet eklenmemiş.</p>
              ) : (
                <div className="space-y-3">
                  {services.map((svc) => (
                    <div
                      key={svc.id}
                      onClick={() => setSelectedService(svc)}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl border transition-all cursor-pointer ${
                        selectedService?.id === svc.id
                          ? "border-[#181613] bg-[#181613]/[.03]"
                          : "border-[#e6e3da] hover:border-[#d3cfc2]"
                      }`}
                    >
                      <div className="min-w-0 flex-1 mr-4">
                        <p className="text-sm font-medium text-[#181613]">{svc.name}</p>
                        {svc.description && (
                          <p className="text-xs text-[#908a7e] mt-0.5 truncate">{svc.description}</p>
                        )}
                        <p className="text-[11px] text-[#908a7e] tracking-wide mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
                          {svc.duration_minutes} DAK
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-sm font-semibold text-[#181613]">₺{svc.price}</span>
                        <button
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            selectedService?.id === svc.id
                              ? "bg-[#181613] text-[#fafaf7]"
                              : "border border-[#e6e3da] text-[#5a5750] hover:border-[#d3cfc2]"
                          }`}
                        >
                          {selectedService?.id === svc.id ? "Seçildi" : "Seç"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Hours */}
            {hours.length > 0 && (
              <div className="bg-white border border-[#e6e3da] rounded-2xl p-5">
                <h2 className="text-base font-medium text-[#181613] mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  Çalışma Saatleri
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {hours.map((h) => (
                    <div key={h.day_of_week} className="flex items-center justify-between text-sm py-1">
                      <span className="text-[#5a5750]">{DAY_NAMES[h.day_of_week]}</span>
                      <span className={`font-medium ${h.is_closed ? "text-[#908a7e]" : "text-[#181613]"}`}>
                        {h.is_closed
                          ? "Kapalı"
                          : `${h.open_time?.slice(0, 5) ?? "?"} – ${h.close_time?.slice(0, 5) ?? "?"}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky booking widget — desktop */}
          <div className="hidden lg:block w-[340px] flex-shrink-0 sticky top-24">
            <div className="bg-white border border-[#e6e3da] rounded-2xl p-5 shadow-md">
              {/* Selected service */}
              {selectedService ? (
                <div className="mb-4 p-3 bg-[#f4f3ee] rounded-xl">
                  <p className="text-xs text-[#908a7e] tracking-wide mb-0.5" style={{ fontFamily: "var(--font-mono)" }}>SEÇİLİ HİZMET</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#181613]">{selectedService.name}</p>
                    <p className="text-sm font-semibold text-[#181613]">₺{selectedService.price}</p>
                  </div>
                  <p className="text-[11px] text-[#908a7e] mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>{selectedService.duration_minutes} DAK</p>
                </div>
              ) : (
                <p className="mb-4 text-sm text-[#908a7e] text-center py-3 bg-[#f4f3ee] rounded-xl">Soldaki listeden hizmet seçin</p>
              )}

              {/* Date strip */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-[#5a5750] tracking-widest mb-3" style={{ fontFamily: "var(--font-mono)" }}>TARİH</p>
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {days.map((day) => (
                    <button
                      key={day.full}
                      onClick={() => { setSelectedDay(day.full); setSelectedTime(null); }}
                      className={`flex-shrink-0 flex flex-col items-center px-3 py-2.5 rounded-xl text-xs transition-all ${
                        selectedDay === day.full
                          ? "bg-[#181613] text-[#fafaf7]"
                          : "border border-[#e6e3da] text-[#5a5750] hover:border-[#d3cfc2]"
                      }`}
                    >
                      <span className="font-medium">{day.label}</span>
                      <span className="text-[11px] mt-0.5 opacity-80">{day.date}/{day.month}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slots */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-[#5a5750] tracking-widest mb-3" style={{ fontFamily: "var(--font-mono)" }}>SAAT</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 rounded-lg text-xs font-medium transition-all ${
                        selectedTime === t
                          ? "bg-[#181613] text-[#fafaf7]"
                          : "border border-[#e6e3da] text-[#5a5750] hover:border-[#d3cfc2]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href={
                  selectedTime && selectedService
                    ? `/randevu?isletme=${biz.slug}&tarih=${selectedDay}&saat=${selectedTime}`
                    : "#"
                }
                onClick={(e) => { if (!selectedTime || !selectedService) e.preventDefault(); }}
                className={`block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                  selectedTime && selectedService
                    ? "bg-[#181613] text-[#fafaf7] hover:bg-[#2a2520]"
                    : "bg-[#e6e3da] text-[#908a7e] cursor-not-allowed"
                }`}
              >
                {selectedTime && selectedService
                  ? `Randevu Al · ₺${selectedService.price}`
                  : selectedService ? "Saat seçin" : "Hizmet seçin"}
              </Link>

              {selectedTime && selectedService && (
                <p className="text-center text-xs text-[#908a7e] mt-2">
                  {biz.name} · {selectedDay.split("-").reverse().join(".")} · {selectedTime}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile booking bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#e6e3da] p-4 flex items-center gap-3 z-50 safe-area-inset-bottom">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#181613] truncate">
            {selectedService ? selectedService.name : "Hizmet seçin"}
          </p>
          <p className="text-xs text-[#908a7e]">
            {selectedService ? `₺${selectedService.price} · ${selectedService.duration_minutes} dak` : "Soldaki listeden seçin"}
          </p>
        </div>
        <Link
          href={`/randevu?isletme=${biz.slug}`}
          className="bg-[#181613] text-[#fafaf7] px-5 py-2.5 rounded-xl text-sm font-semibold flex-shrink-0"
        >
          Randevu Al
        </Link>
      </div>
    </div>
  );
}
