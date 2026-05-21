import React from 'react';
import { LogOut } from 'lucide-react';
import { Modal, Button } from '@/components/ui';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sign Out"
      footer={
        <div className="flex w-full gap-3">
          <Button 
            variant="danger" 
            onClick={onConfirm} 
            className="flex-1 bg-red-500 hover:bg-red-600 shadow-none border border-red-600/20 text-white"
          >
            Yes, log me out
          </Button>
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      }
    >
      <div className="py-2 text-center">
        
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Leaving so soon?</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Okay peace out. Log back in when you want your dashboard to acknowledge your existence again.
        </p>
      </div>
    </Modal>
  );
}
