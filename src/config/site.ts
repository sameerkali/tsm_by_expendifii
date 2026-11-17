/**
 * Single source of truth for BiltyOne's public identity: canonical host,
 * contact details (NAP), and off-site profiles.
 *
 * Edge-runtime safe (plain data only) because middleware.ts and the
 * agent-content Markdown renditions import it.
 *
 * Everything here is rendered on public pages AND in schema.org JSON-LD, so
 * search engines and AI engines see the same name, address and phone
 * everywhere. Empty strings / empty arrays are simply not rendered.
 */

/**
 * Canonical origin. Must match the host Vercel serves as primary.
 * Today Vercel 308-redirects biltyone.com -> www.biltyone.com, which conflicts
 * with this value; make biltyone.com the primary domain in Vercel (Project >
 * Settings > Domains) or set NEXT_PUBLIC_SITE_URL to the www origin.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biltyone.com').replace(/\/$/, '');

export const SITE_NAME = 'BiltyOne';
export const SITE_TAGLINE = 'Transport management software for Indian transporters';

/** Absolute URL for a site path ("/features" -> "https://biltyone.com/features"). */
export function absoluteUrl(path = '/'): string {
  if (path === '/' || path === '') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export const CONTACT = {
  /** Replace with a domain mailbox (e.g. support@biltyone.com) once it exists. */
  email: 'work.sameerfaridi@gmail.com',
  /** E.164 format, e.g. '+91-98XXXXXXXX'. Leave empty to hide. */
  phone: '',
  /** WhatsApp number in international format without '+', e.g. '9198XXXXXXXX'. Leave empty to hide. */
  whatsapp: '919639356395',
  responseTime: 'Within 1 business day',
  languages: ['English', 'Hindi'],
} as const;

export const ADDRESS = {
  streetAddress: '338, 6A Mahipalpur',
  addressLocality: 'New Delhi',
  addressRegion: 'DL',
  regionName: 'Delhi',
  postalCode: '110037',
  addressCountry: 'IN',
  countryName: 'India',
} as const;

export const FOUNDER = {
  name: 'Sameer Faridi',
  jobTitle: 'Founder',
  linkedIn: 'https://www.linkedin.com/in/sameerfaridi',
} as const;

export const FOUNDING_YEAR = '2025';

/**
 * Official BiltyOne profiles on other sites (LinkedIn company page, YouTube,
 * X, Facebook, Instagram, Google Business Profile, G2, Capterra, Crunchbase...).
 * These become Organization.sameAs, which is how Google and AI engines tie the
 * brand to its off-site presence. Only add profiles that BiltyOne owns.
 */
export const SOCIAL_PROFILES: string[] = [];

/** Places BiltyOne actively serves, used for Organization.areaServed. */
export const AREA_SERVED = ['Delhi NCR', 'India'] as const;
