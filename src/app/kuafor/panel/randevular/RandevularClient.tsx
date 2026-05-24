"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { AppointmentStatus } from "@/lib/supabase/types";
import { updateAppointmentStatus } from "./actions";

type Appt = any;

const statusLabel: Record<string, string> = {
  pending: "Bekliyor",
  confirmed: "Onaylandı",
  cancelled: "İptal",
  completed: "Tamamlandı",
};
const statusColor: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-100",
  confirmed: "bg-green-50 text-green-700 border-green-100",
  cancelled: "bg-red-50 text-red-600 border-red-100",
  completed: "bg-[#f4f3ee] text-[#5a5750] border-[#e6e3da]",
};

const tabs = ["Tümü", "Bekliyor", "Onaylandı", "Tamamlandı", "İptal"] as const;
const tabToStatus: Record<string, AppointmentStatus | null> = {
  Tümü: null,
  Bekliyor: "pending",
  Onaylandı: "confirmed",
  Tamamlandı: "completed",
  İptal: "cancelled",
};

export default function RandevularClient({ appointments: initial, businessId }: { appointments: Appt[]; businessId: string }) {
  const [appointments, setAppointments] = useState<Appt[]>(initial);
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Tümü");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const filtered = activeTab === "Tümü"
    ? appointments
    : appointments.filter((a) => a.status === tabToStatus[activeTab]);

  const updateStatus = (id: string, status: "confirmed" | "cancelled" | "completed") => {
    setError(null);
    startTransition(async () => {
      const result = await updateAppointmentStatus(id, status);
      if (result.error) {
        setError(result.error);
        return;
      }
      setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
      router.refresh();
    });
  };

  const counts: Record<string, number> = {};
  tabs.forEach((t) => {
    counts[t] = t === "Tümü"
      ? appointments.length
      : appointments.filter((a) => a.status === tabToStatus[t]).length;
  });

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-medium text-[#181613] mb-6" style={{ fontFamily: "var(--font-display)" }}>
        Randevular
      </h1>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1.5 flex-wrap mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === tab
                ? "bg-[#181613] text-[#fafaf7]"
                : "border border-[#e6e3da] text-[#5a5750] hover:border-[#d3cfc2]"
            }`}
          >
            {tab}
            <span className={`text-[10px] ${activeTab === tab ? "opacity-70" : "text-[#908a7e]"}`}>
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e6e3da] rounded-2xl overflow-hidden">
        {!filtered.length ? (
          <p className="text-sm text-[#908a7e] text-center py-12">Bu filtrede randevu yok.</p>
        ) : (
          <div className="divide-y divide-[#f4f3ee]">
            {filtered.map((appt: Appt) => (
              <div key={appt.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4">
                {/* Date + time */}
                <div className="flex items-center gap-4 sm:w-36 flex-shrink-0">
                  <div>
                    <p className="text-sm font-semibold text-[#181613]">
                      {new Date(appt.appointment_date).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}
                    </p>
                    <p className="text-xs text-[#908a7e]">{appt.appointment_time?.slice(0, 5)}</p>
                  </div>
                </div>

                {/* Customer + service */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#181613] truncate">
                    {appt.profiles?.full_name || "Misafir"}
                  </p>
                  <p className="text-xs text-[#908a7e] truncate">
                    {appt.business_services?.name}
                    {appt.staff?.name && ` · ${appt.staff.name}`}
                    {appt.business_services?.price && ` · ₺${appt.business_services.price}`}
                  </p>
                  {appt.profiles?.phone && (
                    <p className="text-xs text-[#908a7e]">{appt.profiles.phone}</p>
                  )}
                </div>

                {/* Status badge */}
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border flex-shrink-0 ${statusColor[appt.status]}`}>
                  {statusLabel[appt.status]}
                </span>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  {appt.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(appt.id, "confirmed")}
                        disabled={isPending}
                        className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors disabled:opacity-60"
                      >
                        Onayla
                      </button>
                      <button
                        onClick={() => updateStatus(appt.id, "cancelled")}
                        disabled={isPending}
                        className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors disabled:opacity-60"
                      >
                        Reddet
                      </button>
                    </>
                  )}
                  {appt.status === "confirmed" && (
                    <button
                      onClick={() => updateStatus(appt.id, "completed")}
                      disabled={isPending}
                      className="px-3 py-1.5 bg-[#181613] text-[#fafaf7] rounded-lg text-xs font-medium hover:bg-[#2a2520] transition-colors disabled:opacity-60"
                    >
                      Tamamlandı
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
