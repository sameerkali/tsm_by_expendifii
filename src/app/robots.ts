import type { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://tsm.expendifii.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/contact',
          '/why-tsm',
          '/live-demo',
          '/security',
          '/privacy-policy',
          '/terms-and-conditions',
          '/user-agreement',
          '/login',
          '/register',
          '/activate',
          '/forgot-password',
        ],
        disallow: [
          '/api/',
          '/dashboard',
          '/gr',
          '/gr/',
          '/customers',
          '/customers/',
          '/settings',
          '/printing',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
