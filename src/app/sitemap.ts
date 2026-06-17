import type { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://tsm.expendifii.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }> = [
    { path: '/', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/why-tsm', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/live-demo', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/security', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms-and-conditions', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/user-agreement', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/cookie-policy', changeFrequency: 'yearly', priority: 0.3 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
