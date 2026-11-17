'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { trackEvent } from '@/lib/analytics';
import { useRouter } from 'next/navigation';

// The confirm dialog (with its icon set and class-merging helper) is only
// needed once someone clicks a Live Demo link, so it is split out of the
// initial bundle instead of being downloaded before the page can paint.
const ConfirmDialog = dynamic(() => import('./ConfirmDialog').then((m) => m.ConfirmDialog), {
  ssr: false,
});

// Warms the same chunk ahead of the click, so the dialog still opens instantly.
const prefetchConfirmDialog = () => {
  void import('./ConfirmDialog');
};

interface LiveDemoLinkProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
}

export function LiveDemoLink({ id, className, children, onMouseEnter }: LiveDemoLinkProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // Fetch the dialog once the browser is idle after load, well off the
    // critical path but before anyone is likely to click.
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(prefetchConfirmDialog, { timeout: 4000 });
      return () => window.cancelIdleCallback(handle);
    }
    const timer = window.setTimeout(prefetchConfirmDialog, 2000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <button
        type="button"
        id={id}
        className={className}
        onClick={() => setShowConfirm(true)}
        onMouseEnter={(e) => {
          prefetchConfirmDialog();
          onMouseEnter?.(e);
        }}
        onFocus={prefetchConfirmDialog}
        onTouchStart={prefetchConfirmDialog}
      >
        {children}
      </button>
      {mounted &&
        showConfirm &&
        createPortal(
          <ConfirmDialog
            isOpen={showConfirm}
            onClose={() => setShowConfirm(false)}
            onConfirm={() => {
              trackEvent('live_demo_start', { page_path: window.location.pathname });
              router.push('/live-demo');
            }}
            title="Start the live demo?"
            message="You'll enter BiltyOne's dashboard with sample data. No account or signup needed."
            confirmLabel="Yes, take me in"
            cancelLabel="Not now"
          />,
          document.body,
        )}
    </>
  );
}
