'use client';

import React from 'react';
import { Sun, Moon, Monitor, Type } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { type Theme, type FontSize, FONT_SIZE_MAP } from '@/providers/PreferencesProvider';

const THEME_OPTIONS: { value: Theme; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: 'light', label: 'Light', icon: <Sun size={20} />, desc: 'Always use light mode' },
  { value: 'dark', label: 'Dark', icon: <Moon size={20} />, desc: 'Always use dark mode' },
  { value: 'system', label: 'System', icon: <Monitor size={20} />, desc: 'Match your OS setting' },
];

const FONT_OPTIONS: { value: FontSize; label: string; size: string }[] = [
  { value: 'sm', label: 'Small', size: '14px' },
  { value: 'md', label: 'Default', size: '16px' },
  { value: 'lg', label: 'Large', size: '18px' },
  { value: 'xl', label: 'X-Large', size: '20px' },
];

interface AppearanceSectionProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

export function AppearanceSection({ theme, setTheme, fontSize, setFontSize }: AppearanceSectionProps) {
  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60">
        <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Appearance</h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">Customize how TMS looks and feels on your screen.</p>
      </div>

      <div className="p-8 space-y-10">
        {/* ── Theme ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sun size={16} className="text-slate-400" />
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Color Theme</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {THEME_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={cn(
                  'relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98]',
                  theme === opt.value
                    ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10'
                    : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-white dark:bg-slate-800/30',
                )}
              >
                <div
                  className={cn(
                    'h-16 w-full rounded-xl overflow-hidden border flex items-center justify-center relative',
                    opt.value === 'dark'
                      ? 'bg-slate-900 border-slate-700'
                      : opt.value === 'light'
                        ? 'bg-white border-slate-200'
                        : 'bg-gradient-to-r from-white to-slate-900 border-slate-300',
                  )}
                >
                  <div className={cn('text-2xl', opt.value === 'dark' ? 'text-white' : opt.value === 'light' ? 'text-slate-900' : '')}>
                    {opt.icon}
                  </div>
                  <div className={cn('absolute left-0 top-0 bottom-0 w-4', opt.value === 'dark' ? 'bg-slate-800' : opt.value === 'light' ? 'bg-slate-100' : 'bg-slate-700')} />
                  <div className={cn('absolute top-2 left-6 h-1 w-8 rounded-full', opt.value === 'dark' ? 'bg-slate-700' : 'bg-slate-200')} />
                  <div className={cn('absolute top-5 left-6 h-1 w-6 rounded-full', opt.value === 'dark' ? 'bg-emerald-500/40' : 'bg-emerald-500/30')} />
                </div>
                <div className="text-center">
                  <p className={cn('text-sm font-black tracking-tight', theme === opt.value ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300')}>
                    {opt.label}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{opt.desc}</p>
                </div>
                {theme === opt.value && (
                  <div className="absolute top-3 right-3 h-5 w-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Font Size ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Type size={16} className="text-slate-400" />
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Text Size</h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {FONT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFontSize(opt.value)}
                className={cn(
                  'relative flex flex-col items-center gap-2 py-5 px-3 rounded-2xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98]',
                  fontSize === opt.value
                    ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10'
                    : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-white dark:bg-slate-800/30',
                )}
              >
                <span
                  className={cn(
                    'font-black text-slate-900 dark:text-white leading-none',
                    opt.value === 'sm' ? 'text-sm' : opt.value === 'md' ? 'text-base' : opt.value === 'lg' ? 'text-lg' : 'text-xl',
                  )}
                >
                  Aa
                </span>
                <p className={cn('text-[10px] font-black uppercase tracking-widest', fontSize === opt.value ? 'text-emerald-500' : 'text-slate-400')}>
                  {opt.label}
                </p>
                <p className="text-[9px] text-slate-400 font-mono">{opt.size}</p>
                {fontSize === opt.value && (
                  <div className="absolute top-2 right-2 h-4 w-4 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L2.8 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Live Preview */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
            <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Live Preview</p>
            <p className="font-extrabold tracking-tighter text-slate-900 dark:text-white" style={{ fontSize: FONT_SIZE_MAP[fontSize] }}>
              GR-0001 • Mumbai → Delhi
            </p>
            <p className="text-slate-500 dark:text-slate-400" style={{ fontSize: `calc(${FONT_SIZE_MAP[fontSize]} * 0.875)` }}>
              Stark Industries → Avengers HQ • 5,400 kg • ₹ 64,800
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
