'use client';

import { useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

/**
 * Only 'light' and 'dark' are ever written here — this toggle never exposes
 * or stores a 'system' option. If nothing has been chosen yet (no bp-theme
 * key, or a stale 'system' value from before this toggle existed), the OS
 * preference decides the initial state, matching the anti-flash script in
 * layout.tsx, but the moment the user flips the switch it becomes an
 * explicit light/dark choice.
 */
function getInitialIsDark(): boolean {
  const stored = localStorage.getItem('bp-theme');
  if (stored === 'dark') return true;
  if (stored === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyDark(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark);
}

export default function LandingThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(getInitialIsDark());
    setMounted(true);
  }, []);

  const handleChange = (checked: boolean) => {
    setIsDark(checked);
    localStorage.setItem('bp-theme', checked ? 'dark' : 'light');
    applyDark(checked);
  };

  if (!mounted) {
    // Placeholder to prevent layout shift
    return <div className="h-8 w-8" aria-hidden="true" />;
  }

  return (
    <DarkModeSwitch
      checked={isDark}
      onChange={handleChange}
      size={20}
      sunColor="#0369A1"
      moonColor="#38bdf8"
      aria-label="Toggle light or dark theme"
    />
  );
}
