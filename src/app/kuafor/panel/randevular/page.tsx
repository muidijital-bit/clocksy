import { createClient } from "@/lib/supabase/server";
import RandevularClient from "./RandevularClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Randevular — Panel | Clocksy" };

export default async function RandevularPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: bList } = await supabase.from("businesses").select("id").eq("owner_id", user!.id).order("created_at").limit(1);
  const business = bList?.[0] ?? null;

  const { data: appointments } = await supabase
    .from("appointments")
    .select("*, profiles(full_name, phone), business_services(name, duration_minutes, price), staff(name)")
    .eq("business_id", business?.id ?? "")
    .order("appointment_date", { ascending: false })
    .order("appointment_time", { ascending: true });

  return <RandevularClient appointments={appointments ?? []} businessId={business?.id ?? ""} />;
}
