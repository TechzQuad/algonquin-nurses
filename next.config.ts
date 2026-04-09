import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "algonquinnursesstl.com",
      },
    ],
  },
};

export default nextConfig;
