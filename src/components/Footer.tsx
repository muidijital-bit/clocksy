import Link from "next/link";
import { Share2, ExternalLink } from "lucide-react";
import { LogoIcon } from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#181613] text-[#fafaf7] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <LogoIcon inverted={true} />
              <span className="text-xl font-bold" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                Clocksy
              </span>
            </Link>
            <p className="text-sm text-[#908a7e] leading-relaxed">
              Kütahya&apos;nın en iyi kuaförlerinden online randevu almanın en kolay yolu.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://instagram.com/clocksy"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#2a2520] hover:bg-[#3a3530] transition-colors"
              >
                <Share2 size={16} />
              </a>
              <a
                href="https://facebook.com/clocksy"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#2a2520] hover:bg-[#3a3530] transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-[#d3cfc2]">Hizmetler</h3>
            <ul className="space-y-2">
              {["Klasik Saç Kesimi", "Sakal Tasarımı", "Sıcak Havlu Tıraşı", "Saç Boyama", "Keratin Bakım"].map((s) => (
                <li key={s}>
                  <Link href="/hizmetler" className="text-sm text-[#908a7e] hover:text-[#fafaf7] transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 text-[#d3cfc2]">Keşfet</h3>
            <ul className="space-y-2">
              {[
                { href: "/subeler", label: "Şubeler" },
                { href: "/blog", label: "Blog" },
                { href: "/sss", label: "SSS" },
                { href: "/hakkimizda", label: "Hakkımızda" },
                { href: "/iletisim", label: "İletişim" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#908a7e] hover:text-[#fafaf7] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-[#d3cfc2]">İletişim</h3>
            <address className="not-italic space-y-2">
              <p className="text-sm text-[#908a7e]">Cumhuriyet Caddesi No:41<br />Kütahya Merkez</p>
              <a href="tel:02741234567" className="block text-sm text-[#908a7e] hover:text-[#fafaf7] transition-colors">
                0274 123 45 67
              </a>
              <a href="mailto:merhaba@clocksy.com.tr" className="block text-sm text-[#908a7e] hover:text-[#fafaf7] transition-colors">
                merhaba@clocksy.com.tr
              </a>
            </address>
          </div>
        </div>

        <div className="border-t border-[#2a2520] mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-[#908a7e]">© 2026 Clocksy. Tüm hakları saklıdır.</p>
          <a href="https://muimedya.com" target="_blank" rel="noopener noreferrer" className="text-xs text-[#908a7e] hover:text-[#fafaf7] transition-colors">created by muimedya</a>
        </div>
      </div>
    </footer>
  );
}
