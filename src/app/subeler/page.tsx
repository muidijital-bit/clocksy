import type { Metadata } from "next";
import { Star, Phone, Clock, MapPin } from "lucide-react";
import { branches } from "@/lib/data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Şubeler | Clocksy",
  description:
    "Kütahya'daki Clocksy şubeleri: Merkez, Germiyan ve Yıldırım. Adres, telefon ve çalışma saatlerini öğrenin.",
};

export default function SubelerPage() {
  return (
    <div className="bg-[#fafaf7] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10">
          <p className="text-sm text-[#908a7e] mb-2">Şubeler</p>
          <h1
            className="text-4xl sm:text-5xl font-medium text-[#181613] mb-4"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Şubelerimiz
          </h1>
          <p className="text-[#5a5750] text-lg">
            Kütahya&apos;nın farklı ilçelerinde 3 şubemizle hizmetinizdeyiz.
          </p>
        </div>

        {/* City filter */}
        <div className="flex gap-2 mb-8">
          <button className="px-4 py-2 rounded-full text-sm font-medium bg-[#181613] text-[#fafaf7]">
            Kütahya
          </button>
          <button className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-[#e6e3da] text-[#5a5750] hover:border-[#d3cfc2] transition-colors">
            Tüm Şehirler
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white border border-[#e6e3da] rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2
                    className="text-xl font-bold text-[#181613] mb-0.5"
                    style={{ fontFamily: "var(--font-fraunces), serif" }}
                  >
                    {branch.district}
                  </h2>
                  <span className="text-sm text-[#908a7e]">{branch.city}</span>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium text-amber-700">{branch.rating}</span>
                  <span className="text-xs text-amber-600">({branch.reviews})</span>
                </div>
              </div>

              <div className="space-y-2.5 mb-5">
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-[#908a7e] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#5a5750]">{branch.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-[#908a7e] flex-shrink-0" />
                  <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="text-sm text-[#5a5750] hover:text-[#181613] transition-colors">
                    {branch.phone}
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock size={15} className="text-[#908a7e] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#5a5750]">{branch.hours}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[#908a7e]">{branch.staffCount} usta çalışıyor</span>
                <Link
                  href={`/randevu`}
                  className="px-4 py-2 rounded-lg bg-[#181613] text-[#fafaf7] text-sm font-medium hover:bg-[#2a2520] transition-colors"
                >
                  Randevu Al
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100 border border-[#e6e3da] rounded-2xl overflow-hidden h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={32} className="text-[#908a7e] mx-auto mb-3" />
            <p className="font-medium text-[#5a5750]">Kütahya Haritası</p>
            <p className="text-sm text-[#908a7e] mt-1">3 şube · Kütahya, Türkiye</p>
          </div>
        </div>
      </div>
    </div>
  );
}
