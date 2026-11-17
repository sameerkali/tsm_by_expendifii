/**
 * Google Analytics 4 helpers.
 *
 * GA only loads when NEXT_PUBLIC_GA_MEASUREMENT_ID is set AND the visitor has
 * accepted analytics cookies (banner or Settings > Cookies). Until then every
 * helper here is a no-op. The logged-in app (GRs, customers, printing...) is
 * never tracked, so no customer or GR data can reach Google.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

export const CONSENT_KEY = 'cookie-consent';
/** Fired on window whenever the stored cookie choice changes. */
export const CONSENT_EVENT = 'cookie-consent-change';

/** Logged-in app routes. Mirrors PROTECTED_PATHS in middleware.ts. */
const UNTRACKED_PREFIXES = ['/dashboard', '/gr', '/customers', '/printing', '/settings', '/demo'];

export function isTrackedPath(pathname: string): boolean {
  return !UNTRACKED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw)?.analytics === true : false;
  } catch {
    return false;
  }
}

/** Call after writing CONSENT_KEY so GA can start or stop without a reload. */
export function notifyConsentChange(): void {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(CONSENT_EVENT));
}

type Gtag = (...args: unknown[]) => void;

function gtag(): Gtag | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as unknown as { gtag?: Gtag }).gtag;
}

/**
 * Send a GA4 event. Safe to call anywhere: does nothing without GA, without
 * consent, or on logged-in app pages (GA's own ga-disable flag is set there).
 * Never pass customer names, phone numbers, GSTINs or GR contents as params.
 */
export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}): void {
  gtag()?.('event', name, params);
}
