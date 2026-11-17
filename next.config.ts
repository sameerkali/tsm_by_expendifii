import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // next/image re-encodes every image; serve AVIF where the browser supports
  // it (smallest files), WebP otherwise.
  images: {
    formats: ["image/avif", "image/webp"],
  },
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
      // Old product names. Both point straight at the final URL (no chains).
      {
        source: "/why-tsm",
        destination: "/why-biltyone",
        permanent: true,
      },
      {
        source: "/why-biltypro",
        destination: "/why-biltyone",
        permanent: true,
      },
      // BiltyOne Desktop's activation screen links to /support. There is no
      // support page yet, so send people to Contact (temporary, so a real
      // /support page can replace it later).
      {
        source: "/support",
        destination: "/contact",
        permanent: false,
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
              // Google Analytics 4 (googletagmanager.com, *.google-analytics.com)
              // and the YouTube product video (youtube-nocookie.com, i.ytimg.com).
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com/ https://news.google.com https://www.googletagmanager.com; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' data: blob: https://res.cloudinary.com https://news.google.com https://www.gstatic.com https://*.google-analytics.com https://*.googletagmanager.com https://i.ytimg.com; " +
              "connect-src 'self' https://va.vercel-scripts.com/ https://api.postalpincode.in https://api.cloudinary.com https://news.google.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; " +
              "frame-src https://news.google.com https://accounts.google.com https://www.youtube-nocookie.com; " +
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
  // No skipTrailingSlashRedirect: it was only needed for the PostHog /ingest
  // proxy, which is gone. Without it, /features/ 308-redirects to /features
  // instead of serving a duplicate URL.
};

export default nextConfig;
