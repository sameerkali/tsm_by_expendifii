import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tsmbackend-production-f675.up.railway.app';
    return [
      {
        // All /api/proxy/* requests are forwarded to the Railway backend.
        // This makes auth cookies same-origin (localhost:3000) so they
        // bypass cross-site SameSite cookie restrictions.
        source: '/api/proxy/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

