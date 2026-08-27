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
}

/**
 * Desktop-tuned tilt/depth/scale range the image animates through as it
 * scrolls up through the viewport. Reduced on small screens so the effect
 * stays subtle on phones instead of looking exaggerated.
 */
const DESKTOP_RANGE = { rotateX: 16, translateY: 36, translateZ: -90, scale: 0.94 };
const MOBILE_RANGE = { rotateX: 7, translateY: 18, translateZ: -40, scale: 0.96 };

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
  sizes,
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
      const rawProgress = Math.min(1, Math.max(0, (window.innerHeight - top) / window.innerHeight));
      // Ease out: move fast early, settle gently into place rather than
      // travelling at a constant rate right up until it stops.
      const progress = 1 - Math.pow(1 - rawProgress, 3);

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
    <div ref={containerRef} className={cn('relative', containerClassName)}>
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
            className={cn('h-auto w-full', className)}
          />
        </div>
      </div>
    </div>
  );
}
