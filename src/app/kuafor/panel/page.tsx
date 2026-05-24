import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Panel — Clocksy" };

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

export default async function PanelPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: bList } = await supabase.from("businesses").select("id, name").eq("owner_id", user!.id).order("created_at").limit(1);
  const business = bList?.[0] ?? null;

  const today = new Date().toISOString().split("T")[0];

  const [{ data: todayAppts }, { data: pendingAppts }, { data: allAppts }] = await Promise.all([
    supabase
      .from("appointments")
      .select("*, profiles(full_name, phone), business_services(name, duration_minutes), staff(name)")
      .eq("business_id", business?.id ?? "")
      .eq("appointment_date", today)
      .order("appointment_time"),
    supabase
      .from("appointments")
      .select("id")
      .eq("business_id", business?.id ?? "")
      .eq("status", "pending"),
    supabase
      .from("appointments")
      .select("id, status")
      .eq("business_id", business?.id ?? ""),
  ]);

  const stats = {
    today: todayAppts?.length ?? 0,
    pending: pendingAppts?.length ?? 0,
    total: allAppts?.length ?? 0,
    completed: allAppts?.filter((a) => a.status === "completed").length ?? 0,
  };

  if (!business) {
    return (
      <div className="max-w-lg">
        <h1 className="text-2xl font-medium text-[#181613] mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Hoş geldiniz
        </h1>
        <p className="text-sm text-[#5a5750] mb-5">
          Henüz işletmenizi eklemediniz. Profil sayfasından işletmenizi oluşturun.
        </p>
        <a
          href="/kuafor/panel/profil"
          className="inline-flex bg-[#181613] text-[#fafaf7] px-5 py-2.5 rounded-xl text-sm font-medium"
        >
          İşletme Ekle
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-[#181613]" style={{ fontFamily: "var(--font-display)" }}>
            Genel Bakış
          </h1>
          <p className="text-xs text-[#908a7e] mt-1" style={{ fontFamily: "var(--font-mono)" }}>
            {new Date().toLocaleDateString("tr-TR", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).toUpperCase()}
          </p>
        </div>
        <a
          href="/kuafor/panel/randevular"
          className="text-xs text-[#5a5750] border border-[#e6e3da] rounded-xl px-4 py-2 hover:border-[#d3cfc2] transition-colors"
        >
          Tüm randevular →
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "BUGÜNKÜ RANDEVU", value: stats.today, sub: "bugün" },
          { label: "BEKLEYEN", value: stats.pending, sub: "onay bekliyor" },
          { label: "TAMAMLANAN", value: stats.completed, sub: "toplam" },
          { label: "TOPLAM RANDEVU", value: stats.total, sub: "tüm zamanlar" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#e6e3da] rounded-2xl p-5">
            <p className="text-[10px] text-[#908a7e] tracking-widest mb-2" style={{ fontFamily: "var(--font-mono)" }}>
              {s.label}
            </p>
            <p className="text-3xl font-semibold text-[#181613]">{s.value}</p>
            <p className="text-xs text-[#908a7e] mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Today's appointments */}
      <div className="bg-white border border-[#e6e3da] rounded-2xl p-5">
        <h2 className="text-base font-medium text-[#181613] mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Bugünün Randevuları
        </h2>
        {!todayAppts?.length ? (
          <p className="text-sm text-[#908a7e] py-4 text-center">Bugün randevu yok.</p>
        ) : (
          <div className="space-y-3">
            {todayAppts.map((appt: any) => (
              <div key={appt.id} className="flex items-center gap-4 py-3 border-b border-[#f4f3ee] last:border-0">
                <div className="w-14 text-center flex-shrink-0">
                  <p className="text-sm font-semibold text-[#181613]">{appt.appointment_time?.slice(0, 5)}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#181613] truncate">
                    {appt.profiles?.full_name || "Misafir"}
                  </p>
                  <p className="text-xs text-[#908a7e] truncate">
                    {appt.business_services?.name} · {appt.staff?.name || "Usta"}
                  </p>
                </div>
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${statusColor[appt.status]}`}>
                  {statusLabel[appt.status]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
