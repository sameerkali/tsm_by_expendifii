/**
 * Machine-readable (Markdown) renditions of public marketing pages, served via
 * Accept-header content negotiation in middleware.ts (acceptmarkdown.com).
 *
 * Edge-runtime safe: no Node-only APIs, no React imports. Kept independent
 * from the page components — if a page's copy changes materially, update the
 * matching entry here too.
 */

export const SITE_URL = 'https://biltyone.com';

interface PageSummary {
  title: string;
  description: string;
}

/**
 * Title/description for every public marketing route, mirrored from each
 * page's `metadata` export. Used to build the plain-text-summary Markdown
 * fallback for pages that don't have a hand-written rich variant below.
 */
const PAGE_SUMMARIES: Record<string, PageSummary> = {
  '/why-tsm': {
    title: 'Why BiltyOne? Built for Indian Transporters',
    description:
      'See why transporters across NCR choose BiltyOne, a fast, modern GR management system built for how Indian transport businesses actually work.',
  },
  '/live-demo': {
    title: 'Live Demo | BiltyOne',
    description:
      'Try BiltyOne as a guest, no signup required. Explore GR creation, customer management, and the dashboard with sample data.',
  },
  '/about': {
    title: 'About | BiltyOne',
    description:
      'BiltyOne was built by Sameer Faridi, a software engineer whose family are transporters. Learn the real story behind why we built this.',
  },
  '/contact': {
    title: 'Contact | BiltyOne',
    description:
      "Get in touch with the BiltyOne team for demos, partnerships, or general inquiries. We respond within one business day.",
  },
  '/features': {
    title: 'BiltyOne Features | Modern Transport Management System',
    description:
      'Explore the powerful features of BiltyOne: fast digital GR creation, three-copy print layouts, permanent search archive, and analytics built for Indian transporters.',
  },
  '/product': {
    title: 'Product Overview | BiltyOne',
    description:
      'Take a detailed tour of BiltyOne: view the dashboard interface, live fleet status tracker, active job logs, and smart invoice management built for Indian logistics.',
  },
  '/transport-management-system': {
    title: 'What is a Transport Management System (TMS)? | BiltyOne',
    description:
      'Learn what a Transport Management System (TMS) is, how it functions in logistics, and how BiltyOne provides a simplified digital GR creator for Indian transporters.',
  },
  '/logistics-glossary': {
    title: 'Indian Logistics & Transport Glossary | BiltyOne',
    description:
      'A quick reference guide for Indian transport operators: definitions and explanations for GR, LR, POD, E-Way Bill, Consignor, Freight, Fleet, and TMS.',
  },
  '/digital-transport-management': {
    title: 'Digital Transport Management vs Paper & Excel | BiltyOne',
    description:
      'Compare traditional paper GR books and Excel sheets against digital transport management. Learn how BiltyOne automates lorry receipts securely.',
  },
  '/transport-business-automation': {
    title: 'Transport Business Automation: Save Hours Daily | BiltyOne',
    description:
      'Discover how transport business automation can eliminate manual errors, replace redundant data entry work, and scale fleet operations efficiently with BiltyOne.',
  },
  '/gr-management': {
    title: 'Goods Receipt (GR) Management & 3-Copy Print | BiltyOne',
    description:
      'Manage your Goods Receipt (GR) and Lorry Receipt (LR) workflows digitally. BiltyOne auto-generates 3 print copies (Consigner, Consignee, Driver) in under 2 minutes.',
  },
  '/lorry-receipt-software': {
    title: 'Lorry Receipt (LR) Software for Indian Transporters | BiltyOne',
    description:
      'Generate clean, professional, and compliant Lorry Receipts (LR/GR) digitally. Free software for Indian transport owners to customise layouts and print 3 copies.',
  },
  '/security': {
    title: 'Security | BiltyOne',
    description:
      'Learn how BiltyOne keeps your GR records and transport data safe with encryption, access controls, and responsible data practices.',
  },
  '/developers': {
    title: 'Developer Resources | BiltyOne',
    description:
      'Developer and integration resources for BiltyOne: agent-readable docs (llms.txt), sitemap, and the current status of API and webhook access.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | BiltyOne',
    description: 'How BiltyOne collects, uses, and protects your personal and operational data.',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | BiltyOne',
    description: 'The terms governing your use of BiltyOne.',
  },
  '/user-agreement': {
    title: 'User Agreement | BiltyOne',
    description:
      'The BiltyOne User Agreement governing roles, responsibilities, and acceptable conduct on the platform.',
  },
  '/cookie-policy': {
    title: 'Cookie Policy | BiltyOne',
    description: 'How BiltyOne uses cookies for session management and analytics on our platform.',
  },
};

const HOMEPAGE_MARKDOWN = `# BiltyOne: Transport Management System

> Stop managing transport manually. BiltyOne is the modern transport management system built for Indian transporters: create, print, and manage lorry receipts (GR/LR) in minutes. No paper, no spreadsheets.

## What BiltyOne does

- **GR Creation in Seconds:** create a complete lorry receipt with all required fields in under a minute.
- **Print-Ready GR (3 Copies):** generate the Driver, Consigner, and Consignee copies in one click.
- **Customisable GR Layout:** show more or fewer fields; every transporter's format is different.
- **Batch GR Management:** update, track, and organise multiple GRs at once.
- **Customer Management:** maintain a customer list with auto-fill for consigner/consignee details.
- **Analytics Dashboard:** visibility into trips, volumes, and operations.

## How it works (4 steps)

1. **Create your account:** sign up in under 60 seconds, no credit card required.
2. **Add your customers:** enter consigners and consignees once; BiltyOne remembers them.
3. **Create a GR in minutes:** select the customer, fill in shipment details, submit. All three copies generate instantly.
4. **Print, track & analyse:** print immediately or find any GR later by name, date, or number.

## Manual vs. BiltyOne

| | Manual / Excel | BiltyOne |
|---|---|---|
| Creating a GR | Fill 20+ fields by hand, make 3 paper copies | Done in under a minute, 3 copies auto-generated |
| Storing records | Paper files lost to rats, water, or fire | Permanent digital records, accessible anywhere |
| Finding old GRs | Search through stacks of paper | Search by name, date, or GR number instantly |
| GR layout control | Fixed printed format, no flexibility | Customise which fields appear on print |

## Pricing

BiltyOne is currently free while we onboard the first cohort of transporters and gather feedback. Existing users get fair advance notice before any pricing changes.

## Who it's for

Transporters, fleet owners, and logistics dispatchers in India managing 1 to 50+ trucks who currently rely on paper GR books or Excel sheets.

## Links

- Sign up: ${SITE_URL}/register
- Free demo (no signup): ${SITE_URL}/live-demo
- Why BiltyOne: ${SITE_URL}/why-tsm
- Features: ${SITE_URL}/features
- Product tour: ${SITE_URL}/product
- Contact: ${SITE_URL}/contact
- Developer resources: ${SITE_URL}/developers
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
