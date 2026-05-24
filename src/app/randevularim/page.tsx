import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import RandevularimClient from "./RandevularimClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Randevularım | Clocksy",
};

export default async function RandevularimPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/giris?geri=/randevularim");

  const { data: profile } = await supabase
    .from("profiles").select("full_name, role").eq("id", user.id).single();

  if (profile?.role === "business_owner") redirect("/kuafor/panel");

  const { data: appointments } = await supabase
    .from("appointments")
    .select("*, businesses(name, slug), business_services(name, duration_minutes), staff(name)")
    .eq("customer_id", user.id)
    .order("appointment_date", { ascending: false })
    .order("appointment_time");

  // Hangi tamamlanan randevulara yorum yapılmış?
  const completedIds = (appointments ?? [])
    .filter((a) => a.status === "completed")
    .map((a) => a.id);

  let reviewedIds: string[] = [];
  if (completedIds.length > 0) {
    const { data: reviews } = await supabase
      .from("reviews")
      .select("appointment_id")
      .in("appointment_id", completedIds)
      .eq("customer_id", user.id);
    reviewedIds = (reviews ?? []).map((r) => r.appointment_id);
  }

  const today = new Date().toISOString().split("T")[0];
  const upcoming = (appointments ?? []).find(
    (a) => a.appointment_date >= today && a.status !== "cancelled" && a.status !== "completed"
  );
  const aktif = (appointments ?? []).filter(
    (a) => a.appointment_date >= today && a.status !== "cancelled" && a.status !== "completed"
  );
  const gecmis = (appointments ?? []).filter(
    (a) => a.appointment_date < today || a.status === "completed"
  );
  const iptal = (appointments ?? []).filter((a) => a.status === "cancelled");
  const totalSpent = gecmis.reduce((sum, a) => sum + (a.price ?? 0), 0);

  return (
    <RandevularimClient
      profile={profile}
      upcoming={upcoming ?? null}
      aktif={aktif}
      gecmis={gecmis}
      iptal={iptal}
      totalSpent={totalSpent}
      reviewedIds={reviewedIds}
    />
  );
}
