import { createClient } from "@/lib/supabase/server";
import HizmetlerClient from "./HizmetlerClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Hizmetler — Panel | Clocksy" };

export default async function HizmetlerPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: bList } = await supabase.from("businesses").select("id").eq("owner_id", user!.id).order("created_at").limit(1);
  const business = bList?.[0] ?? null;

  const { data: services } = await supabase
    .from("business_services")
    .select("*")
    .eq("business_id", business?.id ?? "")
    .order("created_at");

  return <HizmetlerClient services={services ?? []} businessId={business?.id ?? ""} />;
}
