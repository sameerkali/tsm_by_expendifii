import React, { useState } from 'react';
import {
  Check, X, AlertTriangle, Info, ChevronDown, Search, Loader2,
  Eye, EyeOff, Upload, CheckSquare, Square
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// ─────────────────────────────────────────────────────────────────────────────
// SHARED INPUT CLASS (source of truth — import this in any component)
// ─────────────────────────────────────────────────────────────────────────────
export const inputClass =
  'w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';

/** Text Input */
export function Input({ label, hint, required, error, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string; required?: boolean; error?: string }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">
          {label}{required && <span className="text-emerald-500">*</span>}
          {hint && <span className="font-normal text-slate-400 italic">— {hint}</span>}
        </label>
      )}
      <input {...props} required={required} className={cn(inputClass, error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20', className)} />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

/** Textarea */
export function Textarea({ label, hint, required, error, className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; hint?: string; required?: boolean; error?: string }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">
          {label}{required && <span className="text-emerald-500">*</span>}
          {hint && <span className="font-normal text-slate-400 italic">— {hint}</span>}
        </label>
      )}
      <textarea {...props} required={required} className={cn(inputClass, 'h-auto py-3 resize-none', error && 'border-red-400', className)} />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

/** Select / Dropdown */
export function Select({ label, hint, required, options, value, onChange, className }: {
  label?: string; hint?: string; required?: boolean;
  options: { value: string; label: string }[];
  value: string; onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">
          {label}{required && <span className="text-emerald-500">*</span>}
          {hint && <span className="font-normal text-slate-400 italic">— {hint}</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputClass, 'appearance-none pr-10 cursor-pointer', className)}
        >
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

/** Password Input with show/hide */
export function PasswordInput({ label, hint, required, error, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string; required?: boolean; error?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">
          {label}{required && <span className="text-emerald-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input {...props} type={show ? 'text' : 'password'} required={required} className={cn(inputClass, 'pr-12', error && 'border-red-400', className)} />
        <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

/** Search Input */
export function SearchInput({ placeholder = 'Search...', className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input type="search" placeholder={placeholder} className={cn(inputClass, 'pl-12', className)} {...props} />
    </div>
  );
}

/** Button */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
export function Button({ children, variant = 'primary', loading, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; loading?: boolean }) {
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-slate-900 dark:bg-emerald-600 text-white hover:opacity-90 shadow-lg shadow-emerald-500/20',
    secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700',
    ghost: 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/20',
    outline: 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600',
  };
  return (
    <button {...props} disabled={loading || props.disabled} className={cn('flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-bold text-sm tracking-tight transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed', variants[variant], className)}>
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}

/** Badge */
type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export function Badge({ children, variant = 'default', className }: { children: React.ReactNode; variant?: BadgeVariant; className?: string }) {
  const variants: Record<BadgeVariant, string> = {
    default: 'bg-slate-100 text-slate-600 border-slate-200',
    success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    error: 'bg-red-100 text-red-700 border-red-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
  };
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest', variants[variant], className)}>
      {children}
    </span>
  );
}

/** Alert */
type AlertVariant = 'info' | 'success' | 'warning' | 'error';
export function Alert({ children, variant = 'info', title }: { children: React.ReactNode; variant?: AlertVariant; title?: string }) {
  const map: Record<AlertVariant, { bg: string; border: string; text: string; icon: React.ReactNode }> = {
    info: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-700/40', text: 'text-blue-700 dark:text-blue-300', icon: <Info size={16} /> },
    success: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-700/40', text: 'text-emerald-700 dark:text-emerald-300', icon: <Check size={16} /> },
    warning: { bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-700/40', text: 'text-yellow-700 dark:text-yellow-300', icon: <AlertTriangle size={16} /> },
    error: { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-700/40', text: 'text-red-700 dark:text-red-300', icon: <X size={16} /> },
  };
  const s = map[variant];
  return (
    <div className={cn('p-4 rounded-2xl border flex gap-3', s.bg, s.border, s.text)}>
      <span className="shrink-0 mt-0.5">{s.icon}</span>
      <div>
        {title && <p className="text-sm font-black mb-0.5">{title}</p>}
        <p className="text-xs font-medium leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

/** Card */
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden', className)}>
      {children}
    </div>
  );
}
export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60 flex items-center justify-between gap-4">
      <div>
        <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 mt-1 font-medium">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-8', className)}>{children}</div>;
}

/** Spinner */
export function Spinner({ size = 24, className }: { size?: number; className?: string }) {
  return <Loader2 size={size} className={cn('animate-spin text-emerald-500', className)} />;
}

/** Skeleton Loader */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse', className)} />;
}

/** Toggle / Switch */
export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div className={cn('w-11 h-6 rounded-full transition-all', checked ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700')} />
        <div className={cn('absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200', checked ? 'translate-x-6' : 'translate-x-1')} />
      </div>
      {label && <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</span>}
    </label>
  );
}

/** Checkbox */
export function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer">
      <button type="button" onClick={() => onChange(!checked)} className="text-slate-400 hover:text-emerald-500 transition-colors">
        {checked ? <CheckSquare size={20} className="text-emerald-500" /> : <Square size={20} />}
      </button>
      {label && <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</span>}
    </label>
  );
}

/** Slider */
export function Slider({ label, value, onChange, min = 0, max = 100, step = 1 }: { label?: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number }) {
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">{label}</label>
          <span className="text-xs font-black text-emerald-500">{value}</span>
        </div>
      )}
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full accent-emerald-500 cursor-pointer"
      />
    </div>
  );
}

/** File Upload */
export function FileUpload({ label, accept, hint }: { label?: string; accept?: string; hint?: string }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">{label}</label>}
      <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center gap-3 hover:border-emerald-500 transition-colors cursor-pointer group">
        <div className="h-12 w-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
          <Upload size={24} />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Click to upload</p>
          {hint && <p className="text-xs text-slate-400 mt-0.5">{hint}</p>}
        </div>
        <input type="file" accept={accept} className="sr-only" />
      </div>
    </div>
  );
}

/** Modal / Dialog */
export function Modal({ isOpen, onClose, title, children, footer }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; footer?: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">{title}</h2>
          <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-slate-400">
            <X size={16} />
          </button>
        </div>
        <div className="p-8">{children}</div>
        {footer && <div className="px-8 py-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">{footer}</div>}
      </div>
    </>
  );
}

/** Section Label */
export function SectionLabel({ children }: { children: string }) {
  return <p className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase italic">{children}</p>;
}

/** Page Heading */
export function PageHeading({ label, title, count }: { label: string; title: string; count?: string | number }) {
  return (
    <div className="space-y-1">
      <SectionLabel>{label}</SectionLabel>
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">{title}</h1>
        {count !== undefined && (
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black tracking-widest text-slate-500 uppercase mt-2">
            {count}
          </span>
        )}
      </div>
    </div>
  );
}
