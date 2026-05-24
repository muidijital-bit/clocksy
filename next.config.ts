import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/berber/giris", destination: "/kuafor/giris", permanent: true },
      { source: "/berber/panel/:path*", destination: "/kuafor/panel/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
