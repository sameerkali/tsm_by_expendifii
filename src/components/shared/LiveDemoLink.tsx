'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { ConfirmDialog } from './ConfirmDialog';

interface LiveDemoLinkProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function LiveDemoLink({ id, className, children }: LiveDemoLinkProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <>
      <button type="button" id={id} className={className} onClick={() => setShowConfirm(true)}>
        {children}
      </button>
      {mounted &&
        createPortal(
          <ConfirmDialog
            isOpen={showConfirm}
            onClose={() => setShowConfirm(false)}
            onConfirm={() => router.push('/live-demo')}
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
