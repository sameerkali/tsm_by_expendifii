'use client';

import React from 'react';
import { Lock } from 'lucide-react';

interface FieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  locked?: boolean;
  hint?: string;
}

export function Field({
  label,
  children,
  required,
  locked,
  hint,
}: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">
        {locked && <Lock size={10} className="text-slate-400" />}
        {label}
        {required && <span className="text-emerald-500">*</span>}
        {hint && <span className="text-slate-400 font-normal">— {hint}</span>}
      </label>
      {children}
    </div>
  );
}
