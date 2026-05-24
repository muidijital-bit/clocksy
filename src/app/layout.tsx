import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Clocksy — Kütahya'nın kuaför Randevu Platformu",
    template: "%s | Clocksy",
  },
  description:
    "Kütahya'nın en iyi kuaförlerinden online randevu alın. Profesyonel saç kesimi, sakal tasarımı ve daha fazlası.",
  metadataBase: new URL("https://clocksy.com.tr"),
  openGraph: {
    siteName: "Clocksy",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Clocksy",
  description:
    "Kütahya'nın kuaför randevu platformu. Online randevu alın, usta seçin, zamanınızı verimli kullanın.",
  url: "https://clocksy.com.tr",
  telephone: "0274-123-45-67",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cumhuriyet Caddesi No:41",
    addressLocality: "Kütahya",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "39.4128",
    longitude: "29.9831",
  },
  openingHours: ["Mo-Fr 09:00-21:00", "Sa 10:00-22:00"],
  priceRange: "₺₺",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${fraunces.variable} ${inter.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
