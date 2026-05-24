import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { faqs } from "@/lib/data";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular | Clocksy",
  description:
    "Clocksy hakkında merak edilen tüm sorular ve cevaplar: randevu iptali, ödeme, gecikme politikası ve daha fazlası.",
};

export default function SSSPage() {
  return (
    <div className="bg-[#fafaf7] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-sm text-[#908a7e] mb-2">SSS</p>
          <h1
            className="text-4xl sm:text-5xl font-medium text-[#181613] mb-4"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Sık sorulan sorular
          </h1>
          <p className="text-[#5a5750]">
            Aklınızdaki soruyu burada bulamazsanız bize yazın.
          </p>
        </div>

        <FaqAccordion faqs={faqs} />

        <div className="mt-12 bg-white border border-[#e6e3da] rounded-2xl p-8 text-center">
          <h2
            className="text-xl font-bold text-[#181613] mb-2"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Başka sorularınız mı var?
          </h2>
          <p className="text-[#5a5750] mb-5 text-sm">
            İletişim sayfamızdan bize mesaj gönderin, size yardımcı olalım.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#e6e3da] text-[#5a5750] text-sm font-medium hover:border-[#d3cfc2] transition-colors"
            >
              İletişim Formu <ArrowRight size={14} />
            </Link>
            <Link
              href="/randevu"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#181613] text-[#fafaf7] text-sm font-medium hover:bg-[#2a2520] transition-colors"
            >
              Randevu Al <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
