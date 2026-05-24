"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoIcon } from "@/components/Logo";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function kuaförGirisPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"giris" | "kayit">("giris");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    business_name: "",
    email: "",
    password: "",
  });

  const supabase = createClient();

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (mode === "giris") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) { setError(error.message); setLoading(false); return; }
      // Rol kontrol
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();
      if (profile?.role !== "business_owner") {
        await supabase.auth.signOut();
        setError("Bu hesap işletme sahibine ait değil.");
        setLoading(false);
        return;
      }
      router.push("/kuafor/panel");
      router.refresh();
    } else {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.full_name,
            role: "business_owner",
            business_name: form.business_name,
          },
        },
      });
      if (error) { setError(error.message); setLoading(false); return; }
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#181613] flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L19 7" stroke="#fafaf7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-[#181613] mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Hesabınız oluşturuldu
          </h2>
          <p className="text-sm text-[#5a5750] mb-6">
            E-postanıza doğrulama linki gönderdik. Onayladıktan sonra giriş yapabilirsiniz.
          </p>
          <button
            onClick={() => { setSuccess(false); setMode("giris"); }}
            className="bg-[#181613] text-[#fafaf7] px-6 py-2.5 rounded-xl text-sm font-medium"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

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
          <div className="mt-3 inline-flex items-center gap-1.5 bg-[#f4f3ee] border border-[#e6e3da] rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#181613]" />
            <span className="text-xs text-[#5a5750]" style={{ fontFamily: "var(--font-mono)" }}>
              İŞLETME PANELİ
            </span>
          </div>
        </div>

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
                {m === "giris" ? "Giriş Yap" : "İşletme Ekle"}
              </button>
            ))}
          </div>

          <form onSubmit={handle} className="space-y-4">
            {mode === "kayit" && (
              <>
                <div>
                  <label className="block text-xs font-medium text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                    AD SOYAD
                  </label>
                  <input
                    type="text"
                    required
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    placeholder="Emirhan Demir"
                    className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5a5750] mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                    İŞLETME ADI
                  </label>
                  <input
                    type="text"
                    required
                    value={form.business_name}
                    onChange={(e) => setForm({ ...form, business_name: e.target.value })}
                    placeholder="Atelier 41"
                    className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613] transition-colors"
                  />
                </div>
              </>
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
                placeholder="kuaför@email.com"
                className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613] transition-colors"
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
                className="w-full px-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm focus:outline-none focus:border-[#181613] transition-colors"
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
              {loading ? "Lütfen bekleyin…" : mode === "giris" ? "Panele Giriş Yap" : "İşletmemi Ekle"}
            </button>
          </form>

          <p className="text-center text-xs text-[#908a7e] mt-4">
            Müşteri misin?{" "}
            <Link href="/giris" className="text-[#181613] font-medium hover:underline">
              Müşteri girişi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
