'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Download } from 'lucide-react';

// The dialog (form, states, icons) is only needed after a click, so it stays
// out of the page's initial JS. Hover / focus / touch start the download early
// so it is usually ready by the time the click lands.
const DesktopDownloadDialog = dynamic(() => import('./DesktopDownloadDialog'), { ssr: false });
const prefetchDialog = () => {
  void import('./DesktopDownloadDialog');
};

interface DesktopDownloadButtonProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export function DesktopDownloadButton({ className, children, id }: DesktopDownloadButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        id={id}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        onMouseEnter={prefetchDialog}
        onFocus={prefetchDialog}
        onTouchStart={prefetchDialog}
        className={
          className ??
          'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0369A1] px-6 py-3.5 text-sm font-semibold whitespace-nowrap text-white shadow-lg shadow-sky-900/15 transition-colors duration-200 hover:bg-sky-800 active:translate-y-px dark:bg-sky-600 dark:hover:bg-sky-500'
        }
      >
        <Download size={16} strokeWidth={2} aria-hidden="true" />
        {children ?? 'Download for Windows'}
      </button>
      {open && <DesktopDownloadDialog open={open} onClose={() => setOpen(false)} />}
    </>
  );
}

export default DesktopDownloadButton;
