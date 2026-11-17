import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/lib/seo';

// /live-demo only starts guest mode and redirects into the app, so there is
// nothing for search engines to index (noindex, and left out of the sitemap).
// llms.txt still points agents here.
export const metadata: Metadata = buildPageMetadata('/live-demo');

export default function LiveDemoLayout({ children }: { children: ReactNode }) {
  return children;
}
