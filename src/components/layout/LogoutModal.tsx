import { Modal, Button } from '@/components/ui';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = "Sign Out",
  description = "Okay peace out. Log back in when you want your dashboard to acknowledge your existence again.",
  confirmText = "Yes, log me out",
  cancelText = "Cancel"
}: LogoutModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <div className="flex w-full gap-3">
          <Button 
            variant="danger" 
            onClick={onConfirm} 
            loading={isLoading}
            disabled={isLoading}
            className="flex-1 bg-red-500 hover:bg-red-600 shadow-none border border-red-600/20 text-white"
          >
            {confirmText}
          </Button>
          <Button 
            variant="secondary" 
            onClick={onClose} 
            disabled={isLoading}
            className="flex-1"
          >
            {cancelText}
          </Button>
        </div>
      }
    >
      <div className="py-2 text-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Leaving so soon?</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </Modal>
  );
}

