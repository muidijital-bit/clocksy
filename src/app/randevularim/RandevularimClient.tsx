"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import ReviewModal from "@/components/ReviewModal";

type Appt = any;

const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

const statusBadge: Record<string, string> = {
  pending: "bg-[rgba(184,132,42,.12)] text-[#b8842a]",
  confirmed: "bg-[rgba(63,122,58,.10)] text-[#3f7a3a]",
  cancelled: "bg-red-50 text-red-600",
  completed: "bg-[#f4f3ee] text-[#5a5750]",
};
const statusLabel: Record<string, string> = {
  pending: "Bekliyor",
  confirmed: "Onaylandı",
  cancelled: "İptal",
  completed: "Tamamlandı",
};

function DateBlock({ dateStr, timeStr }: { dateStr: string; timeStr: string }) {
  const d = new Date(dateStr);
  return (
    <div className="flex-shrink-0 w-14 text-center border border-[#e6e3da] rounded-xl p-2">
      <p className="text-[10px] text-[#908a7e] font-semibold tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
        {dayNames[d.getDay()].toUpperCase()}
      </p>
      <p className="text-xl font-medium text-[#181613]" style={{ fontFamily: "var(--font-display)" }}>
        {d.getDate()}
      </p>
      <p className="text-[10px] text-[#908a7e]" style={{ fontFamily: "var(--font-mono)" }}>
        {timeStr?.slice(0, 5)}
      </p>
    </div>
  );
}

export default function RandevularimClient({
  profile,
  upcoming,
  aktif,
  gecmis,
  iptal,
  totalSpent,
  reviewedIds: initialReviewedIds,
}: {
  profile: { full_name: string | null; role: string } | null;
  upcoming: Appt | null;
  aktif: Appt[];
  gecmis: Appt[];
  iptal: Appt[];
  totalSpent: number;
  reviewedIds: string[];
}) {
  const [activeTab, setActiveTab] = useState("aktif");
  const [aktifList, setAktifList] = useState(aktif);
  const [iptalList, setIptalList] = useState(iptal);
  const [reviewedIds, setReviewedIds] = useState<string[]>(initialReviewedIds);
  const [reviewTarget, setReviewTarget] = useState<Appt | null>(null);
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  const nameParts = (profile?.full_name ?? "Kullanıcı").split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  const cancelAppointment = (id: string) => {
    startTransition(async () => {
      await supabase.from("appointments").update({ status: "cancelled" }).eq("id", id);
      const cancelled = aktifList.find((a) => a.id === id);
      setAktifList((prev) => prev.filter((a) => a.id !== id));
      if (cancelled) setIptalList((prev) => [...prev, { ...cancelled, status: "cancelled" }]);
    });
  };

  const tabs = [
    { key: "aktif", label: "Aktif", count: aktifList.length },
    { key: "gecmis", label: "Geçmiş", count: gecmis.length },
    { key: "iptal", label: "İptal Edilenler", count: iptalList.length },
  ];

  const AppointmentCard = ({ appt, showCancel = false, showReview = false }: { appt: Appt; showCancel?: boolean; showReview?: boolean }) => {
    const canCancel = showCancel && (appt.status === "pending" || appt.status === "confirmed");
    const canReview = showReview && appt.status === "completed" && !reviewedIds.includes(appt.id);
    const alreadyReviewed = showReview && reviewedIds.includes(appt.id);

    return (
      <div className="bg-white border border-[#e6e3da] rounded-2xl p-4 flex gap-4 items-center">
        <DateBlock dateStr={appt.appointment_date} timeStr={appt.appointment_time} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="font-semibold text-sm text-[#181613]">
              {appt.businesses?.name ?? "İşletme"}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[appt.status]}`}>
              {statusLabel[appt.status]}
            </span>
          </div>
          <p className="text-xs text-[#908a7e]">
            {appt.business_services?.name ?? "Hizmet"}
            {appt.staff?.name && ` · ${appt.staff.name}`}
          </p>
        </div>
        <div className="flex-shrink-0 flex flex-col items-end gap-2">
          {appt.price && <span className="font-semibold text-sm text-[#181613]">₺{appt.price}</span>}
          {canCancel && (
            <button
              onClick={() => cancelAppointment(appt.id)}
              disabled={isPending}
              className="border border-[#d3cfc2] text-[#5a5750] rounded-xl px-3 py-1.5 text-xs hover:border-red-300 hover:text-red-600 transition-colors disabled:opacity-60"
            >
              İptal Et
            </button>
          )}
          {canReview && (
            <button
              onClick={() => setReviewTarget(appt)}
              className="bg-amber-400 text-white rounded-xl px-3 py-1.5 text-xs font-semibold hover:bg-amber-500 transition-colors"
            >
              Yorum Yap
            </button>
          )}
          {alreadyReviewed && (
            <span className="text-xs text-[#908a7e]">Yorum yapıldı ★</span>
          )}
          {!canCancel && !canReview && !alreadyReviewed && appt.status !== "cancelled" && (
            <Link
              href={`/kesifet/${appt.businesses?.slug}`}
              className="border border-[#e6e3da] text-[#5a5750] rounded-xl px-3 py-1.5 text-xs hover:border-[#d3cfc2] transition-colors"
            >
              Tekrar Al
            </Link>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fafaf7]">
      {reviewTarget && (
        <ReviewModal
          appointment={reviewTarget}
          onClose={() => setReviewTarget(null)}
          onDone={(id) => {
            setReviewedIds((prev) => [...prev, id]);
            setReviewTarget(null);
          }}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Welcome header */}
        <div className="mb-8">
          <p className="text-xs text-[#908a7e] tracking-widest mb-1" style={{ fontFamily: "var(--font-mono)" }}>
            HOŞ GELDİN
          </p>
          <h1 className="text-4xl font-medium text-[#181613]" style={{ fontFamily: "var(--font-display)" }}>
            {firstName}{lastName && <> <em className="italic">{lastName}</em></>}
          </h1>
        </div>

        {/* Upcoming banner */}
        {upcoming ? (
          <div className="bg-white border border-[#e6e3da] border-l-4 border-l-[#181613] rounded-2xl p-5 mb-8 flex gap-5 items-start">
            <div className="hidden sm:flex items-center justify-center flex-shrink-0">
              <span className="text-[9px] text-[#908a7e] tracking-widest uppercase"
                style={{ fontFamily: "var(--font-mono)", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                YAKLAŞAN RANDEVUN
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h2 className="text-lg font-medium text-[#181613]" style={{ fontFamily: "var(--font-display)" }}>
                  {upcoming.businesses?.name}
                </h2>
                <span className="bg-[#181613] text-[#fafaf7] text-xs font-medium px-3 py-1 rounded-full">
                  {upcoming.appointment_date.split("-").reverse().join(".")} · {upcoming.appointment_time?.slice(0, 5)}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-[#5a5750] mb-4">
                <span>✂️ {upcoming.business_services?.name ?? "Hizmet"}</span>
                {upcoming.staff?.name && <span>👤 {upcoming.staff.name}</span>}
                {upcoming.price && <span>₺{upcoming.price}</span>}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => cancelAppointment(upcoming.id)}
                  disabled={isPending}
                  className="border border-[#d3cfc2] text-[#5a5750] rounded-xl px-4 py-2 text-sm hover:border-red-300 hover:text-red-600 transition-colors disabled:opacity-60"
                >
                  İptal Et
                </button>
                <Link href={`/kesifet/${upcoming.businesses?.slug}`}
                  className="bg-[#181613] text-[#fafaf7] rounded-xl px-5 py-2 text-sm font-semibold">
                  İşletme Profili
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#e6e3da] rounded-2xl p-5 mb-8 flex items-center justify-between">
            <p className="text-sm text-[#908a7e]">Yaklaşan randevunuz yok.</p>
            <Link href="/kesifet" className="bg-[#181613] text-[#fafaf7] rounded-xl px-4 py-2 text-sm font-medium">
              Randevu Al
            </Link>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left */}
          <div className="flex-1 min-w-0">
            <div className="flex gap-0 border-b border-[#e6e3da] mb-5">
              {tabs.map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === tab.key ? "text-[#181613]" : "text-[#908a7e] hover:text-[#5a5750]"
                  }`}>
                  {tab.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? "bg-[#181613] text-[#fafaf7]" : "bg-[#ebe9e2] text-[#908a7e]"}`}>
                    {tab.count}
                  </span>
                  {activeTab === tab.key && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#181613] rounded-full" />}
                </button>
              ))}
            </div>

            {activeTab === "aktif" && (
              <div className="space-y-3">
                {aktifList.length ? (
                  aktifList.map((a) => <AppointmentCard key={a.id} appt={a} showCancel />)
                ) : (
                  <div className="text-center py-12">
                    <p className="text-sm text-[#908a7e] mb-4">Aktif randevunuz yok.</p>
                    <Link href="/randevu" className="bg-[#181613] text-[#fafaf7] px-5 py-2.5 rounded-xl text-sm font-medium">
                      Randevu Al
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === "gecmis" && (
              <div className="space-y-3">
                {gecmis.length ? (
                  gecmis.map((a) => <AppointmentCard key={a.id} appt={a} showReview />)
                ) : (
                  <p className="text-center py-12 text-sm text-[#908a7e]">Geçmiş randevu yok.</p>
                )}
              </div>
            )}

            {activeTab === "iptal" && (
              <div className="space-y-3">
                {iptalList.length ? (
                  iptalList.map((a) => <AppointmentCard key={a.id} appt={a} />)
                ) : (
                  <p className="text-center py-12 text-sm text-[#908a7e]">İptal edilmiş randevu yok.</p>
                )}
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="w-full lg:w-[300px] flex-shrink-0 space-y-4">
            <div className="bg-white border border-[#e6e3da] rounded-2xl p-5">
              <p className="text-xs text-[#908a7e] tracking-widest mb-2" style={{ fontFamily: "var(--font-mono)" }}>İSTATİSTİK</p>
              <h4 className="text-base font-medium text-[#181613] mb-4" style={{ fontFamily: "var(--font-display)" }}>Tüm zamanlar</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#908a7e]">Tamamlanan</span>
                  <span className="font-semibold text-[#181613]">{gecmis.filter((a) => a.status === "completed").length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#908a7e]">Toplam harcanan</span>
                  <span className="font-semibold text-[#181613]">₺{totalSpent.toLocaleString("tr-TR")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#908a7e]">İptal edilen</span>
                  <span className="font-semibold text-[#181613]">{iptalList.length}</span>
                </div>
              </div>
            </div>
            <div className="bg-[#181613] rounded-2xl p-5">
              <p className="text-xs text-[#fafaf7]/60 tracking-widest mb-2" style={{ fontFamily: "var(--font-mono)" }}>YENİ RANDEVU</p>
              <p className="text-sm text-[#fafaf7] mb-4">Kütahya'nın en iyi kuaförlerini keşfet.</p>
              <Link href="/kesifet" className="inline-flex bg-[#fafaf7] text-[#181613] rounded-xl px-4 py-2 text-sm font-semibold">
                Keşfet →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
