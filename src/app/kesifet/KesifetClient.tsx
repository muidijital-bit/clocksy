"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Business = {
  id: string;
  slug: string;
  name: string;
  type: string;
  rating: number;
  review_count: number;
  price_range: string | null;
  about: string | null;
  address: string | null;
};

const serviceChips = ["Saç kesimi", "Sakal", "Tıraş", "Boya", "Bakım", "Yıkama"];
const priceTiers = ["₺", "₺₺", "₺₺₺", "₺₺₺₺"];
const sortOptions = ["En Yüksek Puan", "A-Z"];

export default function KesifetClient({ businesses }: { businesses: Business[] }) {
  const [activePriceTiers, setActivePriceTiers] = useState<string[]>([]);
  const [activeSort, setActiveSort] = useState("En Yüksek Puan");
  const [activeRating, setActiveRating] = useState("0");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const params = useSearchParams();

  useEffect(() => {
    const ara = params.get("ara");
    if (ara) setSearch(ara);
  }, [params]);

  const togglePrice = (p: string) => {
    setActivePriceTiers((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setActivePriceTiers([]);
    setActiveRating("3.0");
    setSearch("");
  };

  const filteredBusinesses = businesses
    .filter((biz) => {
      if (!biz.slug) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!biz.name.toLowerCase().includes(q) && !biz.type.toLowerCase().includes(q)) return false;
      }
      if (activePriceTiers.length && !activePriceTiers.includes(biz.price_range ?? "")) return false;
      if ((biz.rating ?? 0) < parseFloat(activeRating)) return false;
      return true;
    })
    .sort((a, b) => {
      if (activeSort === "En Yüksek Puan") return (b.rating ?? 0) - (a.rating ?? 0);
      return a.name.localeCompare(b.name, "tr");
    });

  return (
    <div className="min-h-screen bg-[#fafaf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-[280px] flex-shrink-0">
          <div className="bg-white border border-[#e6e3da] rounded-2xl p-5 sticky top-24">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-medium text-[#181613]" style={{ fontFamily: "var(--font-display)" }}>
                Filtreler
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs text-[#908a7e] hover:text-[#181613] font-medium tracking-wide transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                SIFIRLA
              </button>
            </div>

            {/* Puan */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-[#5a5750] tracking-widest mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                PUAN
              </p>
              <div className="space-y-2">
                {["4.5", "4.0", "3.5", "3.0"].map((r) => (
                  <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      checked={activeRating === r}
                      onChange={() => setActiveRating(r)}
                      className="w-4 h-4 cursor-pointer"
                      style={{ accentColor: "#181613" }}
                    />
                    <span className="text-sm text-[#5a5750] group-hover:text-[#181613] transition-colors">
                      ★ {r} ve üzeri
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Hizmet */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-[#5a5750] tracking-widets mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                HİZMET
              </p>
              <div className="flex flex-wrap gap-2">
                {serviceChips.map((s) => (
                  <button
                    key={s}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-[#e6e3da] bg-white text-[#5a5750] hover:border-[#d3cfc2]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Fiyat aralığı */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-[#5a5750] tracking-widest mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                FİYAT ARALIĞI
              </p>
              <div className="flex gap-2">
                {priceTiers.map((p) => (
                  <button
                    key={p}
                    onClick={() => togglePrice(p)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activePriceTiers.includes(p)
                        ? "bg-[#181613] text-[#fafaf7]"
                        : "border border-[#e6e3da] bg-white text-[#5a5750] hover:border-[#d3cfc2]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-medium text-[#181613]" style={{ fontFamily: "var(--font-display)" }}>
                Kütahya
              </h2>
              <p className="text-xs text-[#908a7e] mt-1 tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
                {filteredBusinesses.length} SONUÇ
              </p>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {sortOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSort(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeSort === s
                      ? "bg-[#181613] text-[#fafaf7]"
                      : "border border-[#e6e3da] bg-white text-[#5a5750] hover:border-[#d3cfc2]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#908a7e]">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="kuaför veya hizmet ara…"
              className="w-full pl-10 pr-4 py-2.5 border border-[#e6e3da] rounded-xl text-sm text-[#181613] placeholder:text-[#908a7e] focus:outline-none focus:border-[#181613] bg-white transition-colors"
            />
          </div>

          {/* Grid */}
          {filteredBusinesses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#908a7e] text-sm mb-2">Sonuç bulunamadı.</p>
              <button onClick={resetFilters} className="text-sm text-[#181613] underline">Filtreleri temizle</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredBusinesses.map((biz) => (
                <Link
                  key={biz.id}
                  href={`/kesifet/${biz.slug}`}
                  className="block bg-white border border-[#e6e3da] rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Cover placeholder */}
                  <div
                    className="relative h-[160px] flex items-center justify-center"
                    style={{
                      background: "repeating-linear-gradient(45deg, rgba(24,22,19,.03) 0 12px, rgba(24,22,19,.06) 12px 24px), linear-gradient(135deg, #f4f3ee, #ebe9e2)"
                    }}
                  >
                    <span className="text-3xl font-semibold text-[#c9c4bb]" style={{ fontFamily: "var(--font-display)" }}>
                      {biz.name.slice(0, 2).toUpperCase()}
                    </span>
                    {/* Favorite */}
                    <button
                      onClick={(e) => { e.preventDefault(); toggleFavorite(biz.id); }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/40 transition-colors"
                      aria-label="Favorilere ekle"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill={favorites.includes(biz.id) ? "#fafaf7" : "none"} stroke="#fafaf7" strokeWidth="1.4">
                        <path d="M7 12S1 8.5 1 4.5a3 3 0 0 1 6 0 3 3 0 0 1 6 0C13 8.5 7 12 7 12z" />
                      </svg>
                    </button>
                  </div>

                  {/* Card content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-[#181613] text-sm leading-tight">{biz.name}</h3>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <span className="text-amber-500 text-xs">★</span>
                        <span className="text-sm font-semibold text-[#181613]">{biz.rating > 0 ? biz.rating.toFixed(1) : "—"}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#908a7e] tracking-wider mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                      {biz.type.toUpperCase()}{biz.review_count > 0 ? ` · ${biz.review_count} YORUM` : ""}
                    </p>
                    {biz.address && (
                      <p className="text-xs text-[#908a7e] mb-3 truncate">{biz.address}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#5a5750]">{biz.price_range ?? ""}</span>
                      <span className="bg-[#181613] text-[#fafaf7] rounded-xl px-4 py-2 text-xs font-semibold">
                        İncele
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
