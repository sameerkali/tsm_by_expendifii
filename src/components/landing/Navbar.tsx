'use client';

import { useState } from 'react';
import Link from 'next/link';
import LandingThemeToggle from '@/components/landing/LandingThemeToggle';
import { LiveDemoLink } from '@/components/shared/LiveDemoLink';

interface HoverRect {
  left: number;
  width: number;
}

export default function Navbar() {
  const [hovered, setHovered] = useState<HoverRect | null>(null);

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    setHovered({ left: el.offsetLeft, width: el.offsetWidth });
  };

  const linkClassName =
    'relative z-10 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white rounded-full transition-colors duration-150 cursor-pointer';

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-slate-200/60 bg-white/80 px-4 shadow-lg shadow-slate-900/5 backdrop-blur-xl sm:px-6 dark:border-slate-700/60 dark:bg-slate-900/80 dark:shadow-black/20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/brand/logo-mark.svg" alt="" className="h-6 w-6" />
          <span className="text-[15px] tracking-tight text-[#0F172A] dark:text-white" style={{ fontWeight: 700 }}>
            Bilty<span className="text-[#0369A1] dark:text-sky-400">One</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav
          className="relative hidden md:flex items-center gap-1"
          aria-label="Main navigation"
          onMouseLeave={() => setHovered(null)}
        >
          {/* Sliding hover highlight */}
          <span
            aria-hidden="true"
            className="absolute inset-y-1 left-0 rounded-full bg-slate-100 transition-all duration-300 ease-out dark:bg-slate-800"
            style={{
              width: hovered?.width ?? 0,
              transform: `translateX(${hovered?.left ?? 0}px)`,
              opacity: hovered ? 1 : 0,
            }}
          />

          {[
            { label: 'Features', href: '/features' },
            { label: 'Why Choose BiltyOne', href: '/why-tsm' },
          ].map((item) => (
            <Link key={item.href} href={item.href} onMouseEnter={handleEnter} className={linkClassName}>
              {item.label}
            </Link>
          ))}
          <LiveDemoLink onMouseEnter={handleEnter} className={linkClassName}>
            Live Demo
          </LiveDemoLink>
          {[
            { label: 'FAQ', href: '/faq' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
          ].map((item) => (
            <Link key={item.href} href={item.href} onMouseEnter={handleEnter} className={linkClassName}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <LandingThemeToggle />
          <Link
            href="/login"
            className="hidden sm:inline-flex text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white transition-colors duration-150 cursor-pointer"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0F172A] dark:bg-[#0369A1] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0369A1] dark:hover:bg-sky-500 transition-colors duration-200 cursor-pointer"
          >
            Get Started
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
