import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `npm run build` writes a plain static site to /out — upload that folder anywhere.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
