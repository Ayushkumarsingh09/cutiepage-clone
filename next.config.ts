import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.cutiepage.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-9a93db46c01f4a47846cf3de6e3f148e.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
