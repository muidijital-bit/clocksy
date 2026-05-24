import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      { source: "/berber/giris", destination: "/kuafor/giris", permanent: true },
      { source: "/berber/panel/:path*", destination: "/kuafor/panel/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
