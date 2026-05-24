"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoIcon } from "@/components/Logo";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function GirisPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const geri = searchParams.get("geri") || "/randevularim";

  const [mode, setMode] = useState<"giris" | "kayit">("giris");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });

  const supabase = createClient();

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (mode === "giris") {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) { setError(error.message); setLoading(false); return; }
    } else {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { full_name: form.full_name, role: "customer" },
        },
      });
      if (error) { setError(error.message); setLoading(false); return; }
    }

    router.push(geri);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <LogoIcon size={32} />
            <span className="text-2xl font-bold text-[#181613]" style={{ fontFamily: "var(--font-display)" }}>
              Clocksy
            </span>
          </Link>
          <p className="mt-3 text-sm text-[#908a7e]">
            {mode === "giris" ? "Hesabına giriş yap" : "Ücretsiz hesap oluştur"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#e6e3da] rounded-2xl p-6 shadow-[var(--sh-1)]">
          {/* Tab toggle */}
          <div className="flex bg-[#f4f3ee] rounded-xl p-1 mb-6">
            {(["giris", "kayit"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(null); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  mode === m ? "bg-white text-[#181613] shadow-[var(--sh-1)]" : "text-[#908a7e]"
                }`}
              >
                {m === "giris" ? "Giriş Yap" : "Kayıt Ol"}
              </button>
            ))}
          </div>

          <form onSubmit={handle} className="space-y-4">
            {mode === "kayit" && (
              <div>
                <label className="block text-xs font-medium text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                  AD SOYAD
                </label>
                <input
                  type="text"
                  required
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  placeholder="Mert Yılmaz"
                  className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm text-[#181613] placeholder:text-[#d3cfc2] focus:outline-none focus:border-[#181613] transition-colors bg-white"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                E-POSTA
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ornek@email.com"
                className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm text-[#181613] placeholder:text-[#d3cfc2] focus:outline-none focus:border-[#181613] transition-colors bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                ŞİFRE
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="En az 6 karakter"
                className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm text-[#181613] placeholder:text-[#d3cfc2] focus:outline-none focus:border-[#181613] transition-colors bg-white"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#181613] text-[#fafaf7] rounded-xl text-sm font-semibold hover:bg-[#2a2520] transition-colors disabled:opacity-60"
            >
              {loading ? "Lütfen bekleyin…" : mode === "giris" ? "Giriş Yap" : "Hesap Oluştur"}
            </button>
          </form>

          <p className="text-center text-xs text-[#908a7e] mt-4">
            İşletme sahibi misin?{" "}
            <Link href="/kuafor/giris" className="text-[#181613] font-medium hover:underline">
              kuaför girişi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
