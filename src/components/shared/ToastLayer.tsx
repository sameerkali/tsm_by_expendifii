'use client';

import { useEffect, useRef } from 'react';
import { TOAST_LAYER_ID } from '@/lib/toast-layer';

/**
 * Hosts the toaster in the top layer (as a manual popover) so toasts stay
 * visible above open modal dialogs. See raiseToastLayer() in lib/toast-layer.
 * In browsers without the Popover API it is a plain wrapper and nothing changes.
 */
export function ToastLayer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    if (!layer || typeof layer.showPopover !== 'function') return;
    layer.showPopover();
    return () => {
      if (layer.matches(':popover-open')) layer.hidePopover();
    };
  }, []);

  return (
    <div ref={ref} id={TOAST_LAYER_ID} popover="manual" className="toast-layer">
      {children}
    </div>
  );
}
