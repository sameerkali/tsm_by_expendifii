export const OPEN_ACTIVATION_MODAL_EVENT = 'open-activation-modal';

export function openActivationModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(OPEN_ACTIVATION_MODAL_EVENT));
  }
}
