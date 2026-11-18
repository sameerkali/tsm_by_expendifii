import { useEffect, useLayoutEffect, useRef } from 'react';
import { raiseToastLayer } from '@/lib/toast-layer';

/**
 * How the user can close the dialog without pressing one of its buttons.
 * Matches the <dialog closedby> values:
 *  - 'any': Esc, the back gesture, or a click on the backdrop
 *  - 'closerequest': Esc or the back gesture only
 *  - 'none': only the dialog's own buttons
 */
export type DialogDismiss = 'any' | 'closerequest' | 'none';

function supportsClosedBy() {
  return 'closedBy' in HTMLDialogElement.prototype;
}

/**
 * Drives a native <dialog> as a modal from React state. Render the <dialog>
 * unconditionally with `ref={dialogRef}` and `closedby={dismiss}`, and keep
 * `open` in React state as before.
 *
 * The browser then provides what each modal used to hand-roll: the page
 * behind becomes inert, focus stays inside, Esc closes it, it sits in the top
 * layer (no z-index), and focus returns to the opener on close. Initial focus
 * goes to the first element marked `data-autofocus`, else the first
 * focusable element.
 *
 * `onDismiss` runs when the user dismisses it (Esc, backdrop click). The
 * parent then sets `open` to false, the same as with a Close button.
 */
export function useModalDialog(open: boolean, onDismiss: () => void, dismiss: DialogDismiss = 'any') {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const latest = useRef({ open, onDismiss, dismiss });
  const dismissing = useRef(false);

  useLayoutEffect(() => {
    latest.current = { open, onDismiss, dismiss };
  });

  // Open and close before paint, so a closing dialog never shows a frame
  // with its content already gone.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus();
      raiseToastLayer();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Unmounted while open (e.g. `{show && <ConfirmDialog isOpen />}`): close
  // it first, so focus goes back to the opener instead of <body>.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      latest.current.open = false;
      if (dialog?.open) dialog.close();
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Esc fires `cancel` and then `close` (unless cancel was cancelable), so
    // one gesture can reach both handlers; only report it once.
    const requestDismiss = () => {
      if (dismissing.current) return;
      dismissing.current = true;
      setTimeout(() => {
        dismissing.current = false;
      }, 0);
      latest.current.onDismiss();
    };

    // Esc, the back gesture, and (with closedby="any") a backdrop click.
    // React state decides whether it actually closes.
    const handleCancel = (event: Event) => {
      event.preventDefault();
      if (latest.current.dismiss !== 'none') requestDismiss();
    };

    // The browser can close a dialog even after preventDefault() (repeated
    // Esc presses without other interaction). Keep React state in step.
    const handleClose = () => {
      // `close` is dispatched asynchronously: ignore it if React closed the
      // dialog itself, or it has been reopened since.
      if (!latest.current.open || dialog.open) return;
      if (latest.current.dismiss === 'none') dialog.showModal();
      else requestDismiss();
    };

    // closedby="any" isn't in Safari yet: detect backdrop clicks by hand.
    // Backdrop clicks target the <dialog> itself, outside its box.
    const handleClick = (event: MouseEvent) => {
      if (supportsClosedBy() || latest.current.dismiss !== 'any' || event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      const outside =
        event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
      if (outside) requestDismiss();
    };

    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('close', handleClose);
    dialog.addEventListener('click', handleClick);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('click', handleClick);
    };
  }, []);

  return dialogRef;
}
