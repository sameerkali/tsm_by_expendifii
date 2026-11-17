'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { apiErrorMessage, desktopApi } from '@/lib/api/desktop.api';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Mirrors the backend contact validator, so errors show here before sending.
const NAME_RE = /^[a-zA-Z\s\-'.]+$/;

type Fields = { email: string; name: string; companyName: string; phone: string; note: string };
type Errors = Partial<Record<keyof Fields, string>>;

const inputClass = (invalid: boolean) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-500 outline-none transition-colors focus:border-[#0369A1] focus:ring-4 focus:ring-sky-600/15 disabled:opacity-60 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-sky-400 dark:focus:ring-sky-400/20 ${
    invalid ? 'border-red-500 dark:border-red-400' : 'border-slate-300 dark:border-slate-700'
  }`;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.email.trim()) e.email = 'Enter the email address to send your key to.';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Enter a valid email address, like name@company.com.';
  if (!f.name.trim()) e.name = 'Enter your name.';
  else if (!NAME_RE.test(f.name.trim())) e.name = 'Use letters only (spaces, dots and hyphens are fine).';
  if (f.phone && !/^\d{10}$/.test(f.phone)) e.phone = 'Enter a 10-digit mobile number, or leave it empty.';
  return e;
}

export function LicenceKeyRequestForm() {
  const [fields, setFields] = useState<Fields>({ email: '', name: '', companyName: '', phone: '', note: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const successRef = useRef<HTMLHeadingElement>(null);
  const ids = { email: useId(), name: useId(), companyName: useId(), phone: useId(), note: useId() };

  // The download email links here with ?email=..., so prefill it. Read on the
  // client to keep the page static.
  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get('email');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (email) setFields((f) => (f.email ? f : { ...f, email: email.slice(0, 254) }));
  }, []);

  useEffect(() => {
    if (status === 'sent') successRef.current?.focus();
  }, [status]);

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (key === 'phone') value = value.replace(/\D/g, '').slice(0, 10);
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    setFormError(null);
    const firstInvalid = (Object.keys(ids) as (keyof Fields)[]).find((k) => found[k]);
    if (firstInvalid) {
      document.getElementById(ids[firstInvalid])?.focus();
      return;
    }

    setStatus('sending');
    try {
      await desktopApi.requestLicenceKey({
        email: fields.email.trim().toLowerCase(),
        name: fields.name.trim(),
        companyName: fields.companyName.trim(),
        phone: fields.phone,
        note: fields.note.trim(),
      });
      setStatus('sent');
    } catch (err) {
      setStatus('idle');
      setFormError(apiErrorMessage(err, "We couldn't send your request. Please try again in a few minutes."));
    }
  };

  if (status === 'sent') {
    return (
      <div className="text-center" aria-live="polite">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
          <CheckCircle2 size={24} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h2 ref={successRef} tabIndex={-1} className="mt-5 text-xl font-bold tracking-tight text-slate-900 outline-none dark:text-white">
          Request sent
        </h2>
        <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">
          We&apos;ll email your licence key to{' '}
          <span className="font-semibold break-all text-slate-900 dark:text-white">{fields.email.trim()}</span>, usually
          within one business day.
        </p>
        <Link
          href="/desktop"
          className="mt-7 inline-flex rounded-xl px-5 py-3 text-sm font-semibold text-[#0369A1] transition-colors hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-500/10"
        >
          Back to BiltyOne Desktop
        </Link>
      </div>
    );
  }

  const sending = status === 'sending';
  const field = (key: keyof Fields, label: string, input: React.ReactNode, help?: string) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={ids[key]} className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        {label}
      </label>
      {input}
      {help && !errors[key] && <p className="text-xs text-slate-600 dark:text-slate-400">{help}</p>}
      {errors[key] && (
        <p id={`${ids[key]}-error`} className="text-sm font-medium text-red-700 dark:text-red-400">
          {errors[key]}
        </p>
      )}
    </div>
  );
  const a11y = (key: keyof Fields) => ({
    id: ids[key],
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${ids[key]}-error` : undefined,
    disabled: sending,
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {field(
        'email',
        'Email address',
        <input type="email" inputMode="email" autoComplete="email" spellCheck={false} maxLength={254}
          placeholder="name@company.com" value={fields.email} onChange={set('email')}
          className={inputClass(!!errors.email)} {...a11y('email')} />,
        'We send your licence key here.',
      )}
      {field(
        'name',
        'Your name',
        <input type="text" autoComplete="name" maxLength={100} placeholder="e.g. Ravi Kumar"
          value={fields.name} onChange={set('name')} className={inputClass(!!errors.name)} {...a11y('name')} />,
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        {field(
          'companyName',
          'Company name (optional)',
          <input type="text" autoComplete="organization" maxLength={200} placeholder="e.g. Kumar Roadlines"
            value={fields.companyName} onChange={set('companyName')} className={inputClass(false)} {...a11y('companyName')} />,
        )}
        {field(
          'phone',
          'Mobile number (optional)',
          <input type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="10 digits"
            value={fields.phone} onChange={set('phone')} className={inputClass(!!errors.phone)} {...a11y('phone')} />,
        )}
      </div>
      {field(
        'note',
        'Anything we should know? (optional)',
        <textarea rows={3} maxLength={500} placeholder="For example, how many GRs you create in a month"
          value={fields.note} onChange={set('note')} className={`${inputClass(false)} resize-y`} {...a11y('note')} />,
      )}

      {formError && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-1 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0369A1] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-900/15 transition-colors hover:bg-sky-800 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80 dark:bg-sky-600 dark:hover:bg-sky-500"
      >
        {sending ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Sending request
          </>
        ) : (
          'Request my free key'
        )}
      </button>
    </form>
  );
}

export default LicenceKeyRequestForm;
