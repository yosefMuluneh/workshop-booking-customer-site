import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //by pass type checking for the next.config.js file
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
