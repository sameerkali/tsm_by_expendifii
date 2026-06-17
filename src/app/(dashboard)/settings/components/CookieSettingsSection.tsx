"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { toast } from 'sonner';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
}

function CookieToggle({
  title,
  description,
  enabled,
  onChange,
  disabled = false,
  required = false,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border transition-all duration-150',
        disabled
          ? 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 opacity-60 cursor-not-allowed'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer'
      )}
      onClick={() => !disabled && onChange()}
    >
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className={cn('text-sm font-semibold', disabled ? 'text-slate-400' : 'text-slate-900 dark:text-white')}>
              {title}
            </p>
            {required && (
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-semibold uppercase tracking-wide rounded-full">
                Required
              </span>
            )}
          </div>
          <p className={cn('text-sm leading-relaxed', disabled ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400')}>
            {description}
          </p>
        </div>

        {/* Toggle */}
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={(e) => { e.stopPropagation(); !disabled && onChange(); }}
          disabled={disabled}
          className={cn(
            'relative mt-0.5 shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0369A1] focus-visible:ring-offset-2',
            enabled ? 'bg-[#0369A1] dark:bg-sky-500' : 'bg-slate-200 dark:bg-slate-600'
          )}
        >
          <span
            className={cn(
              'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200',
              enabled ? 'translate-x-6' : 'translate-x-1'
            )}
          />
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsSection() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
  });
  const [saved, setSaved] = useState<CookiePreferences | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('cookie-consent') || localStorage.getItem('cookie-preferences');
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as CookiePreferences;
        setPreferences({ necessary: true, analytics: parsed.analytics ?? false });
        setSaved({ necessary: true, analytics: parsed.analytics ?? false });
      } catch {
        /* ignore */
      }
    }
  }, []);

  const hasChanges = saved === null || preferences.analytics !== saved.analytics;

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    setSaved({ ...preferences });
    setIsSaving(false);
    toast.success('Cookie preferences saved.');
  };

  const handleReset = () => {
    const defaults: CookiePreferences = { necessary: true, analytics: false };
    setPreferences(defaults);
  };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden">

      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <Image src="/cookie.svg" alt="Cookie" width={22} height={22} className="opacity-70 dark:opacity-60" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Cookie Preferences</h2>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Control how we use cookies on this platform.</p>
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="p-8 space-y-4">
        <CookieToggle
          title="Necessary Cookies"
          description="Essential for logging in, session management, and security. Always active."
          enabled={preferences.necessary}
          onChange={() => {}}
          disabled
          required
        />
        <CookieToggle
          title="Analytics Cookies"
          description="Help us understand how the platform is used. Data is anonymous and never sold."
          enabled={preferences.analytics}
          onChange={() => setPreferences((p) => ({ ...p, analytics: !p.analytics }))}
        />
      </div>

      {/* Actions */}
      <div className="px-8 pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={handleSave}
            loading={isSaving}
            disabled={!hasChanges || isSaving}
            className="px-6"
          >
            {isSaving ? 'Saving…' : 'Save Preferences'}
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={isSaving}
            className="px-6"
          >
            Reset to Default
          </Button>
        </div>

        {hasChanges && !isSaving && (
          <p className="text-xs text-amber-600 dark:text-amber-400">Unsaved changes — click Save to apply.</p>
        )}

        <p className="text-xs text-slate-400 dark:text-slate-500">
          Read our{' '}
          <Link href="/cookie-policy" className="text-[#0369A1] dark:text-sky-400 hover:underline underline-offset-2 transition-colors">
            Cookie Policy
          </Link>{' '}
          to learn more.
        </p>
      </div>
    </section>
  );
}
