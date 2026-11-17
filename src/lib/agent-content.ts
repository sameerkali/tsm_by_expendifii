/**
 * Machine-readable (Markdown) renditions of public marketing pages, served via
 * Accept-header content negotiation in middleware.ts (acceptmarkdown.com).
 *
 * Edge-runtime safe: no Node-only APIs, no React imports. Kept independent
 * from the page components — if a page's copy changes materially, update the
 * matching entry here too.
 */

import { INDEXABLE_PAGES, PUBLIC_PAGES } from '@/config/pages';
import { CONTACT, SITE_URL } from '@/config/site';

export { SITE_URL };

interface PageSummary {
  title: string;
  description: string;
}

/**
 * Title/description for every public route, taken from the page registry
 * (src/config/pages.ts), the same source as each page's <title> and meta
 * description, so the Markdown rendition can never drift from the HTML.
 */
const PAGE_SUMMARIES: Record<string, PageSummary> = Object.fromEntries(
  PUBLIC_PAGES.filter((p) => p.path !== '/').map((p) => [p.path, { title: p.title, description: p.description }]),
);

const docLinks = INDEXABLE_PAGES.filter((p) => p.section !== 'legal' && p.path !== '/')
  .map((p) => `- [${p.label}](${SITE_URL}${p.path}): ${p.summary}`)
  .join('\n');

const HOMEPAGE_MARKDOWN = `# BiltyOne: Transport Management Software for India

> BiltyOne is transport management software for Indian road transporters. It creates, prints and stores Goods Receipts / Lorry Receipts (GR/LR, also called bilty), manages customers, and produces freight statements. It replaces paper GR books and Excel sheets. Free for early transporters.

## What BiltyOne does

- **GR / LR (bilty) creation:** booking date, from/to city, consignor and consignee with GSTIN, goods, weight or box count, vehicle and driver, invoice and e-way bill numbers, insurance and remarks.
- **Automatic GR numbers:** every GR gets a unique number that is never reused.
- **Automatic freight:** rate x quantity, priced per KM, box, kg, quintal or ton.
- **3-copy print:** driver, consignor and consignee copies on A5, with your company name, logo, GSTIN, PAN and address.
- **Customers:** save consignors once; their details and default pricing fill in automatically. Pincode lookup fills city and state.
- **Status and payments:** Booked, In Transit, Delivered; payment Pending or Paid; billing as Paid, To Pay or To Be Billed.
- **Customer statements:** a PDF freight bill for any customer and date range, followed by every GR in that range.
- **Excel import and backup:** bring existing records in from Excel/CSV, and download a full Excel backup at any time.
- **Dashboard:** trips, volumes and revenue at a glance.
- **Online and offline:** web app in any browser on a phone or computer; BiltyOne Desktop for Windows works offline after one-time activation.

## How it works (4 steps)

1. **Create your account:** sign up in under 60 seconds, no credit card required.
2. **Add your customers:** enter consignors once (or import old GRs from Excel); BiltyOne remembers them.
3. **Create a GR:** pick the customer, enter shipment details, save. The GR number and freight are calculated for you.
4. **Print, track and bill:** print 3 copies, update status as the load moves, and send customer statements.

## Manual vs. BiltyOne

| | Paper GR book / Excel | BiltyOne |
|---|---|---|
| Creating a GR | Fill 20+ fields by hand, write 3 copies | Under 2 minutes, 3 copies printed together |
| GR numbers | Kept by hand, gaps and duplicates | Automatic, unique, never reused |
| Freight | Calculated by hand | Calculated automatically |
| Storing records | Paper lost to rain, fire, rats | Stored online, with Excel backup |
| Finding an old GR | Search through books | Search by GR number, party, vehicle number or city |
| Customer bills | Typed up separately | Statement PDF for any date range |

## Pricing

Free for early transporters while we onboard the first cohort and gather feedback. Users get fair advance notice before any pricing changes.

## Who it's for

Road transporters, transport companies, fleet owners, transport agents and booking offices in India, from 1 truck to about 50, who use paper GR books or Excel today.

Not a fit for: GPS/live vehicle tracking, freight marketplaces or load boards, international/ocean freight, or full accounting/ERP needs.

## Contact

- Email: ${CONTACT.email}
- Contact page: ${SITE_URL}/contact

## Links

- Sign up: ${SITE_URL}/register
- Free demo (no signup): ${SITE_URL}/live-demo
${docLinks}
- Full site map: ${SITE_URL}/sitemap.xml
- Agent instructions: ${SITE_URL}/llms.txt
`;

function buildSummaryMarkdown(pathname: string, page: PageSummary): string {
  return `# ${page.title}

> ${page.description}

Full page (HTML): ${SITE_URL}${pathname}

## More from BiltyOne

- Home: ${SITE_URL}/
- Site map: ${SITE_URL}/sitemap.xml
- Agent instructions: ${SITE_URL}/llms.txt
`;
}

export const NOT_FOUND_MARKDOWN = `# 404: Page not found

> This path does not exist on BiltyOne. It was never assigned, or it has been removed.

## Find what you're looking for

- Site map (all valid URLs): ${SITE_URL}/sitemap.xml
- Agent instructions: ${SITE_URL}/llms.txt
- Home: ${SITE_URL}/
`;

/**
 * Returns the Markdown rendition for a given public pathname, or `null` if
 * no Markdown variant exists for that path (caller should fall back to the
 * normal HTML response, or to NOT_FOUND_MARKDOWN for unknown paths).
 */
export function getMarkdownForPath(pathname: string): string | null {
  if (pathname === '/') return HOMEPAGE_MARKDOWN;
  const summary = PAGE_SUMMARIES[pathname];
  if (summary) return buildSummaryMarkdown(pathname, summary);
  return null;
}

/**
 * All public pathnames that have a Markdown rendition — these responses vary
 * on Accept and must advertise it via the Vary header even when returning
 * the normal HTML variant, so caches don't serve the wrong representation.
 */
export const MARKDOWN_NEGOTIATED_PATHS = new Set<string>(['/', ...Object.keys(PAGE_SUMMARIES)]);

interface MediaRange {
  type: string;
  q: number;
}

function parseAccept(acceptHeader: string): MediaRange[] {
  return acceptHeader
    .split(',')
    .map((part) => {
      const [type, ...params] = part.trim().split(';');
      const qParam = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      const q = qParam ? parseFloat(qParam.slice(2)) : 1;
      return { type: (type ?? '').trim().toLowerCase(), q: Number.isFinite(q) ? q : 1 };
    })
    .filter((range) => range.type.length > 0);
}

/**
 * True when the request's Accept header prefers `text/markdown` at least as
 * strongly as it prefers `text/html` (or a wildcard). Mirrors the
 * negotiation acceptmarkdown.com's compliance checker performs.
 */
export function prefersMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false;
  const ranges = parseAccept(acceptHeader);
  const markdown = ranges.find((r) => r.type === 'text/markdown');
  if (!markdown || markdown.q <= 0) return false;
  const competing = ranges.filter((r) => r.type === 'text/html' || r.type === '*/*');
  if (competing.length === 0) return true;
  return markdown.q >= Math.max(...competing.map((r) => r.q));
}
