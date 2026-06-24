'use client';

import React from 'react';
import { Modal } from '@/components/shared/Modal';

interface CookiePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const lastUpdated = 'June 2026';

export function CookiePolicyModal({ isOpen, onClose }: CookiePolicyModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      title={
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-sky-50 dark:bg-sky-950/40 text-[#0369A1] dark:text-sky-450 text-[10px] font-black uppercase tracking-wider rounded-md">
            Legal
          </span>
          <span className="text-sm font-bold text-slate-400 dark:text-slate-500">
            •
          </span>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            Last updated: {lastUpdated}
          </span>
        </div>
      }
    >
      <div className="relative overflow-hidden rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-900 p-6 sm:p-8 mb-8">
        <div 
          aria-hidden="true" 
          className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-40" 
        />
        <div className="relative">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Cookie Policy
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
            How TSM uses cookies for session management and analytics on our platform.
          </p>
        </div>
      </div>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-350">
        {/* Section 1 */}
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
            1. What Are Cookies
          </h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They allow the site to recognise your device and remember certain information across sessions. TSM uses only first-party cookies — we do not place third-party advertising or tracking cookies on your device.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
            2. Cookies We Use
          </h2>
          <p>We use two categories of cookies:</p>
          <ul className="space-y-2.5 pl-5 list-disc marker:text-sky-500">
            <li>
              <strong>Necessary Cookies</strong> — Required for the platform to function. These enable secure sign-in, session management, and CSRF protection. They cannot be disabled.
            </li>
            <li>
              <strong>Analytics Cookies</strong> — Help us understand how the platform is used (page visits, navigation patterns, errors). This data is anonymous and used solely to improve TSM.
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
            3. What We Do Not Use
          </h2>
          <p>
            We do not use marketing, advertising, or cross-site tracking cookies. We do not sell or share cookie data with third-party advertisers.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
            4. Managing Your Preferences
          </h2>
          <p>
            When you first visit TSM, a banner will appear asking for your consent to analytics cookies. You can change your preference at any time in{' '}
            <strong>Settings → Cookie Preferences</strong>.
          </p>
          <p>
            You can also control or delete cookies through your browser settings. Note that disabling necessary cookies will prevent you from logging in to TSM.
          </p>
        </div>

        {/* Section 5 */}
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
            5. Changes to This Policy
          </h2>
          <p>
            We may update this policy when our cookie usage changes. We will notify you via the consent banner if any significant change is made.
          </p>
        </div>

        {/* Section 6 */}
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
            6. Contact
          </h2>
          <p>
            For questions about how we use cookies, email us at{' '}
            <a 
              href="mailto:expendifiii@gmail.com" 
              className="text-[#0369A1] dark:text-sky-400 hover:underline font-semibold"
            >
              expendifiii@gmail.com
            </a>
            .
          </p>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-900 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="h-11 px-6 rounded-xl bg-slate-900 dark:bg-white hover:opacity-95 text-white dark:text-slate-950 font-bold text-sm tracking-tight transition-all active:scale-95 cursor-pointer shadow-lg shadow-slate-900/10 dark:shadow-white/5"
        >
          Got it
        </button>
      </div>
    </Modal>
  );
}
