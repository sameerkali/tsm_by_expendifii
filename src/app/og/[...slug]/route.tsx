import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { INDEXABLE_PAGES, getPage, type PageSection } from '@/config/pages';
import { SITE_TAGLINE } from '@/config/site';

/**
 * Per-page social preview cards (1200x630), e.g. /og/features.png and
 * /og/guides/what-is-bilty.png. URLs come from ogImageFor() in lib/seo.ts.
 * Every card is prerendered at build time; unknown paths 404.
 * Fonts: Plus Jakarta Sans (SIL OFL 1.1, see ./fonts/OFL.txt), the site font.
 */

export const dynamicParams = false;

const SECTION_LABEL: Record<PageSection, string> = {
  home: 'BiltyOne',
  product: 'Product',
  solution: 'Transport software',
  resource: 'Resource',
  guide: 'Guide',
  company: 'Company',
  legal: 'Legal',
  app: 'BiltyOne',
};

/** "/guides/what-is-bilty" -> ["guides", "what-is-bilty.png"] */
function slugFor(pagePath: string): string[] {
  const parts = pagePath.split('/').filter(Boolean);
  parts[parts.length - 1] += '.png';
  return parts;
}

export function generateStaticParams() {
  return INDEXABLE_PAGES.filter((p) => p.path !== '/').map((p) => ({ slug: slugFor(p.path) }));
}

const FONT_DIR = path.join(process.cwd(), 'src/app/og/fonts');
const MARK = `data:image/svg+xml;base64,${Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none"><path d="M32 6 L56 18 L32 30 L8 18 Z" fill="#ffffff" opacity="0.35"/><path d="M8 18 L32 30 L32 58 L8 46 Z" fill="#ffffff"/><path d="M56 18 L56 46 L32 58 L32 30 Z" fill="none" stroke="#ffffff" stroke-width="5" stroke-linejoin="miter"/></svg>',
).toString('base64')}`;

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const pagePath = `/${slug.join('/').replace(/\.png$/, '')}`;
  const page = getPage(pagePath);
  const title = page.title.replace(/\s*\|\s*BiltyOne$/, '');

  const [extraBold, medium] = await Promise.all([
    readFile(path.join(FONT_DIR, 'PlusJakartaSans-latin-800.woff')),
    readFile(path.join(FONT_DIR, 'PlusJakartaSans-latin-500.woff')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          backgroundColor: '#0F172A',
          backgroundImage:
            'linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          fontFamily: 'Plus Jakarta Sans',
          color: '#FFFFFF',
          borderLeft: '16px solid #0369A1',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARK} width={52} height={52} alt="" />
          <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}>BiltyOne</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span style={{ fontSize: 24, fontWeight: 500, color: '#7DD3FC', textTransform: 'uppercase', letterSpacing: 3 }}>
            {SECTION_LABEL[page.section]}
          </span>
          <span
            style={{
              fontSize: title.length > 48 ? 60 : 68,
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 24, fontWeight: 500, color: '#94A3B8' }}>
          <span>{SITE_TAGLINE}</span>
          <span style={{ color: '#E2E8F0' }}>biltyone.com</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Plus Jakarta Sans', data: extraBold, weight: 800, style: 'normal' },
        { name: 'Plus Jakarta Sans', data: medium, weight: 500, style: 'normal' },
      ],
    },
  );
}
