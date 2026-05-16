'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
    <div className="min-h-screen bg-white dark:bg-slate-950 flex font-sans selection:bg-emerald-500/30 selection:text-emerald-500">
      {/* Auth Content Area - Left Side (50%) */}
      <main className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-950 relative z-20">
        <div className="w-full max-w-md relative z-10">
          {children}
        </div>
      </main>

      {/* Visual Area - Right Side (50%) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden transition-opacity duration-1000">
        
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
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-emerald-500/20 blur-[120px] rounded-full animate-pulse z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full z-10 pointer-events-none" />
      </div>
    </div>
  );
}
