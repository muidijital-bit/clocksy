"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NavbarUserMenu({ profile }: { profile: { full_name: string | null; role: string } }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const initials = (profile.full_name || "U")
    .split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#e6e3da] hover:border-[#d3cfc2] transition-colors"
      >
        <div className="w-6 h-6 rounded-full bg-[#181613] flex items-center justify-center">
          <span className="text-[10px] font-semibold text-[#fafaf7]">{initials}</span>
        </div>
        <span className="text-sm text-[#5a5750] hidden sm:block">{profile.full_name?.split(" ")[0]}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#908a7e]">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-11 z-50 w-48 bg-white border border-[#e6e3da] rounded-xl shadow-[var(--sh-2)] py-1">
            {profile.role === "business_owner" ? (
              <Link href="/kuafor/panel" onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-[#5a5750] hover:bg-[#f4f3ee] hover:text-[#181613]">
                İşletme Paneli
              </Link>
            ) : (
              <Link href="/randevularim" onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-[#5a5750] hover:bg-[#f4f3ee] hover:text-[#181613]">
                Randevularım
              </Link>
            )}
            <div className="border-t border-[#f4f3ee] my-1" />
            <button onClick={signOut}
              className="w-full text-left px-4 py-2.5 text-sm text-[#5a5750] hover:bg-[#f4f3ee] hover:text-[#181613]">
              Çıkış Yap
            </button>
          </div>
        </>
      )}
    </div>
  );
}
