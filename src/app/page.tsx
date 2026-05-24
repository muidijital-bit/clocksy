import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Calendar, CheckCircle, Star, ArrowRight } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";
import PhotoWall from "@/components/PhotoWall";
import { branches, services, testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Clocksy — Kütahya'nın kuaför Randevu Platformu",
  description:
    "Kütahya'nın en iyi kuaförlerinden online randevu alın. Profesyonel saç kesimi, sakal tasarımı, sıcak havlu tıraşı ve daha fazlası.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero — slides under transparent sticky navbar */}
      <section
        className="relative overflow-hidden -mt-16"
        style={{ minHeight: 720 }}
      >
        <PhotoWall />

        <div className="relative flex items-center justify-center px-4 sm:px-6 pt-28 pb-16 sm:pt-36 sm:pb-24" style={{ zIndex: 10 }}>
          <div
            className="max-w-3xl w-full text-center px-8 sm:px-16 py-10 sm:py-14 rounded-2xl"
            style={{
              background: "rgba(0,0,0,0)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <h1
              className="text-[clamp(40px,8vw,86px)] text-white mb-5 leading-[0.95] tracking-[-0.04em] font-normal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Şehrinin{" "}
              <em
                className="italic"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                en iyi
              </em>
              <br />
              kuaförünü bul.
            </h1>

            <p className="text-base sm:text-lg font-semibold text-white/90 max-w-[520px] mx-auto mb-8 leading-relaxed px-2">
              Kütahya&apos;nın seçkin kuaförleri Clocksy&apos;da. Tek tıkla müsait saat,
              gerçek puanlar ve şeffaf fiyatlar.
            </p>

            <HeroSearch />

            {/* Stats */}
            <div
              className="inline-flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-white/70 px-6 py-3 rounded-full"
              style={{
                fontFamily: "var(--font-mono)",
                background: "rgba(0,0,0,0.30)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <span><span className="text-white font-bold">240+</span> kuaför</span>
              <span className="opacity-30 hidden sm:inline">·</span>
              <span><span className="text-white font-bold">12.4K</span> randevu / ay</span>
              <span className="opacity-30 hidden sm:inline">·</span>
              <span><span className="text-white font-bold">4.8</span> ortalama puan</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-28 px-4 sm:px-6 bg-white border-t border-[#e6e3da] relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">

          {/* Başlık bloğu */}
          <div className="flex items-end justify-between mb-10 sm:mb-16 gap-6 sm:gap-12 flex-wrap">
            <div className="max-w-[520px]">
              <div
                className="text-xs text-[#908a7e] tracking-[0.2em] uppercase mb-4 flex items-center gap-2.5"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span className="w-5 h-px bg-[#181613] inline-block" />
                Nasıl çalışır
              </div>
              <h2
                className="text-[clamp(36px,5vw,56px)] leading-[1] tracking-[-0.035em] text-[#181613] mb-4 font-normal"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Üç adımda{" "}
                <em className="italic" style={{ fontFamily: "var(--font-display)" }}>koltuğa</em>{" "}
                otur.
              </h2>
              <p className="text-[15px] text-[#5a5750] leading-relaxed max-w-[420px]">
                Saat ayarlamak için telefona sarılma. Birkaç tıkla şehrindeki en iyi ustayı
                bul, müsait saati seç, tamam.
              </p>
            </div>
            <div
              className="sm:text-right"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <div className="text-xs text-[#908a7e] tracking-widest uppercase">Ortalama süre</div>
              <div
                className="text-[32px] sm:text-[36px] text-[#181613] leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                42 sn
              </div>
            </div>
          </div>

          {/* Step rail */}
          <div className="relative">
            {/* Connector dashed line */}
            <div
              className="absolute top-7 hidden md:block"
              style={{
                left: "8.33%", right: "8.33%", height: 1,
                backgroundImage: "repeating-linear-gradient(90deg, #d3cfc2 0 6px, transparent 6px 12px)",
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

              {/* STEP 01 — Şehrini seç */}
              <div className="flex flex-col items-center">
                <div
                  className="w-14 h-14 rounded-full bg-white border border-[#d3cfc2] flex items-center justify-center mb-7 relative z-10 text-[#181613] text-sm font-semibold"
                  style={{ fontFamily: "var(--font-mono)", boxShadow: "0 2px 8px rgba(24,22,19,0.04)" }}
                >
                  01
                </div>
                <div className="bg-white border border-[#e6e3da] rounded-2xl overflow-hidden w-full" style={{ boxShadow: "var(--sh-1)" }}>
                  {/* Mini harita mockup */}
                  <div className="relative h-36 bg-gradient-to-br from-[#f4f3ee] to-[#ebe9e2] border-b border-[#e6e3da] overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 320 144" preserveAspectRatio="none">
                      <path d="M0 36 Q80 45 160 63 T320 81" stroke="#d3cfc2" strokeWidth="14" fill="none" />
                      <path d="M0 36 Q80 45 160 63 T320 81" stroke="#fafaf7" strokeWidth="2" fill="none" />
                      <path d="M60 0 Q90 54 110 99 T140 144" stroke="#d3cfc2" strokeWidth="10" fill="none" />
                      <path d="M60 0 Q90 54 110 99 T140 144" stroke="#fafaf7" strokeWidth="1.5" fill="none" />
                      <path d="M220 0 L250 144" stroke="#d3cfc2" strokeWidth="8" fill="none" />
                      <path d="M220 0 L250 144" stroke="#fafaf7" strokeWidth="1.5" fill="none" />
                    </svg>
                    {/* Pin aktif */}
                    <div className="absolute" style={{ left: 80, top: 43 }}>
                      <div className="w-6 h-6 rounded-full bg-[#181613] border-[3px] border-white" style={{ boxShadow: "0 4px 12px rgba(24,22,19,0.3)" }} />
                    </div>
                    {/* Radius çemberi */}
                    <div className="absolute rounded-full border border-dashed border-[rgba(24,22,19,0.25)] bg-[rgba(24,22,19,0.04)]" style={{ left: 44, top: 15, width: 88, height: 88 }} />
                    {/* Pasif pinler */}
                    <div className="absolute w-4 h-4 rounded-full bg-[#5a5750] border-2 border-white opacity-55" style={{ left: 178, top: 72 }} />
                    <div className="absolute w-4 h-4 rounded-full bg-[#5a5750] border-2 border-white opacity-55" style={{ left: 240, top: 99 }} />
                    {/* Chip */}
                    <div className="absolute flex items-center gap-1.5 bg-white border border-[#e6e3da] rounded-full px-3 py-1.5 text-[11px] font-medium text-[#181613]" style={{ left: 12, top: 12, boxShadow: "0 4px 12px rgba(24,22,19,0.08)" }}>
                      <MapPin size={10} /> Kütahya, Merkez
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[20px] text-[#181613] mb-2 font-normal tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Şehrini seç</h3>
                    <p className="text-[13px] text-[#5a5750] leading-relaxed mb-3">
                      Konumunu paylaş ya da semt ara. Yakındaki en iyi seçenekleri mesafeye göre sıralayalım.
                    </p>
                    <span className="text-[11px] text-[#908a7e]" style={{ fontFamily: "var(--font-mono)" }}>~10 sn</span>
                  </div>
                </div>
              </div>

              {/* STEP 02 — Müsait saati bul */}
              <div className="flex flex-col items-center">
                <div
                  className="w-14 h-14 rounded-full bg-white border border-[#d3cfc2] flex items-center justify-center mb-7 relative z-10 text-[#181613] text-sm font-semibold"
                  style={{ fontFamily: "var(--font-mono)", boxShadow: "0 2px 8px rgba(24,22,19,0.04)" }}
                >
                  02
                </div>
                <div className="bg-white border border-[#e6e3da] rounded-2xl overflow-hidden w-full" style={{ boxShadow: "var(--sh-1)" }}>
                  {/* Mini takvim + saat slot mockup */}
                  <div className="h-36 p-4 bg-white border-b border-[#e6e3da] overflow-hidden">
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="text-[9px] text-[#908a7e] tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>Pzt 14 Eki</span>
                      <span className="text-[9px] text-[#908a7e]" style={{ fontFamily: "var(--font-mono)" }}>›</span>
                    </div>
                    {/* Gün şeridi */}
                    <div className="flex gap-1 mb-3">
                      {[{ d: "14", l: "Pzt", on: true }, { d: "15", l: "Sal" }, { d: "16", l: "Çar" }, { d: "17", l: "Per" }, { d: "18", l: "Cum" }].map((x) => (
                        <div key={x.d} className="flex-1 rounded-md py-1 text-center" style={{ background: x.on ? "#181613" : "#ebe9e2" }}>
                          <div className="text-[8px] opacity-70 tracking-wider" style={{ fontFamily: "var(--font-mono)", color: x.on ? "#fafaf7" : "#5a5750" }}>{x.l}</div>
                          <div className="text-[12px] font-semibold leading-tight mt-0.5" style={{ color: x.on ? "#fafaf7" : "#5a5750" }}>{x.d}</div>
                        </div>
                      ))}
                    </div>
                    {/* Saat slotları */}
                    <div className="grid grid-cols-4 gap-1">
                      {[
                        { t: "09:30", av: false }, { t: "10:00", av: true }, { t: "10:30", av: true, sel: true }, { t: "11:00", av: false },
                        { t: "11:30", av: true }, { t: "13:00", av: true }, { t: "13:30", av: false }, { t: "14:00", av: true },
                      ].map((x, i) => (
                        <div key={i} className="py-1 rounded text-center text-[10px] font-medium border" style={{
                          fontFamily: "var(--font-mono)",
                          background: x.sel ? "#181613" : (x.av ? "#fff" : "#f4f3ee"),
                          color: x.sel ? "#fff" : (x.av ? "#181613" : "#908a7e"),
                          borderColor: x.sel ? "#181613" : "#e6e3da",
                          textDecoration: x.av ? "none" : "line-through",
                          opacity: x.av ? 1 : 0.5,
                        }}>{x.t}</div>
                      ))}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[20px] text-[#181613] mb-2 font-normal tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Müsait saati bul</h3>
                    <p className="text-[13px] text-[#5a5750] leading-relaxed mb-3">
                      Usta, hizmet ve saat seç. Onaylanmış puanlar ve gerçek yorumlarla doğru kararı ver.
                    </p>
                    <span className="text-[11px] text-[#908a7e]" style={{ fontFamily: "var(--font-mono)" }}>~25 sn</span>
                  </div>
                </div>
              </div>

              {/* STEP 03 — Koltuğa otur (koyu zemin ticket) */}
              <div className="flex flex-col items-center">
                <div
                  className="w-14 h-14 rounded-full bg-[#181613] border border-[#181613] flex items-center justify-center mb-7 relative z-10 text-[#fafaf7] text-sm font-semibold"
                  style={{ fontFamily: "var(--font-mono)", boxShadow: "0 8px 20px rgba(24,22,19,0.18)" }}
                >
                  03
                </div>
                <div className="bg-white border border-[#e6e3da] rounded-2xl overflow-hidden w-full" style={{ boxShadow: "var(--sh-1)" }}>
                  {/* Bilet mockup — koyu zemin */}
                  <div className="relative h-36 p-4 bg-[#181613] text-[#fafaf7] border-b border-[#e6e3da] overflow-hidden">
                    {/* Perfore çizgi */}
                    <div className="absolute left-0 right-0 border-t border-dashed border-white/20" style={{ bottom: 28 }} />
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-[9px] tracking-widest uppercase opacity-55 mb-1" style={{ fontFamily: "var(--font-mono)" }}>Onaylandı</div>
                        <div className="text-[15px] leading-tight tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Emirhan K. · Saç + Sakal</div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={13} className="text-[#fafaf7]" />
                      </div>
                    </div>
                    <div className="flex gap-5 mb-3">
                      {[{ l: "Tarih", v: "14 Eki" }, { l: "Saat", v: "10:30" }, { l: "Süre", v: "45 dk" }].map((x) => (
                        <div key={x.l}>
                          <div className="text-[8px] opacity-50 tracking-widest uppercase mb-0.5" style={{ fontFamily: "var(--font-mono)" }}>{x.l}</div>
                          <div className="text-[11px] font-medium" style={{ fontFamily: "var(--font-mono)" }}>{x.v}</div>
                        </div>
                      ))}
                    </div>
                    {/* SMS toast */}
                    <div className="absolute left-4 right-4 bottom-2 flex items-center gap-2 bg-white/8 border border-white/12 rounded-lg px-2.5 py-1.5">
                      <Calendar size={10} className="text-[#fafaf7] opacity-80" />
                      <span className="text-[10px] opacity-85" style={{ fontFamily: "var(--font-mono)" }}>SMS hatırlatma 1 saat önce</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[20px] text-[#181613] mb-2 font-normal tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Koltuğa otur</h3>
                    <p className="text-[13px] text-[#5a5750] leading-relaxed mb-3">
                      Onayını anında al. SMS bildirimiyle randevuna kadar her şey hatırlanır.
                    </p>
                    <span className="text-[11px] text-[#908a7e]" style={{ fontFamily: "var(--font-mono)" }}>~7 sn</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Trust footer */}
          <div
            className="mt-10 sm:mt-14 pt-6 sm:pt-7 border-t border-[#e6e3da] flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-2 sm:gap-4 text-[11px] text-[#908a7e] tracking-widest uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span>Ücretsiz iptal · randevudan 2 saat öncesine kadar</span>
            <span>iyzico güvencesi</span>
            <span>Onaylanmış 4.8 ★ ortalama</span>
          </div>
        </div>
      </section>

      {/* Featured branches */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-[#fafaf7]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8 sm:mb-10">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-medium text-[#181613] mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Şubelerimiz
              </h2>
              <p className="text-sm sm:text-base text-[#5a5750]">Kütahya&apos;nın her köşesinde hizmetinizdeyiz.</p>
            </div>
            <Link
              href="/subeler"
              className="flex items-center gap-1.5 text-sm text-[#5a5750] hover:text-[#181613] transition-colors flex-shrink-0"
            >
              <span className="hidden sm:block">Tümünü gör</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {branches.map((branch, i) => {
              const gradients = [
                "from-amber-50 to-orange-50",
                "from-stone-50 to-amber-50",
                "from-orange-50 to-red-50",
              ];
              return (
                <Link
                  key={branch.id}
                  href="/subeler"
                  className={`bg-gradient-to-br ${gradients[i]} border border-[#e6e3da] rounded-2xl p-5 hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-[#908a7e] bg-white/60 px-2 py-1 rounded-full">
                      {branch.city}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-[#5a5750]">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {branch.rating}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#181613] mb-1">{branch.district}</h3>
                  <p className="text-sm text-[#5a5750] mb-3">{branch.address}</p>
                  <div className="flex items-center justify-between text-xs text-[#908a7e]">
                    <span>{branch.staffCount} usta</span>
                    <span>{branch.reviews} değerlendirme</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular services */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8 sm:mb-10">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-medium text-[#181613] mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Popüler hizmetler
              </h2>
              <p className="text-sm sm:text-base text-[#5a5750]">En çok tercih edilen bakım seçeneklerimiz.</p>
            </div>
            <Link
              href="/hizmetler"
              className="flex items-center gap-1.5 text-sm text-[#5a5750] hover:text-[#181613] transition-colors flex-shrink-0"
            >
              <span className="hidden sm:block">Tüm hizmetler</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.slice(0, 4).map((service) => (
              <Link
                key={service.slug}
                href={`/hizmetler/${service.slug}`}
                className="group bg-[#fafaf7] border border-[#e6e3da] rounded-2xl p-5 hover:border-[#d3cfc2] hover:shadow-sm transition-all"
              >
                {service.popular && (
                  <span className="inline-block text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mb-3">
                    En Popüler
                  </span>
                )}
                <h3 className="font-semibold text-[#181613] mb-1 group-hover:text-[#2a2520]">
                  {service.name}
                </h3>
                <p className="text-sm text-[#5a5750] mb-4 line-clamp-2">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#181613]">{service.price} ₺</span>
                  <span className="text-xs text-[#908a7e]">{service.duration} dk</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-[#f4f3ee]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2
              className="text-3xl sm:text-4xl font-medium text-[#181613] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Müşterilerimiz ne diyor?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 border border-[#e6e3da]"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-[#5a5750] leading-relaxed mb-4">&ldquo;{t.comment}&rdquo;</p>
                <p className="text-sm font-semibold text-[#181613]">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#181613] text-[#fafaf7]">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-medium mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Hemen randevu al.
          </h2>
          <p className="text-[#908a7e] mb-8 text-lg">
            Bekleme yok, kuyruk yok. Sadece otur ve bırak kendini ustalara.
          </p>
          <Link
            href="/randevu"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#fafaf7] text-[#181613] font-semibold text-base hover:bg-white transition-colors"
          >
            Randevu Al
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
