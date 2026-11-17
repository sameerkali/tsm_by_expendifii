/**
 * Registry of every public route: SEO title, meta description, dates and
 * sitemap settings. Read by:
 *   - each page's `metadata` export (via buildPageMetadata in lib/seo.ts)
 *   - app/sitemap.ts (URLs, lastmod, priority)
 *   - lib/agent-content.ts (Markdown renditions for AI agents)
 *   - app/llms.txt/route.ts (docs list)
 *
 * Edge-runtime safe: plain data only (middleware imports agent-content).
 *
 * Keyword map (one primary search intent per URL, so pages don't compete):
 *   /                                              transport management software (+ in India, transport software)
 *   /lorry-receipt-software                        bilty software, LR software, lorry receipt software
 *                                                  (the document: fields, format, freight, printing)
 *   /gr-management                                 GR software, GR creation software
 *                                                  (the GR's life: create, print, status, payment, statements)
 *   /transport-management-system                   transport management system (TMS): EDUCATIONAL guide,
 *                                                  not a product landing page (no SoftwareApplication schema)
 *   /transport-company-software                    transport company software, transport business software
 *                                                  (the transport office: people, billing types, month-end)
 *   /transport-management-system-for-small-business small transport business software (+ TMS for small business)
 *   /online-transport-management-software          online transport software (+ online TMS, transport app)
 *   /transport-erp-software                        transport ERP software
 *   /pricing                                       BiltyOne pricing, transport software price/cost
 *
 * Bilty, LR and GR are the same document, so /lorry-receipt-software and
 * /gr-management overlap by nature. Keep them apart by angle (document vs
 * life cycle), and link between them with their own keywords as anchor text.
 *
 * `title` is the complete <title> (rendered with title.absolute), so keep it
 * at 60 characters or fewer. Keep `description` at 160 characters or fewer.
 * Bump `lastModified` (YYYY-MM-DD) whenever a page's content changes
 * materially: it feeds the sitemap and Article dateModified.
 */

export type PageSection = 'home' | 'product' | 'solution' | 'resource' | 'guide' | 'company' | 'legal' | 'app';

export interface PublicPage {
  path: string;
  title: string;
  description: string;
  /** Short label for nav, breadcrumbs and llms.txt. */
  label: string;
  /** One-line summary used in llms.txt. */
  summary: string;
  section: PageSection;
  datePublished: string;
  lastModified: string;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
  priority: number;
  /** Excluded from sitemap and marked noindex. */
  noindex?: boolean;
}

export const PUBLIC_PAGES: PublicPage[] = [
  {
    path: '/',
    title: 'Transport Management Software for India | BiltyOne',
    description:
      'Free transport management software for Indian transporters. Create GR/LR (bilty) in under 2 minutes, print 3 copies, bill customers and work online or offline.',
    label: 'Home',
    summary: 'Product overview: transport management software for Indian road transporters.',
    section: 'home',
    datePublished: '2026-04-11',
    lastModified: '2026-11-17',
    changeFrequency: 'weekly',
    priority: 1,
  },

  // ── Keyword landing pages ────────────────────────────────────────────
  {
    path: '/transport-management-system',
    title: 'Transport Management System (TMS): A Guide for India',
    description:
      'What a transport management system (TMS) is, how it works for Indian road transporters, which features matter and how to choose one. Checklist and FAQ inside.',
    label: 'TMS Guide',
    summary: 'Complete guide to transport management systems (TMS) for Indian road transport.',
    // Educational guide, not a product page: 'resource' gives it og:type
    // article and keeps it out of the product/solution groupings.
    section: 'resource',
    datePublished: '2026-07-03',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    path: '/online-transport-management-software',
    title: 'Online Transport Software for Phone & PC | BiltyOne',
    description:
      'Online transport software for Indian transporters: create, print and track GR/LR in any browser on phone or PC, plus an offline Windows app. Free to start.',
    label: 'Online Transport Software',
    summary: 'Online transport software that runs in any browser, plus the offline Windows application.',
    section: 'solution',
    datePublished: '2026-11-17',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    path: '/transport-company-software',
    title: 'Transport Company & Business Software | BiltyOne',
    description:
      'Software for the transport company office: booking desk, GR printing, Paid, To Pay and To Be Billed freight, and month-end customer bills in one system.',
    label: 'Transport Company Software',
    summary: 'Software for transport companies and transport businesses, organised by daily office workflow.',
    section: 'solution',
    datePublished: '2026-11-17',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    path: '/transport-management-system-for-small-business',
    title: 'Small Transport Business Software (1-20 Trucks) | BiltyOne',
    description:
      'Simple, free software for small transport businesses with 1 to 20 trucks: create and print GRs, keep customer records and bill freight without extra staff.',
    label: 'Small Transport Business Software',
    summary: 'Small transport business software for fleets of 1 to 20 trucks.',
    section: 'solution',
    datePublished: '2026-11-17',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    path: '/transport-erp-software',
    title: 'Transport ERP Software vs TMS for Indian Transporters',
    description:
      'Transport ERP software covers accounts, fleet, HR and more. See what it includes, when a transporter needs one, and when a focused TMS like BiltyOne is enough.',
    label: 'Transport ERP Software',
    summary: 'What transport ERP software includes, and when a focused TMS is the better fit.',
    section: 'solution',
    datePublished: '2026-11-17',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.8,
  },

  // ── Product ──────────────────────────────────────────────────────────
  {
    path: '/features',
    title: 'Features of BiltyOne Transport Management Software',
    description:
      'Every BiltyOne feature: GR/LR creation, automatic GR numbers and freight, 3-copy print, customer statements, Excel import and backup, dashboard and offline app.',
    label: 'Features',
    summary: 'Full feature list.',
    section: 'product',
    datePublished: '2026-07-03',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    path: '/product',
    title: 'Product Tour: BiltyOne Transport Software Dashboard',
    description:
      'Tour BiltyOne: the GR list, customer directory, freight statements, Excel import and the analytics dashboard, built for Indian road transporters.',
    label: 'Product Tour',
    summary: 'Screen-by-screen tour of the web app.',
    section: 'product',
    datePublished: '2026-07-03',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/why-biltyone',
    title: 'Why BiltyOne? Transport Software Built for India',
    description:
      'Why Indian transporters switch from paper GR books, Excel and older transport software to BiltyOne: faster GRs, clean records, free to start, set up in a day.',
    label: 'Why BiltyOne',
    summary: 'Why transporters choose BiltyOne over paper, Excel or older transport software.',
    section: 'product',
    datePublished: '2026-05-30',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/desktop',
    title: 'Desktop App for Windows: Offline GR Software | BiltyOne',
    description:
      'Download BiltyOne Desktop for Windows. Create, print and search GRs without internet. Free download and free licence key for Indian transporters.',
    label: 'Desktop App',
    summary: 'BiltyOne Desktop for Windows 10/11; works offline after a one-time activation.',
    section: 'product',
    datePublished: '2026-11-17',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/lorry-receipt-software',
    title: 'Bilty Software, LR & Lorry Receipt Software | BiltyOne',
    description:
      'Bilty and LR software for Indian transporters: create lorry receipts online in under 2 minutes, with automatic numbers and freight and 3-copy print. Free.',
    label: 'Bilty & LR Software',
    summary: 'Bilty software and LR (lorry receipt) software: create and print bilty/LR for Indian transporters.',
    section: 'product',
    datePublished: '2026-07-03',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/gr-management',
    title: 'GR Creation Software & GR Management | BiltyOne',
    description:
      'GR creation software for Indian transporters: create a goods receipt (GR) in under 2 minutes, print 3 copies, track status and payment, and bill customers.',
    label: 'GR Software',
    summary: 'GR creation software and the goods receipt life cycle: create, print, status, payment and statements.',
    section: 'product',
    datePublished: '2026-07-03',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/pricing',
    title: 'BiltyOne Pricing: Free Transport Software for India',
    description:
      'BiltyOne is free for early transporters: every feature, the web app and the Windows desktop app. No credit card. Compare BiltyOne with paper, Excel and ERP.',
    label: 'Pricing',
    summary: 'Pricing (free for early transporters), web vs desktop app, and BiltyOne vs paper, Excel and transport ERP.',
    section: 'product',
    datePublished: '2026-11-17',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.8,
  },

  // ── Resources & guides ───────────────────────────────────────────────
  {
    path: '/guides',
    title: 'Guides for Indian Transporters | BiltyOne',
    description:
      'Practical guides for Indian road transporters: what a bilty is, GR vs LR vs e-way bill, choosing transport management software and leaving the paper GR book.',
    label: 'Guides',
    summary: 'Index of practical guides for Indian transporters.',
    section: 'resource',
    datePublished: '2026-11-17',
    lastModified: '2026-11-17',
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    path: '/guides/what-is-bilty',
    title: 'What is a Bilty? GR and LR Meaning, Format and Fields',
    description:
      'Bilty meaning in transport: what a bilty, GR or LR is, who issues it, the three copies, every field it should contain, and how to make one digitally.',
    label: 'What is a Bilty?',
    summary: 'Bilty / GR / LR meaning, copies and fields.',
    section: 'guide',
    datePublished: '2026-11-17',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/guides/gr-vs-lr-vs-eway-bill',
    title: 'GR vs LR vs E-Way Bill: Differences Explained | BiltyOne',
    description:
      'GR, LR and e-way bill compared: who issues each, what each proves, when an e-way bill is needed, and how the three documents fit together on a trip.',
    label: 'GR vs LR vs E-Way Bill',
    summary: 'How GR, LR and the GST e-way bill differ and fit together.',
    section: 'guide',
    datePublished: '2026-11-17',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/guides/how-to-choose-transport-management-software',
    title: 'How to Choose Transport Management Software in India',
    description:
      'A practical checklist for choosing transport management software in India: must-have features, questions to ask, costs, red flags, and a 1-week trial plan.',
    label: 'Choosing Transport Software',
    summary: 'Checklist for choosing transport management software in India.',
    section: 'guide',
    datePublished: '2026-11-17',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/guides/paper-gr-book-to-software',
    title: 'How to Move From a Paper GR Book to Software | BiltyOne',
    description:
      'Step-by-step plan to move a transport office from paper GR books and Excel to software in one week, including importing old records and training staff.',
    label: 'Paper GR Book to Software',
    summary: 'One-week plan to digitise a paper GR book or Excel register.',
    section: 'guide',
    datePublished: '2026-11-17',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/logistics-glossary',
    title: 'Indian Logistics & Transport Glossary | BiltyOne',
    description:
      'Plain-English definitions of Indian transport terms: GR, LR, bilty, POD, e-way bill, consignor, consignee, freight, to-pay, TBB and TMS.',
    label: 'Logistics Glossary',
    summary: 'Definitions for GR, LR, bilty, POD, e-way bill and related terms.',
    section: 'resource',
    datePublished: '2026-07-03',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/digital-transport-management',
    title: 'Digital Transport Management vs Paper & Excel | BiltyOne',
    description:
      'Paper GR books vs Excel vs transport software, compared on speed, errors, record safety, search, billing and cost, with a side-by-side table.',
    label: 'Paper vs Excel vs Software',
    summary: 'Side-by-side comparison of paper, Excel and transport software.',
    section: 'resource',
    datePublished: '2026-07-03',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/transport-business-automation',
    title: 'Transport Business Automation: Save Hours Daily | BiltyOne',
    description:
      'Which transport office tasks you can automate today (GR numbers, freight, customer details, bills, backups) and how much time each one saves.',
    label: 'Transport Automation',
    summary: 'Automating repetitive transport-office work.',
    section: 'resource',
    datePublished: '2026-07-03',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.7,
  },

  // ── Company ──────────────────────────────────────────────────────────
  {
    path: '/about',
    title: "About BiltyOne: Built by a Transporter's Son",
    description:
      'BiltyOne was built in 2025 by Sameer Faridi, a software engineer from a transport family in Delhi. The story, the team and what we are building next.',
    label: 'About',
    summary: 'Who built BiltyOne and why.',
    section: 'company',
    datePublished: '2026-05-30',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    path: '/contact',
    title: 'Contact BiltyOne: Demos, Support & Partnerships',
    description:
      'Contact the BiltyOne team in New Delhi for demos, support or partnerships. Email us or use the form; we reply within one business day.',
    label: 'Contact',
    summary: 'Reach the team.',
    section: 'company',
    datePublished: '2026-05-30',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    path: '/faq',
    title: 'BiltyOne FAQ: Transport Management Software Questions',
    description:
      'Answers about BiltyOne: price, setup time, switching from paper, data safety, exports, the offline desktop app and fit for small transport businesses.',
    label: 'FAQ',
    summary: 'Frequently asked questions.',
    section: 'company',
    datePublished: '2026-08-27',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/security',
    title: 'Security: How BiltyOne Protects Your Transport Data',
    description:
      'How BiltyOne keeps your GR records and transport data safe: encryption in transit and at rest, access controls, backups and your right to export.',
    label: 'Security',
    summary: 'Data handling and access-control practices.',
    section: 'company',
    datePublished: '2026-05-30',
    lastModified: '2026-11-17',
    changeFrequency: 'monthly',
    priority: 0.5,
  },
  {
    path: '/developers',
    title: 'Developer Resources | BiltyOne',
    description:
      'Developer and integration resources for BiltyOne: agent-readable docs (llms.txt), sitemap, and the current status of API and webhook access.',
    label: 'Developer resources',
    summary: 'API/integration status and agent-readable resources.',
    section: 'company',
    datePublished: '2026-08-25',
    lastModified: '2026-08-27',
    changeFrequency: 'monthly',
    priority: 0.4,
  },

  // ── Legal ────────────────────────────────────────────────────────────
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | BiltyOne',
    description: 'How BiltyOne collects, uses, stores and protects your personal and operational data, and the choices you have.',
    label: 'Privacy Policy',
    summary: 'Privacy policy.',
    section: 'legal',
    datePublished: '2026-05-30',
    lastModified: '2026-11-17',
    changeFrequency: 'yearly',
    priority: 0.2,
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms & Conditions | BiltyOne',
    description: 'The terms and conditions that govern your use of BiltyOne transport management software and its website.',
    label: 'Terms & Conditions',
    summary: 'Terms and conditions.',
    section: 'legal',
    datePublished: '2026-05-30',
    lastModified: '2026-08-27',
    changeFrequency: 'yearly',
    priority: 0.2,
  },
  {
    path: '/user-agreement',
    title: 'User Agreement | BiltyOne',
    description: 'The BiltyOne User Agreement: roles, responsibilities and acceptable conduct on the platform.',
    label: 'User Agreement',
    summary: 'User agreement.',
    section: 'legal',
    datePublished: '2026-05-30',
    lastModified: '2026-08-27',
    changeFrequency: 'yearly',
    priority: 0.2,
  },
  {
    path: '/cookie-policy',
    title: 'Cookie Policy | BiltyOne',
    description: 'How BiltyOne uses cookies for sign-in sessions, preferences and analytics, and how to change your cookie choices.',
    label: 'Cookie Policy',
    summary: 'Cookie policy.',
    section: 'legal',
    datePublished: '2026-06-18',
    lastModified: '2026-11-17',
    changeFrequency: 'yearly',
    priority: 0.2,
  },

  // ── App entry points: useful to visitors, not to searchers ──────────
  {
    path: '/live-demo',
    title: 'Live Demo: Try BiltyOne Without Signing Up',
    description: 'Try BiltyOne as a guest with sample data. No signup, no credit card.',
    label: 'Live Demo',
    summary: 'Explore BiltyOne as a guest, no signup required.',
    section: 'app',
    datePublished: '2026-05-30',
    lastModified: '2026-05-30',
    changeFrequency: 'monthly',
    priority: 0,
    noindex: true,
  },
  {
    path: '/register',
    title: 'Register Your Transport Company | BiltyOne',
    description: 'Create a free BiltyOne account for your transport company. No credit card required.',
    label: 'Register',
    summary: 'Create a free account.',
    section: 'app',
    datePublished: '2026-04-11',
    lastModified: '2026-08-27',
    changeFrequency: 'yearly',
    priority: 0,
    noindex: true,
  },
  {
    path: '/login',
    title: 'Sign In | BiltyOne',
    description: 'Sign in to your BiltyOne transport management dashboard.',
    label: 'Sign In',
    summary: 'Sign in.',
    section: 'app',
    datePublished: '2026-04-11',
    lastModified: '2026-08-27',
    changeFrequency: 'yearly',
    priority: 0,
    noindex: true,
  },
  {
    path: '/forgot-password',
    title: 'Reset Your Password | BiltyOne',
    description: 'Reset the password for your BiltyOne account.',
    label: 'Reset Password',
    summary: 'Reset password.',
    section: 'app',
    datePublished: '2026-06-03',
    lastModified: '2026-06-07',
    changeFrequency: 'yearly',
    priority: 0,
    noindex: true,
  },
  {
    path: '/desktop/licence-key',
    title: 'Free Licence Key for BiltyOne Desktop',
    description: 'Request a free licence key for BiltyOne Desktop for Windows. We email your key, usually within one business day.',
    label: 'Desktop Licence Key',
    summary: 'Request a free desktop licence key.',
    section: 'app',
    datePublished: '2026-11-17',
    lastModified: '2026-11-17',
    changeFrequency: 'yearly',
    priority: 0,
    noindex: true,
  },
];

const BY_PATH = new Map(PUBLIC_PAGES.map((p) => [p.path, p]));

export function getPage(path: string): PublicPage {
  const page = BY_PATH.get(path);
  if (!page) throw new Error(`No PUBLIC_PAGES entry for "${path}". Add it to src/config/pages.ts.`);
  return page;
}

export const INDEXABLE_PAGES = PUBLIC_PAGES.filter((p) => !p.noindex);

export function pagesInSection(section: PageSection): PublicPage[] {
  return PUBLIC_PAGES.filter((p) => p.section === section && !p.noindex);
}
