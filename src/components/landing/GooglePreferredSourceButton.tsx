'use client';

import { useEffect, useRef } from 'react';

const SCRIPT_ID = 'google-preferred-sources';
const SCRIPT_SRC = 'https://news.google.com/swg/js/v1/publisher.js';

function loadPublisherScript() {
  if (document.getElementById(SCRIPT_ID)) return;
  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.src = SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
}

/**
 * Google "Preferred Sources" button: lets readers mark BiltyOne as a
 * preferred source in Google Search. publisher.js renders the button into
 * the element carrying the `google-add-preferred-source-btn` attribute.
 *
 * The script (plus the news.google.com iframe and ~400 KB of gstatic JS it
 * pulls in) is only fetched once the button is about to scroll into view,
 * not on every page load. Visitors who never reach the footer don't pay
 * for it, and pages without a footer (the dashboard) never load it.
 */
export function GooglePreferredSourceButton() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      loadPublisherScript();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          loadPublisherScript();
        }
      },
      // Start loading well before the footer is visible so the button is
      // already rendered by the time the reader gets there.
      { rootMargin: '600px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} {...{ 'google-add-preferred-source-btn': '', 'data-theme': 'dark' }} />;
}
