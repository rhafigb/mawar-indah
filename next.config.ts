import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Domain Unsplash telah dihapus. Hanya menyisakan domain Supabase Anda.
        hostname: 'kacxxmhzprejukaiifuu.supabase.co', 
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;