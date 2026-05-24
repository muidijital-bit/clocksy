import { Suspense } from "react";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import KesifetClient from "./KesifetClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Keşfet | Clocksy",
  description: "Kütahya'daki en iyi kuaförleri keşfedin. Puanlar ve müsaitliğe göre filtreleyin.",
};

export default async function KesifetPage() {
  const supabase = await createClient();
  const { data: businesses } = await supabase
    .from("businesses")
    .select("id, slug, name, type, rating, review_count, price_range, about, address")
    .order("rating", { ascending: false });

  return (
    <Suspense>
      <KesifetClient businesses={businesses ?? []} />
    </Suspense>
  );
}
