'use client';

import React from 'react';
import { LogoutModal as ConfirmModal } from '@/components/layout/LogoutModal';
import Link from 'next/link';

interface DangerZoneSectionProps {
  showDeleteConfirm: boolean;
  setShowDeleteConfirm: (show: boolean) => void;
  onSubmitDeletionRequest: () => void;
  isSubmittingDeletion?: boolean;
  deletionRequest?: {
    status: string;
    createdAt?: string;
    requestedAt?: string;
    reason?: string;
  } | null;
}

export function DangerZoneSection({
  showDeleteConfirm,
  setShowDeleteConfirm,
  onSubmitDeletionRequest,
  isSubmittingDeletion,
  deletionRequest,
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

      <section className="py-6 px-3 space-y-2">
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          Account delete karoge toh pura data permanently udh jayega 💀 No undo,
          no Ctrl+Z, no “bhai recover kar do” later.{' '}
          {deletionRequest?.status !== 'PENDING' && deletionRequest?.status !== 'REJECTED' && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-red-600 underline underline-offset-4 font-semibold hover:text-red-700 transition"
            >
              Delete Account
            </button>
          )}
        </p>

        {deletionRequest?.status === 'REJECTED' && (
          <p className="text-xs text-red-500 dark:text-red-400 font-medium flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 dark:bg-red-400 shrink-0 animate-pulse" />
            <span>
              Your account deletion request was rejected by the admin. Please{' '}
              <Link
                href="/contact-us"
                className="font-bold underline hover:text-red-700 dark:hover:text-red-300 transition"
              >
                contact admin
              </Link>{' '}
              for details.
            </span>
          </p>
        )}
      </section>
    </>
  );
}