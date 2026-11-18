import { useEffect, useRef, type RefObject } from 'react';

/**
 * Closes an inline dropdown (a list rendered under its input) once the user
 * is done with it: a click or tap outside, Esc, or Tab moving focus out.
 *
 * Esc is consumed so it closes only the dropdown, not a modal <dialog> the
 * dropdown sits in (the GR and customer panels are dialogs).
 *
 * These lists stay inline rather than using the Popover API: a popover sits
 * in the top layer and would need CSS anchor positioning to stay under its
 * input, which isn't in every browser yet.
 */
export function useDismissOnOutside(
  containerRef: RefObject<HTMLElement | null>,
  open: boolean,
  onDismiss: () => void,
) {
  const latest = useRef(onDismiss);
  useEffect(() => {
    latest.current = onDismiss;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!open || !container) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!container.contains(event.target as Node)) latest.current();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      latest.current();
    };
    const handleFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      // null: focus went nowhere (e.g. the window lost focus), keep it open.
      if (next && !container.contains(next)) latest.current();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('keydown', handleKeyDown);
    container.addEventListener('focusout', handleFocusOut);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('focusout', handleFocusOut);
    };
  }, [containerRef, open]);
}
