import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PanelSidebar from "./PanelSidebar";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/kuafor/giris");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "business_owner") redirect("/kuafor/giris");

  const { data: businesses } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at");

  const business = businesses?.[0] ?? null;

  return (
    <div className="min-h-screen bg-[#fafaf7] flex">
      <PanelSidebar profile={profile} business={business} />
      <main className="flex-1 min-w-0 p-6 lg:p-8">{children}</main>
    </div>
  );
}
