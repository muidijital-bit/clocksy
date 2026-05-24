"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateAppointmentStatus(
  appointmentId: string,
  status: "confirmed" | "cancelled" | "completed"
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Giriş yapmanız gerekiyor." };

  // Sahiplik doğrula
  const { data: appt } = await supabase
    .from("appointments")
    .select("business_id, businesses(owner_id)")
    .eq("id", appointmentId)
    .single();

  const owner = (appt?.businesses as any)?.owner_id;
  if (!appt || owner !== user.id) {
    return { error: "Bu randevuyu güncelleme yetkiniz yok." };
  }

  const { error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", appointmentId);

  if (error) return { error: error.message };

  revalidatePath("/kuafor/panel/randevular");
  revalidatePath("/randevularim");
  return { error: null };
}
