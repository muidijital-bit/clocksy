import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "İletişim | Clocksy",
  description:
    "Clocksy ile iletişime geçin. Kütahya şubelerimizin adres ve telefon bilgileri, e-posta ve iletişim formu.",
};

export default function IletisimPage() {
  return (
    <div className="bg-[#fafaf7] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12">
          <p className="text-sm text-[#908a7e] mb-2">İletişim</p>
          <h1
            className="text-4xl sm:text-5xl font-medium text-[#181613] mb-4"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Bize ulaşın
          </h1>
          <p className="text-[#5a5750] text-lg">
            Sorularınız için buradayız. En geç 24 saat içinde dönüş yaparız.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {[
              {
                icon: MapPin,
                title: "Adres",
                content: "Cumhuriyet Caddesi No:41\nKütahya Merkez, 43000",
              },
              {
                icon: Phone,
                title: "Telefon",
                content: "0274 123 45 67",
                href: "tel:02741234567",
              },
              {
                icon: Mail,
                title: "E-posta",
                content: "merhaba@clocksy.com.tr",
                href: "mailto:merhaba@clocksy.com.tr",
              },
              {
                icon: Clock,
                title: "Çalışma Saatleri",
                content: "Pazartesi–Cuma: 09:00–21:00\nCumartesi: 10:00–22:00",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-[#e6e3da] rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#181613] flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-[#fafaf7]" />
                </div>
                <div>
                  <p className="font-semibold text-[#181613] mb-1">{item.title}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-[#5a5750] hover:text-[#181613] transition-colors"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-sm text-[#5a5750] whitespace-pre-line">{item.content}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="bg-gradient-to-br from-amber-50 to-stone-100 border border-[#e6e3da] rounded-2xl h-48 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={28} className="text-[#908a7e] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#5a5750]">Kütahya Merkez</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white border border-[#e6e3da] rounded-2xl p-6 sm:p-8">
            <h2
              className="text-xl font-bold text-[#181613] mb-6"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              Mesaj Gönderin
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
