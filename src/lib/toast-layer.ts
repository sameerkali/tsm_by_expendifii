/**
 * Sonner renders toasts in <body>. A modal <dialog> sits in the browser's top
 * layer, above everything in <body>, so a toast fired while one is open (a
 * failed save in the GR panel, say) would be hidden behind it. <ToastLayer>
 * puts the toasts in the top layer too, and this moves them back above the
 * dialog that just opened.
 */
export const TOAST_LAYER_ID = 'toast-layer';

export function raiseToastLayer() {
  const layer = document.getElementById(TOAST_LAYER_ID);
  if (!layer || typeof layer.showPopover !== 'function') return;
  if (!layer.matches(':popover-open')) return;
  // Re-showing a popover puts it at the top of the top-layer stack.
  layer.hidePopover();
  layer.showPopover();
}
