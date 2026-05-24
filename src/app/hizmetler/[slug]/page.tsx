import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowRight, ArrowLeft, Star } from "lucide-react";
import { services, staff } from "@/lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} | Clocksy`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const relatedServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Clocksy",
    },
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "TRY",
    },
  };

  return (
    <div className="bg-[#fafaf7] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/hizmetler"
          className="inline-flex items-center gap-1.5 text-sm text-[#908a7e] hover:text-[#181613] mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Tüm hizmetler
        </Link>

        {/* Hero */}
        <div className="bg-white border border-[#e6e3da] rounded-2xl p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              {service.popular && (
                <span className="inline-block text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mb-3">
                  En Popüler
                </span>
              )}
              <h1
                className="text-3xl sm:text-4xl font-medium text-[#181613] mb-3"
                style={{ fontFamily: "var(--font-fraunces), serif" }}
              >
                {service.name}
              </h1>
              <p className="text-[#5a5750] text-lg">{service.description}</p>
            </div>
            <div className="sm:text-right flex-shrink-0">
              <p className="text-3xl font-bold text-[#181613]">{service.price} ₺</p>
              <p className="flex items-center gap-1 text-sm text-[#908a7e] sm:justify-end mt-1">
                <Clock size={14} />
                {service.duration} dakika
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href={`/randevu?hizmet=${service.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#181613] text-[#fafaf7] font-semibold text-sm hover:bg-[#2a2520] transition-colors"
            >
              Randevu Al <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Long description */}
        <div className="bg-white border border-[#e6e3da] rounded-2xl p-8 mb-6">
          <h2
            className="text-xl font-bold text-[#181613] mb-4"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Hizmet Detayları
          </h2>
          <div className="space-y-4">
            {(service.longDescription || service.description).split("\n\n").filter(Boolean).map((para, i) => (
              <p key={i} className="text-[#5a5750] leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Staff */}
        <div className="bg-white border border-[#e6e3da] rounded-2xl p-8 mb-6">
          <h2
            className="text-xl font-bold text-[#181613] mb-5"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Bu hizmeti sunan ustalarımız
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {staff.map((member) => (
              <div key={member.id} className="border border-[#e6e3da] rounded-xl p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-[#ebe9e2] flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-[#5a5750] text-sm">{member.initials}</span>
                </div>
                <p className="font-semibold text-[#181613] text-sm">{member.name}</p>
                <p className="text-xs text-[#908a7e] mb-2">{member.title}</p>
                <div className="flex items-center justify-center gap-1 text-xs text-[#5a5750]">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  {member.rating} ({member.reviews})
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related services */}
        <div>
          <h2
            className="text-xl font-bold text-[#181613] mb-5"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            İlgili hizmetler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/hizmetler/${s.slug}`}
                className="bg-white border border-[#e6e3da] rounded-xl p-5 hover:border-[#d3cfc2] hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-[#181613] mb-1 text-sm">{s.name}</h3>
                <p className="text-xs text-[#908a7e]">{s.price} ₺ · {s.duration} dk</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
