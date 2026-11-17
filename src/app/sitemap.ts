import type { MetadataRoute } from 'next';
import { INDEXABLE_PAGES } from '@/config/pages';
import { absoluteUrl } from '@/config/site';

/**
 * Built from the page registry (src/config/pages.ts). lastModified is each
 * page's real content date, not the build time: a lastmod that changes on
 * every deploy tells Google nothing, so it learns to ignore it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: new Date(`${page.lastModified}T00:00:00.000Z`),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
