'use client';

import React from 'react';
import { Lock } from 'lucide-react';

interface FieldProps {
  label: string;
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  locked?: boolean;
  hint?: string;
  error?: string;
}

export function Field({
  label,
  children,
  required,
  htmlFor,
  locked,
  hint,
  error,
}: FieldProps) {
  return (
    <div className="space-y-1.5 w-full">
<label htmlFor={htmlFor} className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">        {locked && <Lock size={10} className="text-slate-400" />}
        {label}
        {required && <span className="text-emerald-500">*</span>}
        {hint && <span className="text-slate-400 font-normal">— {hint}</span>}
      </label>
      {children}
      {error && <p className="text-[10px] font-bold text-red-500 mt-1 pl-1">{error}</p>}
    </div>
  );
}
