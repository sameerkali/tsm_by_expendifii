import type { Metadata } from 'next';
import { getPage, type PublicPage } from '@/config/pages';
import { phoneNumber } from '@/lib/contact';
import {
  ADDRESS,
  AREA_SERVED,
  CONTACT,
  FOUNDER,
  FOUNDING_YEAR,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  SOCIAL_PROFILES,
  absoluteUrl,
} from '@/config/site';

/** Shared social preview image (1200x630). */
export const OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'BiltyOne transport management software: GR list and dashboard',
} as const;

interface MetadataOptions {
  /** Shorter/punchier title for social cards. Defaults to the page title. */
  ogTitle?: string;
  ogDescription?: string;
}

/**
 * Complete per-page metadata from the page registry: absolute title,
 * description, self-referencing canonical, robots, Open Graph and Twitter.
 *
 * Every page must call this. Next.js merges metadata shallowly, so a page
 * that omits `alternates` or `openGraph` silently inherits the root layout's
 * values, which is how /contact and /login ended up canonicalised to the
 * homepage.
 */
export function buildPageMetadata(path: string, options: MetadataOptions = {}): Metadata {
  const page = getPage(path);
  const url = absoluteUrl(page.path);
  const ogTitle = options.ogTitle ?? page.title;
  const ogDescription = options.ogDescription ?? page.description;
  const isArticle = page.section === 'guide' || page.section === 'resource';

  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url },
    robots: page.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    openGraph: {
      type: isArticle ? 'article' : 'website',
      url,
      title: ogTitle,
      description: ogDescription,
      siteName: SITE_NAME,
      locale: 'en_IN',
      images: [OG_IMAGE],
      ...(isArticle
        ? {
            publishedTime: page.datePublished,
            modifiedTime: page.lastModified,
            authors: [absoluteUrl('/about')],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [OG_IMAGE.url],
    },
  };
}

// ── schema.org JSON-LD ─────────────────────────────────────────────────

type Node = Record<string, unknown>;

export const IDS = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  founder: `${SITE_URL}/#founder`,
  software: `${SITE_URL}/#software`,
} as const;

export function organizationNode(): Node {
  return {
    '@type': 'Organization',
    '@id': IDS.organization,
    name: SITE_NAME,
    alternateName: 'BiltyOne TMS',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo.png'),
    },
    description: `${SITE_NAME} is ${SITE_TAGLINE.toLowerCase()}: GR/LR (bilty) creation, printing, customer billing and records.`,
    foundingDate: FOUNDING_YEAR,
    founder: { '@id': IDS.founder },
    email: CONTACT.email,
    ...(phoneNumber() ? { telephone: phoneNumber() } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.streetAddress,
      addressLocality: ADDRESS.addressLocality,
      addressRegion: ADDRESS.addressRegion,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.addressCountry,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT.email,
      ...(phoneNumber() ? { telephone: phoneNumber() } : {}),
      url: absoluteUrl('/contact'),
      availableLanguage: [...CONTACT.languages],
      areaServed: 'IN',
    },
    areaServed: AREA_SERVED.map((name) => ({ '@type': 'Place', name })),
    knowsAbout: [
      'Transport management software',
      'Transport management system',
      'Goods receipt (GR)',
      'Lorry receipt (LR)',
      'Bilty',
      'Road transport in India',
    ],
    ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
  };
}

export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': IDS.website,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'en-IN',
    publisher: { '@id': IDS.organization },
  };
}

export function founderNode(): Node {
  return {
    '@type': 'Person',
    '@id': IDS.founder,
    name: FOUNDER.name,
    jobTitle: FOUNDER.jobTitle,
    url: absoluteUrl('/about'),
    sameAs: [FOUNDER.linkedIn],
    worksFor: { '@id': IDS.organization },
    description: `Founder of ${SITE_NAME}. Software engineer from a family of Delhi transporters, building transport management software for Indian road transport.`,
  };
}

export function softwareNode(): Node {
  return {
    '@type': 'SoftwareApplication',
    '@id': IDS.software,
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Transport management software',
    operatingSystem: 'Web browser (Windows, macOS, Android, iOS); Windows 10/11 desktop app',
    url: SITE_URL,
    description:
      'Transport management software for Indian road transporters: create and print GR/LR (bilty) in 3 copies, manage customers, generate freight statements, import from Excel and work offline on Windows.',
    featureList: [
      'GR / LR (bilty) creation with automatic GR numbers',
      'Automatic freight calculation per KM, box, kg, quintal or ton',
      '3-copy print: driver, consignor and consignee',
      'Customer directory with auto-fill',
      'Customer freight statements (PDF bill with GR pages)',
      'Booking, in-transit and delivered status',
      'Payment status tracking',
      'Excel / CSV import and full Excel backup',
      'Analytics dashboard',
      'Offline Windows desktop app',
    ],
    inLanguage: 'en-IN',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      description: 'Free for early transporters.',
    },
    publisher: { '@id': IDS.organization },
    author: { '@id': IDS.founder },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

/** Home > ...parents > page. Parents are inferred for guides. */
export function crumbsFor(page: PublicPage): Crumb[] {
  const crumbs: Crumb[] = [{ name: 'Home', path: '/' }];
  if (page.path === '/') return crumbs;
  if (page.section === 'guide') crumbs.push({ name: 'Guides', path: '/guides' });
  crumbs.push({ name: page.label, path: page.path });
  return crumbs;
}

export function breadcrumbNode(crumbs: Crumb[], pageUrl: string): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export interface Faq {
  q: string;
  a: string;
}

export function faqNode(faqs: Faq[], pageUrl: string): Node {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

type WebPageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'FAQPage';

interface PageGraphOptions {
  /** schema.org type of the page itself. */
  pageType?: WebPageType;
  /** Adds an Article node authored by the founder (guides, explainers, landing pages). */
  article?: boolean;
  faqs?: Faq[];
  /** CSS selectors of short, read-aloud-friendly passages. */
  speakable?: string[];
  /** The page is about the BiltyOne software itself (adds SoftwareApplication). */
  aboutSoftware?: boolean;
  /** Extra nodes, e.g. DefinedTermSet or HowTo. */
  extra?: Node[];
}

/**
 * Full @graph for a page: WebPage + BreadcrumbList + Organization + WebSite +
 * founder Person, plus optional Article / FAQPage / SoftwareApplication.
 * Nodes are linked by @id so engines read them as one entity graph.
 */
export function pageJsonLd(path: string, options: PageGraphOptions = {}): Node {
  const page = getPage(path);
  const url = absoluteUrl(page.path);
  const crumbs = crumbsFor(page);

  const webPage: Node = {
    '@type': options.pageType ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': IDS.website },
    publisher: { '@id': IDS.organization },
    breadcrumb: { '@id': `${url}#breadcrumb` },
    datePublished: page.datePublished,
    dateModified: page.lastModified,
    primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(OG_IMAGE.url) },
    ...(options.speakable ? { speakable: { '@type': 'SpeakableSpecification', cssSelector: options.speakable } } : {}),
    ...(options.aboutSoftware ? { about: { '@id': IDS.software } } : {}),
  };

  const nodes: Node[] = [webPage, breadcrumbNode(crumbs, url), organizationNode(), websiteNode(), founderNode()];

  if (options.aboutSoftware) nodes.push(softwareNode());

  if (options.article) {
    nodes.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: page.title.replace(/\s*\|\s*BiltyOne$/, ''),
      description: page.description,
      url,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      datePublished: page.datePublished,
      dateModified: page.lastModified,
      inLanguage: 'en-IN',
      author: { '@id': IDS.founder },
      publisher: { '@id': IDS.organization },
      image: absoluteUrl(OG_IMAGE.url),
    });
  }

  if (options.faqs?.length) nodes.push(faqNode(options.faqs, url));
  if (options.extra) nodes.push(...options.extra);

  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** Human-readable date for bylines: "17 Nov 2026". */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d} ${months[(m ?? 1) - 1]} ${y}`;
}
