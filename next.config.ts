import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Keep build-time page generation within the project's process budget.
  experimental: { cpus: 1 },
  images: {
    localPatterns: [
      { pathname: "/**", search: "" },
      { pathname: "/images/comunicacao-visual/**", search: "?v=20261108" },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "belis.agency",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
};

export default nextConfig;
