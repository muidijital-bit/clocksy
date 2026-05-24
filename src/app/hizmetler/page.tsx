import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hizmetler | Clocksy",
  description:
    "Clocksy'in sunduğu tüm kuaför hizmetleri: saç kesimi, sakal tasarımı, sıcak havlu tıraşı, yüz bakımı, saç boyama ve daha fazlası.",
};

export default function HizmetlerPage() {
  return (
    <div className="bg-[#fafaf7] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12">
          <p className="text-sm text-[#908a7e] mb-2">Hizmetler</p>
          <h1
            className="text-4xl sm:text-5xl font-medium text-[#181613] mb-4"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Tüm hizmetlerimiz
          </h1>
          <p className="text-[#5a5750] text-lg max-w-xl">
            Klasik kuaförciliği modern tekniklerle harmanlayan ustalarımızdan profesyonel bakım alın.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/hizmetler/${service.slug}`}
              className="group bg-white border border-[#e6e3da] rounded-2xl p-6 hover:border-[#d3cfc2] hover:shadow-md transition-all"
            >
              {service.popular && (
                <span className="inline-block text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mb-3">
                  En Popüler
                </span>
              )}
              <h2 className="font-semibold text-[#181613] text-lg mb-2 group-hover:text-[#2a2520]">
                {service.name}
              </h2>
              <p className="text-sm text-[#5a5750] leading-relaxed mb-5">{service.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-[#181613]">{service.price} ₺</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-[#908a7e]">
                  <Clock size={14} />
                  <span>{service.duration} dk</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#181613] opacity-0 group-hover:opacity-100 transition-opacity">
                Detaylar <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-[#181613] text-[#fafaf7] rounded-2xl p-8 text-center">
          <h2
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Hangi hizmeti istediğinizi bilmiyor musunuz?
          </h2>
          <p className="text-[#908a7e] mb-6">
            Randevu sırasında ustamızla danışabilir, size en uygun hizmeti birlikte belirleyebilirsiniz.
          </p>
          <Link
            href="/randevu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fafaf7] text-[#181613] font-semibold text-sm hover:bg-white transition-colors"
          >
            Randevu Al <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
