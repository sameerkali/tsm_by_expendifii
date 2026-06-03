'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bgImage, setBgImage] = useState<string>('/landingImg01.webp');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const images = ['/landingImg01.webp', '/landingImg02.webp', '/landingImg03.webp'];
    const randomImg = images[Math.floor(Math.random() * images.length)] as string;
    setBgImage(randomImg);
    setMounted(true);
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-white dark:bg-slate-950 flex font-sans selection:bg-sky-500/30 selection:text-sky-500">
      {/* Auth Content Area - Left Side (60%) */}
      <main className="w-full lg:w-3/5 h-full overflow-y-auto bg-white dark:bg-slate-950 relative z-20">
        {/* Back to home button */}
        <Link
          href="/"
          id="auth-back-to-home"
          className="absolute top-5 left-5 z-30 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white transition-all duration-150 shadow-sm cursor-pointer"
          aria-label="Back to home page"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to home
        </Link>

        <div className="min-h-full flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-2xl relative z-10 py-12 lg:py-8">
            {children}
          </div>
        </div>
      </main>

      {/* Visual Area - Right Side (40%) */}
      <div className="hidden lg:flex lg:w-2/5 h-full bg-slate-900 relative overflow-hidden transition-opacity duration-1000">
        
        <Image
          src={mounted ? bgImage : '/landingImg01.webp'}
          alt="Logistics Flow"
          fill
          priority
          unoptimized
          className="object-cover"
          style={{ opacity: mounted ? 1 : 0.9, transition: 'opacity 1s ease-in-out' }}
        />

        {/* Subtle overlay to ensure it doesn't look too bright/harsh */}
        <div className="absolute inset-0 bg-slate-900/40 z-10" />

        {/* Floating Accent Shapes (kept for visual flair, optional) */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-sky-500/20 blur-[120px] rounded-full animate-pulse z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full z-10 pointer-events-none" />
      </div>
    </div>
  );
}
