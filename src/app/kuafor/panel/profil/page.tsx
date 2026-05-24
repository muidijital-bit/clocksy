import { createClient } from "@/lib/supabase/server";
import ProfilClient from "./ProfilClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "İşletmelerim — Panel | Clocksy" };

const defaultHours = [0, 1, 2, 3, 4, 5, 6].map((d) => ({
  day_of_week: d,
  open_time: d === 0 ? null : "09:00",
  close_time: d === 0 ? null : "19:00",
  is_closed: d === 0,
}));

export default async function ProfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: businesses } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user!.id)
    .order("created_at");

  const hoursMap: Record<string, any[]> = {};
  if (businesses?.length) {
    for (const biz of businesses) {
      const { data: hours } = await supabase
        .from("business_hours")
        .select("*")
        .eq("business_id", biz.id)
        .order("day_of_week");
      hoursMap[biz.id] = hours?.length ? hours : defaultHours;
    }
  }

  return (
    <ProfilClient
      businesses={businesses ?? []}
      hoursMap={hoursMap}
      ownerId={user!.id}
    />
  );
}
