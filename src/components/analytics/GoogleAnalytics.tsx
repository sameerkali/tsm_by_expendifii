'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CONSENT_EVENT, GA_MEASUREMENT_ID, hasAnalyticsConsent, isTrackedPath, trackEvent } from '@/lib/analytics';

type Gtag = (...args: unknown[]) => void;
type GaWindow = Window & { dataLayer?: unknown[]; gtag?: Gtag } & Record<string, unknown>;

/**
 * Google Analytics 4, loaded only after the visitor accepts analytics
 * cookies, and switched off on logged-in app pages.
 *
 * Page views are sent here on every route change (send_page_view: false), so
 * in GA4 turn OFF Admin > Data streams > Enhanced measurement > Page views >
 * "Page changes based on browser history events", or SPA page views count twice.
 */
export function GoogleAnalytics() {
  const pathname = usePathname() ?? '/';
  const [consented, setConsented] = useState(false);
  const initialised = useRef(false);

  // Follow the stored cookie choice (this tab and other tabs).
  useEffect(() => {
    const sync = () => setConsented(hasAnalyticsConsent());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  // Set up gtag once consent is given. Commands queue in dataLayer until the
  // gtag.js script (rendered below) loads.
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !consented || initialised.current) return;
    const w = window as unknown as GaWindow;
    w.dataLayer = w.dataLayer || [];
    w.gtag =
      w.gtag ||
      function gtag() {
        // gtag.js expects the arguments object itself, not an array.
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments);
      };
    w.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    w.gtag('js', new Date());
    w.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
    initialised.current = true;
  }, [consented]);

  // GA's official kill switch: off without consent and inside the app.
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const w = window as unknown as GaWindow;
    w[`ga-disable-${GA_MEASUREMENT_ID}`] = !consented || !isTrackedPath(pathname);
    if (initialised.current) w.gtag?.('consent', 'update', { analytics_storage: consented ? 'granted' : 'denied' });
  }, [consented, pathname]);

  // One page_view per route, marketing pages only.
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !consented || !isTrackedPath(pathname)) return;
    trackEvent('page_view', { page_location: window.location.href, page_title: document.title });
  }, [consented, pathname]);

  // Key clicks, captured site-wide so no CTA needs its own tracking code.
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !consented) return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a');
      if (!link) return;
      const href = link.getAttribute('href') ?? '';
      const params = { link_text: (link.textContent ?? '').trim().slice(0, 80), page_path: window.location.pathname };
      if (href === '/register' || href.startsWith('/register?')) trackEvent('cta_get_started', params);
      else if (href.startsWith('https://wa.me')) trackEvent('whatsapp_click', params);
      else if (href.startsWith('mailto:')) trackEvent('email_click', params);
      else if (href.startsWith('tel:')) trackEvent('phone_click', params);
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, [consented]);

  if (!GA_MEASUREMENT_ID || !consented) return null;
  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />;
}
