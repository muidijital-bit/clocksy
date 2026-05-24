import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Randevu Al | Clocksy",
  description: "Hızlıca kuaför randevunuzu alın.",
};

type Props = {
  searchParams: Promise<{ isletme?: string; tarih?: string; saat?: string }>;
};

export default async function RandevuPage({ searchParams }: Props) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/giris?geri=/randevu");

  const { isletme, tarih, saat } = await searchParams;

  // Tüm işletmeleri çek
  const { data: businesses } = await supabase
    .from("businesses")
    .select("id, name, slug, type")
    .order("name");

  // Seçili işletmenin hizmet ve personelini çek
  let services: any[] = [];
  let staffList: any[] = [];
  let selectedBusiness: any = null;

  if (isletme) {
    selectedBusiness = businesses?.find((b) => b.slug === isletme || b.id === isletme) ?? null;
    if (selectedBusiness) {
      const [{ data: svcData }, { data: staffData }] = await Promise.all([
        supabase.from("business_services").select("*").eq("business_id", selectedBusiness.id).eq("is_active", true),
        supabase.from("staff").select("*").eq("business_id", selectedBusiness.id).eq("is_active", true),
      ]);
      services = svcData ?? [];
      staffList = staffData ?? [];
    }
  }

  return (
    <BookingClient
      user={{ id: user.id }}
      businesses={businesses ?? []}
      preselected={{ businessId: selectedBusiness?.id ?? null, tarih: tarih ?? null, saat: saat ?? null }}
      initialServices={services}
      initialStaff={staffList}
    />
  );
}
