import type { NextConfig } from "next";

// Static Export Configuration
// NOTE: This will break SSR pages (blog, new-arrival) and admin features
// Use only if you convert those pages to client-side rendering

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable features that don't work with static export
  trailingSlash: true,
};

export default nextConfig;

