import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "tsm.expendifii.com",
          },
        ],
        destination: "https://biltyone.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/auth.md",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com/; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' data: blob: https://res.cloudinary.com; " +
              "connect-src 'self' https://va.vercel-scripts.com/ https://api.postalpincode.in https://api.cloudinary.com; " +
              "font-src 'self'; " +
              "frame-ancestors 'none'; " +
              "base-uri 'self'; " +
              "form-action 'self';",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
