'use client';

import React from 'react';

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
    <section className="py-6  px-3">
      {!showDeleteConfirm ? (
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
      ) : (
        <div className="space-y-3">
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            Final warning 😭 Once approved, your account and all company data
            will be permanently deleted.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onSubmitDeletionRequest}
              disabled={isSubmittingDeletion}
              className="text-red-600 underline underline-offset-4 font-semibold hover:text-red-700 transition disabled:opacity-50"
            >
              {isSubmittingDeletion
                ? 'Submitting...'
                : 'Yes, Delete Everything'}
            </button>

            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="text-slate-500 hover:text-slate-700 text-sm transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}