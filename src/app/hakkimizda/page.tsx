import type { Metadata } from "next";
import { Star, Shield, Zap, Eye } from "lucide-react";
import { staff } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hakkımızda | Clocksy",
  description:
    "Clocksy, 2024 yılında Kütahya'da kurulan bir kuaför randevu platformudur. Hikayemizi ve değerlerimizi öğrenin.",
};

export default function HakkimizdaPage() {
  return (
    <div className="bg-[#fafaf7] min-h-screen">
      {/* Hero */}
      <section className="bg-[#181613] text-[#fafaf7] py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#908a7e] text-sm mb-3">Hakkımızda</p>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-5"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Clocksy nedir?
          </h1>
          <p className="text-[#908a7e] text-lg leading-relaxed max-w-xl mx-auto">
            Kütahya&apos;nın köklü kuaför kültürünü dijitale taşıyan bir randevu platformu. Ustalar için kolaylık, müşteriler için güven.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { value: "240+", label: "Kayıtlı kuaför" },
            { value: "12.4K", label: "Aylık Randevu" },
            { value: "3", label: "Aktif Şube" },
            { value: "4.8", label: "Ortalama Puan" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-[#e6e3da] rounded-2xl p-5 text-center"
            >
              <p
                className="text-3xl font-bold text-[#181613] mb-1"
                style={{ fontFamily: "var(--font-fraunces), serif" }}
              >
                {stat.value}
              </p>
              <p className="text-sm text-[#908a7e]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <div>
            <h2
              className="text-3xl font-bold text-[#181613] mb-6"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              Hikayemiz
            </h2>
            <div className="space-y-4 text-[#5a5750] leading-relaxed">
              <p>
                Clocksy, 2024 yılının başında Kütahya&apos;da doğdu. Fikir, uzun yıllar kuaförde çalışan Emirhan Koç ile yazılım geçmişine sahip bir arkadaşının sohbetinden çıktı: &ldquo;Neden telefonla randevu alıyoruz hâlâ?&rdquo;
              </p>
              <p>
                Kütahya, kuaförlik açısından zengin bir şehir. Esnaf ruhuna sahip, müşterisiyle derin ilişki kuran ustalar burada bol. Ancak bu ustalar günün büyük bölümünü telefon aramalarıyla geçiriyordu; hem randevu yönetimi zorlaşıyor hem de müşteriler bekleme sürelerinden şikayet ediyordu.
              </p>
              <p>
                Clocksy&apos;ı kurarak bu döngüyü kırdık. Artık usta telefona bakmak yerine işine odaklanıyor, müşteri ise istediği saatte çevrimiçi randevu alıyor. İlk altı ayda Kütahya Merkez&apos;deki şubemiz 400&apos;den fazla değerlendirme topladı. Bunu gördükçe büyümeye devam ettik.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-[#e6e3da] rounded-2xl h-64 lg:h-auto flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl mb-3">✂️</p>
              <p className="font-medium text-[#5a5750]">Kütahya, 2024</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2
            className="text-3xl font-bold text-[#181613] mb-8 text-center"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Ustalarımız
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {staff.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-[#e6e3da] rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#ebe9e2] flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-[#5a5750] text-lg">{member.initials}</span>
                </div>
                <h3 className="font-bold text-[#181613] mb-0.5">{member.name}</h3>
                <p className="text-sm text-[#908a7e] mb-3">{member.title} · {member.experience}</p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium text-[#5a5750]">{member.rating} ({member.reviews} değerlendirme)</span>
                </div>
                <p className="text-sm text-[#5a5750] leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                  {member.specialties.map((s) => (
                    <span key={s} className="text-xs bg-[#f4f3ee] text-[#5a5750] px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div>
          <h2
            className="text-3xl font-bold text-[#181613] mb-8 text-center"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Değerlerimiz
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: "Güven", desc: "Her müşteri ve usta için güvenli, şeffaf bir platform." },
              { icon: Star, title: "Kalite", desc: "Yalnızca sertifikalı ve müşteriden yüksek puan almış ustalar." },
              { icon: Zap, title: "Hız", desc: "Randevu alma süreci 3 dakikadan kısa, onay anında." },
              { icon: Eye, title: "Şeffaflık", desc: "Fiyatlar, süreler ve usta profilleri önceden açıkça görünür." },
            ].map((val) => (
              <div key={val.title} className="bg-white border border-[#e6e3da] rounded-2xl p-5">
                <div className="w-9 h-9 rounded-xl bg-[#181613] flex items-center justify-center mb-3">
                  <val.icon size={16} className="text-[#fafaf7]" />
                </div>
                <h3 className="font-bold text-[#181613] mb-1">{val.title}</h3>
                <p className="text-sm text-[#5a5750]">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
