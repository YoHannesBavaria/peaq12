import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.peaq.ch",
      },
      {
        protocol: "https",
        hostname: "peaq.ch",
      },
    ],
  },
};

export default nextConfig;
