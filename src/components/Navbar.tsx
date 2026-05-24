import { createClient } from "@/lib/supabase/server";
import NavbarUserMenu from "./NavbarUserMenu";
import NavbarWrapper from "./NavbarWrapper";
import { LogoLink } from "./Logo";
import Link from "next/link";

const publicLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/kesifet", label: "Keşfet" },
];

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase.from("profiles").select("full_name, role").eq("id", user.id).single();
    profile = data;
  }

  const isOwner = profile?.role === "business_owner";

  const navLinks = [
    ...publicLinks,
    isOwner
      ? { href: "/kuafor/panel", label: "Panel" }
      : { href: "/randevularim", label: "Randevularım" },
  ];

  return (
    <NavbarWrapper>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <LogoLink />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="px-3 py-2 text-sm font-semibold text-[#181613] hover:text-[#181613] transition-colors rounded-lg hover:bg-[#f4f3ee]">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA / User */}
        <div className="flex items-center gap-3">
          {user && profile ? (
            <NavbarUserMenu profile={profile} />
          ) : (
            <>
              <Link href="/giris"
                className="hidden sm:inline-flex text-sm font-semibold text-[#181613] hover:text-[#181613] transition-colors px-3 py-2 rounded-lg hover:bg-[#f4f3ee]">
                Giriş Yap
              </Link>
              <Link href="/randevu"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-[#181613] text-[#fafaf7] text-sm font-medium hover:bg-[#2a2520] transition-colors">
                Randevu Al
              </Link>
            </>
          )}

          <label htmlFor="mobile-menu-toggle" className="md:hidden cursor-pointer p-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Menü">
              <path d="M2 5h16M2 10h16M2 15h16" stroke="#181613" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </label>
        </div>
      </div>

      {/* Mobile menu */}
      <input type="checkbox" id="mobile-menu-toggle" className="hidden peer" />
      <nav className="hidden peer-checked:block md:hidden border-t border-[#e6e3da] bg-white px-4 py-3">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}
            className="block px-3 py-2.5 text-sm font-semibold text-[#181613] rounded-lg hover:bg-[#f4f3ee]">
            {link.label}
          </Link>
        ))}
        {!user && (
          <>
            <Link href="/giris" className="block px-3 py-2.5 text-sm font-semibold text-[#181613] rounded-lg hover:bg-[#f4f3ee]">
              Giriş Yap
            </Link>
            <Link href="/randevu" className="mt-2 block text-center px-4 py-2.5 rounded-lg bg-[#181613] text-[#fafaf7] text-sm font-medium">
              Randevu Al
            </Link>
          </>
        )}
      </nav>
    </NavbarWrapper>
  );
}
