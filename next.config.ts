import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      // The case study was renamed from "Voiced" to "Leti"; keep old links working.
      {
        source: "/case-studies/voiced",
        destination: "/case-studies/leti",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
