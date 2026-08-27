'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface ScrollImageProps {
  src: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  /** Optional decorative content (e.g. a glow) rendered behind the image, pinned in the same viewport-height layer. */
  children?: React.ReactNode;
}

/**
 * Desktop-tuned tilt/depth/scale range the image animates through as the
 * section scrolls past. Reduced on small screens so the effect stays subtle
 * on phones instead of looking exaggerated.
 */
const DESKTOP_RANGE = { rotateX: 18, translateY: 60, translateZ: -140, scale: 0.92 };
const MOBILE_RANGE = { rotateX: 8, translateY: 28, translateZ: -60, scale: 0.95 };

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

export function ScrollImage({
  src,
  alt = '',
  className,
  containerClassName,
  width = 1536,
  height = 1024,
  priority,
  sizes,
  children,
}: ScrollImageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageEl = imageRef.current;
    if (!section || !imageEl) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      imageEl.style.transform = 'none';
      return;
    }

    let ticking = false;

    const applyTransform = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));

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
    <div ref={sectionRef} className={cn('relative h-[140vh] sm:h-[160vh]', containerClassName)}>
      <div
        className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        {children}
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
            className={cn('h-auto w-full', className)}
          />
        </div>
      </div>
    </div>
  );
}
