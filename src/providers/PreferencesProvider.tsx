'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';

export const FONT_SIZE_MAP: Record<FontSize, string> = {
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
};

interface Preferences {
  theme: Theme;
  fontSize: FontSize;
  resolvedTheme: 'light' | 'dark';
  setTheme: (t: Theme) => void;
  setFontSize: (s: FontSize) => void;
}

const PreferencesContext = createContext<Preferences>({
  theme: 'system',
  fontSize: 'md',
  resolvedTheme: 'light',
  setTheme: () => {},
  setFontSize: () => {},
});

/** Returns what 'system' resolves to right now */
function getSystemPref(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Apply the resolved dark/light class to <html> */
function applyDarkClass(resolved: 'light' | 'dark') {
  const html = document.documentElement;
  if (resolved === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}

/** Apply font size to <html> */
function applyFontSize(size: FontSize) {
  document.documentElement.style.fontSize = FONT_SIZE_MAP[size];
}

/** Resolve a theme choice to 'light' | 'dark' */
function resolve(t: Theme): 'light' | 'dark' {
  return t === 'system' ? getSystemPref() : t;
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [fontSize, setFontSizeState] = useState<FontSize>('md');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // On mount: read saved prefs and apply them
  useEffect(() => {
    const savedTheme = (localStorage.getItem('tms-theme') as Theme | null) ?? 'system';
    const savedSize = (localStorage.getItem('tms-font-size') as FontSize | null) ?? 'md';

    const resolved = resolve(savedTheme);
    setThemeState(savedTheme);
    setFontSizeState(savedSize);
    setResolvedTheme(resolved);
    applyDarkClass(resolved);
    applyFontSize(savedSize);
  }, []);

  // Watch for OS-level preference changes (only affects 'system' mode)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        const resolved: 'light' | 'dark' = e.matches ? 'dark' : 'light';
        setResolvedTheme(resolved);
        applyDarkClass(resolved);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    const resolved = resolve(t);
    setThemeState(t);
    setResolvedTheme(resolved);
    localStorage.setItem('tms-theme', t);
    // Apply immediately — no React re-render needed for the DOM mutation
    applyDarkClass(resolved);
  }, []);

  const setFontSize = useCallback((s: FontSize) => {
    setFontSizeState(s);
    localStorage.setItem('tms-font-size', s);
    applyFontSize(s);
  }, []);

  return (
    <PreferencesContext.Provider value={{ theme, fontSize, resolvedTheme, setTheme, setFontSize }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  return useContext(PreferencesContext);
}
