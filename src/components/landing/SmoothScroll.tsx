'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type Lenis from 'lenis';

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Avoid running Lenis on the dashboard, auth pages, and dynamic panel paths
    const bypassRoutes = [
      '/dashboard',
      '/gr',
      '/settings',
      '/customers',
      '/printing',
      '/login',
      '/register'
    ];
    const shouldBypass = bypassRoutes.some((route) => pathname.startsWith(route));

    // Smooth (momentum) scrolling is motion: skip it for visitors who have
    // asked their OS for reduced motion. They get the browser's native scroll.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (shouldBypass || prefersReducedMotion) {
      return;
    }

    let cancelled = false;
    let lenis: Lenis | undefined;
    let rafId: number | undefined;

    // Lenis is loaded on demand rather than statically imported so it stays
    // out of the JS that has to download and run before first paint.
    import('lenis').then(({ default: LenisCtor }) => {
      // Route changed (or component unmounted) while the chunk was loading.
      if (cancelled) return;

      // Initialize Lenis with modern momentum defaults
      const instance = new LenisCtor({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard cubic easing
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
        // Let modal dialogs (and their backdrops) scroll natively.
        prevent: (node) => node.closest('dialog') !== null,
      });
      lenis = instance;

      // Request Animation Frame loop
      function raf(time: number) {
        instance.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [pathname]);

  return null;
}
