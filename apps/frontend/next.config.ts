import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize video and media files
  async headers() {
    return [
      {
        source: '/drone-video.:ext',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'video/webm',
          },
        ],
      },
      {
        source: '/drone-video.mp4',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
