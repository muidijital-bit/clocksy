import { createClient } from "@/lib/supabase/server";
import PersonelClient from "./PersonelClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Personel — Panel | Clocksy" };

export default async function PersonelPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: bList } = await supabase.from("businesses").select("id").eq("owner_id", user!.id).order("created_at").limit(1);
  const business = bList?.[0] ?? null;

  const { data: staff } = await supabase
    .from("staff").select("*").eq("business_id", business?.id ?? "").order("created_at");

  return <PersonelClient staff={staff ?? []} businessId={business?.id ?? ""} />;
}
