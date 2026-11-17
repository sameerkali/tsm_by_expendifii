'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

// Plain class join rather than cn(): this sits in the homepage hero, and cn()
// would pull tailwind-merge (~8 KB gzipped) into the JS that loads before
// first paint. Callers only append non-conflicting classes (e.g. margins).
const join = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

interface ScrollImageProps {
  src: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

/**
 * Desktop-tuned tilt/depth/scale range the image animates through as it
 * scrolls up through the viewport. Reduced on small screens so the effect
 * stays subtle on phones instead of looking exaggerated.
 */
const DESKTOP_RANGE = { rotateX: 32, translateY: 70, translateZ: -180, scale: 0.86 };
const MOBILE_RANGE = { rotateX: 16, translateY: 34, translateZ: -80, scale: 0.9 };

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

export function ScrollImage({
  src,
  alt = '',
  className,
  containerClassName,
  width = 1672,
  height = 941,
  priority,
  // Matches the wrapper below (`w-full max-w-5xl`, i.e. at most 1024px).
  // Without it the browser assumes 100vw and picks from a 1x/2x srcset, so
  // phones were downloading the 3840px rendition for a ~380px-wide image.
  sizes = '(max-width: 1024px) 100vw, 1024px',
}: ScrollImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const imageEl = imageRef.current;
    if (!container || !imageEl) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      imageEl.style.transform = 'none';
      return;
    }

    let ticking = false;

    const applyTransform = () => {
      ticking = false;
      const top = container.getBoundingClientRect().top;
      // Progress 0 = the image's top edge is just entering at the bottom of
      // the viewport (this is the first moment it becomes visible).
      // Progress 1 = the image's top edge has reached the top of the
      // viewport, so the animation is fully settled exactly as it arrives.
      // Linear, tied 1:1 to scroll: the motion stays visible right up until
      // the image's top actually reaches the screen top, instead of an
      // eased curve that visually finishes early and then sits idle.
      const progress = Math.min(1, Math.max(0, (window.innerHeight - top) / window.innerHeight));

      const range = window.innerWidth < 640 ? MOBILE_RANGE : DESKTOP_RANGE;
      const rotateX = lerp(range.rotateX, 0, progress);
      const translateY = lerp(range.translateY, 0, progress);
      const translateZ = lerp(range.translateZ, 0, progress);
      const scale = lerp(range.scale, 1, progress);

      imageEl.style.transform = `rotateX(${rotateX}deg) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`;
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(applyTransform);
    };

    applyTransform();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <div ref={containerRef} className={join('relative', containerClassName)}>
      <div className="flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
        <div
          ref={imageRef}
          className="w-full max-w-5xl will-change-transform transform-gpu transform-3d"
          style={{
            transform: `rotateX(${DESKTOP_RANGE.rotateX}deg) translateY(${DESKTOP_RANGE.translateY}px) translateZ(${DESKTOP_RANGE.translateZ}px) scale(${DESKTOP_RANGE.scale})`,
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            sizes={sizes}
            className={join('h-auto w-full', className)}
          />
        </div>
      </div>
    </div>
  );
}
