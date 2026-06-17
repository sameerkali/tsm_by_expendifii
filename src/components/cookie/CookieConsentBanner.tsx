"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
}

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveAndClose = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    setIsVisible(false);
  };

  const handleAcceptAll = () =>
    saveAndClose({ necessary: true, analytics: true });

  const handleDenyAll = () =>
    saveAndClose({ necessary: true, analytics: false });

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[9998] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out">
        <div className="relative rounded-2xl">
          {/* Glow layer (blurred, sits behind) */}
          <div className="animated-border-box-glow" />
          {/* Sharp border layer */}
          <div className="animated-border-box" />

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900 px-5 py-4 shadow-xl shadow-slate-900/10 dark:shadow-black/30">

            {/* Cookie icon */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="shrink-0">
                <Image
                  src="/cookie.svg"
                  alt="Cookie"
                  width={28}
                  height={28}
                  className="opacity-80"
                />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">
                We use cookies for session management and analytics.{' '}
                <Link
                  href="/cookie-policy"
                  className="font-medium text-[#0369A1] dark:text-sky-400 hover:underline underline-offset-2 transition-colors whitespace-nowrap"
                >
                  Cookie Policy
                </Link>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
  <button
    id="cookie-deny"
    onClick={handleDenyAll}
    className="px-4 py-2 text-sm font-medium text-[#7c3aed] bg-white dark:bg-slate-900 rounded-lg border border-[#7c3aed]/40 hover:bg-[#7c3aed]/10 hover:border-[#7c3aed] dark:text-[#a78bfa] dark:border-[#7c3aed]/50 dark:hover:bg-[#7c3aed]/20 transition-all duration-200 cursor-pointer"
  >
    Deny
  </button>

  <button
    id="cookie-accept"
    onClick={handleAcceptAll}
    className="px-4 py-2 text-sm font-semibold text-white bg-[#7c3aed] rounded-lg hover:bg-[#6d28d9] active:bg-[#5b21b6] dark:bg-[#8b5cf6] dark:hover:bg-[#7c3aed] dark:active:bg-[#6d28d9] transition-all duration-200 cursor-pointer shadow-lg shadow-[#7c3aed]/30 hover:shadow-[#7c3aed]/50"
  >
    Accept All
  </button>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}