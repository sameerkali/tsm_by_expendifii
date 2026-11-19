import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

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
      // Small-business page moved to the keyword URL on 18 Nov 2026.
      {
        source: "/transport-management-system-for-small-business",
        destination: "/transport-software-small-business",
        permanent: true,
      },
      // The licence key request page is gone: the download email now carries
      // a trial key. Older emails still link here.
      {
        source: "/desktop/licence-key",
        destination: "/desktop",
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
              // 'unsafe-eval' only in development: `next dev` needs eval for
              // fast refresh and error overlays; production bundles don't.
              // 'unsafe-inline' stays for Next's inline scripts until the CSP
              // moves to per-request nonces, which would make every page
              // dynamically rendered (no static/ISR pages).
              `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com/ https://news.google.com https://www.googletagmanager.com; ` +
              "object-src 'none'; " +
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
