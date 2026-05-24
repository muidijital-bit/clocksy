"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ReviewModal({
  appointment,
  onClose,
  onDone,
}: {
  appointment: any;
  onClose: () => void;
  onDone: (id: string) => void;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const submit = async () => {
    setLoading(true);
    setError(null);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("reviews").insert({
      appointment_id: appointment.id,
      customer_id: user?.id,
      business_id: appointment.business_id,
      rating,
      comment: comment || null,
    });
    if (error) { setError(error.message); setLoading(false); return; }
    onDone(appointment.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-[var(--sh-2)]">
        <h2 className="text-lg font-medium text-[#181613] mb-1" style={{ fontFamily: "var(--font-display)" }}>
          Yorum Yap
        </h2>
        <p className="text-xs text-[#908a7e] mb-5">{appointment.businesses?.name}</p>

        {/* Star rating */}
        <div className="flex gap-2 mb-5">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => setRating(s)}
              className={`text-2xl transition-all ${s <= rating ? "text-amber-400" : "text-[#e6e3da]"}`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder="Deneyiminizi paylaşın…"
          className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613] resize-none mb-4"
        />

        {error && <p className="text-xs text-red-600 mb-3">{error}</p>}

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 border border-[#e6e3da] rounded-xl text-sm text-[#5a5750]">
            Vazgeç
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 py-2.5 bg-[#181613] text-[#fafaf7] rounded-xl text-sm font-semibold disabled:opacity-60"
          >
            {loading ? "Gönderiliyor…" : "Gönder"}
          </button>
        </div>
      </div>
    </div>
  );
}
