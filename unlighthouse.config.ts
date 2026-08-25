import { defineUnlighthouseConfig } from 'unlighthouse/config';

export default defineUnlighthouseConfig({
  site: 'https://biltypro.com',
  scanner: {
    // Auth-gated app shell (see src/middleware.ts PROTECTED_PATHS / AUTH_PATHS)
    // — these redirect an unauthenticated crawler to /login, so scanning
    // them just produces duplicate /login results. Only the public
    // marketing site (already listed in sitemap.xml) is worth measuring.
    exclude: [
      '/dashboard/**',
      '/gr/**',
      '/customers/**',
      '/printing/**',
      '/settings/**',
      '/demo/**',
      '/login',
      '/register',
      '/forgot-password',
      '/api/**',
    ],
  },
  ci: {
    budget: {
      performance: 70,
      accessibility: 90,
      'best-practices': 80,
      seo: 90,
    },
  },
});
