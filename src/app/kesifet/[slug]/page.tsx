import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import BusinessProfileClient from "./BusinessProfileClient";

type Props = { params: Promise<{ slug: string }> };

export default async function BusinessProfilePage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: biz } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!biz) notFound();

  const [{ data: services }, { data: hours }] = await Promise.all([
    supabase
      .from("business_services")
      .select("*")
      .eq("business_id", biz.id)
      .eq("is_active", true)
      .order("price"),
    supabase
      .from("business_hours")
      .select("*")
      .eq("business_id", biz.id)
      .order("day_of_week"),
  ]);

  return (
    <BusinessProfileClient
      biz={biz}
      services={services ?? []}
      hours={hours ?? []}
    />
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: biz } = await supabase
    .from("businesses")
    .select("name, type, address, rating")
    .eq("slug", slug)
    .single();
  if (!biz) return {};
  return {
    title: `${biz.name} — ${biz.type} | Clocksy`,
    description: `${biz.name} — ${biz.address ?? "Kütahya"}. Puan: ${biz.rating}. Online randevu alın.`,
  };
}
