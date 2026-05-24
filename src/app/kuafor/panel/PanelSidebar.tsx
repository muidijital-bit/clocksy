"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Profile, Business } from "@/lib/supabase/types";
import { LogoIcon } from "@/components/Logo";

const navItems = [
  {
    href: "/kuafor/panel",
    label: "Genel Bakış",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    href: "/kuafor/panel/randevular",
    label: "Randevular",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5 1v4M11 1v4M1 7h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/kuafor/panel/hizmetler",
    label: "Hizmetler",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M3 4h6M3 12h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/kuafor/panel/personel",
    label: "Personel",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="6" cy="5" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M1 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M12 7l1.5 1.5L16 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/kuafor/panel/profil",
    label: "İşletme Profili",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1C5.24 1 3 3.24 3 6c0 4.37 5 9 5 9s5-4.63 5-9c0-2.76-2.24-5-5-5z" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
];

export default function PanelSidebar({
  profile,
  business,
}: {
  profile: Profile;
  business: Business | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/kuafor/giris");
    router.refresh();
  };

  const initials = (profile.full_name || "B")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="hidden lg:flex w-[240px] flex-shrink-0 flex-col bg-white border-r border-[#e6e3da] min-h-screen">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#e6e3da]">
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon size={24} />
          <span className="font-bold text-[#181613]" style={{ fontFamily: "var(--font-display)" }}>
            Clocksy
          </span>
        </Link>
        <div className="mt-2 inline-flex items-center gap-1 bg-[#f4f3ee] rounded-full px-2 py-0.5">
          <span className="text-[10px] text-[#5a5750]" style={{ fontFamily: "var(--font-mono)" }}>
            İŞLETME PANELİ
          </span>
        </div>
      </div>

      {/* Business info */}
      {business && (
        <div className="px-4 py-4 border-b border-[#e6e3da]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#181613] flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-[#fafaf7]">
                {business.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#181613] truncate">{business.name}</p>
              <p className="text-[11px] text-[#908a7e] truncate">{business.type}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active
                  ? "bg-[#181613] text-[#fafaf7]"
                  : "text-[#5a5750] hover:bg-[#f4f3ee] hover:text-[#181613]"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="px-3 py-4 border-t border-[#e6e3da]">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-[#f4f3ee] border border-[#e6e3da] flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-medium text-[#5a5750]">{initials}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-[#181613] truncate">{profile.full_name}</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#908a7e] hover:bg-[#f4f3ee] hover:text-[#181613] transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
