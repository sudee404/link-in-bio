import type { NextConfig } from "next";

const nextConfig = {
  images: {
    domains: ['yourcdndomain.com'], // Add your image domains
  },
  experimental: {
    optimizeFonts: true,
  }
};

export default nextConfig;