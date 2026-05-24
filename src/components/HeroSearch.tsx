"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Biz = { id: string; slug: string; name: string; type: string; rating: number; price_range: string | null };

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [allBusinesses, setAllBusinesses] = useState<Biz[]>([]);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.from("businesses").select("id, slug, name, type, rating, price_range").then(({ data }) => {
      if (data) setAllBusinesses(data);
    });
  }, []);

  const suggestions = query.length >= 1
    ? allBusinesses.filter((b) =>
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.type.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const go = (q: string) => {
    setOpen(false);
    router.push(`/kesifet?ara=${encodeURIComponent(q)}`);
  };

  const goToProfile = (slug: string) => {
    setOpen(false);
    router.push(`/kesifet/${slug}`);
  };


  return (
    <div ref={wrapperRef} className="relative mx-auto mb-5" style={{ maxWidth: 600 }}>
      <div
        className="flex items-center gap-1 rounded-full p-1.5"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(24,22,19,0.08)",
          boxShadow: "0 20px 60px rgba(24,22,19,0.12), 0 1px 2px rgba(24,22,19,0.06)",
        }}
      >
        <div className="flex items-center gap-1.5 px-3 py-2 border-r border-[#e6e3da] flex-shrink-0">
          <MapPin size={15} className="text-[#181613]" />
          <span className="hidden sm:block text-sm font-medium text-[#181613] whitespace-nowrap">Kütahya</span>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => query.length >= 1 && setOpen(true)}
          onKeyDown={(e) => { if (e.key === "Enter") go(query); }}
          placeholder="kuaför veya hizmet ara…"
          className="flex-1 px-3 py-2 text-sm text-[#181613] placeholder:text-[#908a7e] bg-transparent focus:outline-none min-w-0"
        />
        <button
          onClick={() => go(query)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold text-[#fafaf7] whitespace-nowrap transition-all hover:opacity-90 flex-shrink-0"
          style={{
            background: "#181613",
            boxShadow: "0 1px 2px rgba(24,22,19,0.1), 0 8px 24px rgba(24,22,19,0.16)",
          }}
        >
          <span className="hidden sm:block">Bul</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e6e3da] rounded-2xl shadow-[var(--sh-2)] overflow-hidden z-50">
          {suggestions.map((biz) => (
            <button
              key={biz.id}
              onMouseDown={() => goToProfile(biz.slug)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f4f3ee] transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-[#181613] flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-semibold text-[#fafaf7]">
                  {biz.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#181613] truncate">{biz.name}</p>
                <p className="text-xs text-[#908a7e]">{biz.type}{biz.rating > 0 ? ` · ★ ${biz.rating.toFixed(1)}` : ""}</p>
              </div>
              <span className="text-xs text-[#908a7e] flex-shrink-0">{biz.price_range ?? ""}</span>
            </button>
          ))}
          {query.length >= 1 && (
            <button
              onMouseDown={() => go(query)}
              className="w-full flex items-center gap-3 px-4 py-3 border-t border-[#f4f3ee] hover:bg-[#f4f3ee] transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-[#f4f3ee] flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="6" cy="6" r="4.5" stroke="#908a7e" strokeWidth="1.4" />
                  <path d="M9.5 9.5L12.5 12.5" stroke="#908a7e" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm text-[#5a5750]">
                "<span className="font-medium text-[#181613]">{query}</span>" için tüm sonuçlar
              </p>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
