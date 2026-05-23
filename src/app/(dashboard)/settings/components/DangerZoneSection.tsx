'use client';

import React from 'react';
import { LogoutModal as ConfirmModal } from '@/components/layout/LogoutModal';

interface DangerZoneSectionProps {
  showDeleteConfirm: boolean;
  setShowDeleteConfirm: (show: boolean) => void;
  onSubmitDeletionRequest: () => void;
  isSubmittingDeletion?: boolean;
}

export function DangerZoneSection({
  showDeleteConfirm,
  setShowDeleteConfirm,
  onSubmitDeletionRequest,
  isSubmittingDeletion,
}: DangerZoneSectionProps) {
  return (
    <>
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={onSubmitDeletionRequest}
        isLoading={isSubmittingDeletion}
        title="Delete Account"
        description="Final warning 😭 Once approved, your account and all company data will be permanently deleted."
        confirmText="Yes, Delete Everything"
        cancelText="Cancel"
      />

      <section className="py-6 px-3">
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          Account delete karoge toh pura data permanently udh jayega 💀 No undo,
          no Ctrl+Z, no “bhai recover kar do” later.{' '}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-600 underline underline-offset-4 font-semibold hover:text-red-700 transition"
          >
            Delete Account
          </button>
        </p>
      </section>
    </>
  );
}