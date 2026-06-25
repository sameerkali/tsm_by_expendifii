'use client';

import posthog from 'posthog-js';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

let initialized = false;

export function initPostHog() {
  if (typeof window === 'undefined') return;
  if (!POSTHOG_KEY) return;
  if (initialized) return;
  initialized = true;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    loaded: (ph) => {
      if (process.env.NODE_ENV === 'development') ph.opt_out_capturing();
    },
  });
}

export function capture(event: string, properties?: Record<string, unknown>) {
  if (!initialized || !POSTHOG_KEY) return;
  posthog.capture(event, properties);
}

export function identify(distinctId: string, properties?: Record<string, unknown>) {
  if (!initialized || !POSTHOG_KEY) return;
  posthog.identify(distinctId, properties);
}

export function reset() {
  if (!initialized || !POSTHOG_KEY) return;
  posthog.reset();
}
