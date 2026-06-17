'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, type RegisterInput } from '@/lib/validations/auth.schema';
import { useAuth } from '@/hooks/useAuth';
import { usePincodeAutofill } from '@/hooks/usePincodeAutofill';
import {
  User, Mail, Lock, Phone, Building, Loader2, ArrowRight, Eye, EyeOff,
  MapPin, Hash, Briefcase, Landmark, ChevronDown, Gift, CheckCircle2,
  AlertCircle, Search, Pencil
} from 'lucide-react';
import Link from 'next/link';

// ─── Locality Combobox ───────────────────────────────────────────────────────

interface LocalityComboboxProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

function LocalityCombobox({ options, value, onChange, disabled, placeholder }: LocalityComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options;

  // Close on outside click
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleSelect = (name: string) => {
    onChange(name);
    setQuery('');
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors pointer-events-none">
          <MapPin size={18} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={open ? query : value}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (!disabled && options.length > 0) setOpen(true); }}
          onClick={() => { if (!disabled && options.length > 0) setOpen(true); }}
          placeholder={disabled ? 'Enter pincode first' : placeholder}
          disabled={disabled}
          autoComplete="off"
          className={`w-full border-b-2 py-3 pl-10 pr-10 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400
            ${disabled
              ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-60'
              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-sky-500 cursor-pointer'
            }`}
        />
        {/* Right icon: search when open, chevron otherwise */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          {open ? <Search size={15} /> : <ChevronDown size={15} />}
        </div>
      </div>

      {/* Dropdown list */}
      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 w-full max-h-52 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
          {filtered.map((name) => (
            <button
              key={name}
              type="button"
              onMouseDown={(e) => e.preventDefault()} // prevent input blur before click
              onClick={() => handleSelect(name)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                ${value === name
                  ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 font-medium'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {open && filtered.length === 0 && query && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg px-4 py-3 text-sm text-slate-400">
          No results for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}

// ─── Address Block ────────────────────────────────────────────────────────────

interface AddressBlockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: any;
}

function AddressBlock({ register, errors, setValue, watch }: AddressBlockProps) {
  const pincode = watch('company.address.pincode') ?? '';
  const cityValue = watch('company.address.city') ?? '';
  const { status, errorMessage, localityOptions, selectLocality, clearAutofill } = usePincodeAutofill(
    pincode,
    (payload) => {
      if (payload.city) setValue('company.address.city', payload.city);
      if (payload.district) setValue('company.address.district', payload.district);
      if (payload.state) setValue('company.address.state', payload.state);
    },
    () => {
      setValue('company.address.city', '');
      setValue('company.address.district', '');
      setValue('company.address.state', '');
    }
  );

  // Manual fallback mode — user or API failure can activate this
  const [manualMode, setManualMode] = useState(false);

  // Allow per-field manual edit of autofilled district/state
  const [districtLocked, setDistrictLocked] = useState(true);
  const [stateLocked, setStateLocked] = useState(true);
  const districtValue = watch('company.address.district') ?? '';
  const stateValue = watch('company.address.state') ?? '';

  // Auto-activate manual mode on persistent API error, re-lock when API succeeds
  useEffect(() => {
    if (status === 'idle') {
      setDistrictLocked(true);
      setStateLocked(true);
    }
    if (status === 'success') {
      setDistrictLocked(true);
      setStateLocked(true);
      setManualMode(false); // return to smart mode if user types a valid pincode
    }
  }, [status]);

  const isAutofilled = status === 'success' && !manualMode;

  const handleEnterManually = () => {
    clearAutofill();
    setManualMode(true);
  };

  const handleBackToAuto = () => {
    setManualMode(false);
    setValue('company.address.city', '');
    setValue('company.address.district', '');
    setValue('company.address.state', '');
  };

  // ── MANUAL MODE ──────────────────────────────────────────────────────────────
  if (manualMode) {
    return (
      <div className="space-y-4 pt-2">
        {/* Manual mode banner */}
        <div className="flex items-center justify-between px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-sm">
          <span className="text-xs text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
            <Pencil size={12} />
            Manual address entry — fill all fields below
          </span>
          <button
            type="button"
            onClick={handleBackToAuto}
            className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-medium transition-colors"
          >
            ← Back to auto-detect
          </button>
        </div>

        {/* Row 1: Pincode + Full Address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors pointer-events-none">
              <MapPin size={18} />
            </div>
            <input
              {...register('company.address.pincode')}
              placeholder="Pincode"
              maxLength={6}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
              }}
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {errors.company?.address?.pincode && (
              <p className="text-xs text-red-500 mt-1">{errors.company.address.pincode.message}</p>
            )}
          </div>

          <div className="relative group md:col-span-2">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
              <MapPin size={18} />
            </div>
            <input
              {...register('company.address.fullAddress')}
              placeholder="House / Street / Landmark"
              maxLength={200}
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {errors.company?.address?.fullAddress && (
              <p className="text-xs text-red-500 mt-1">{errors.company.address.fullAddress.message}</p>
            )}
          </div>
        </div>

        {/* Row 2: City / Locality + District + State (all free-text in manual mode) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors pointer-events-none">
              <MapPin size={18} />
            </div>
            <input
              {...register('company.address.city')}
              placeholder="Locality / Area"
              maxLength={60}
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {errors.company?.address?.city && (
              <p className="text-xs text-red-500 mt-1">{errors.company.address.city.message}</p>
            )}
          </div>

          <div className="relative group">
            <input
              {...register('company.address.district')}
              placeholder="District"
              maxLength={60}
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 px-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {errors.company?.address?.district && (
              <p className="text-xs text-red-500 mt-1">{errors.company.address.district.message}</p>
            )}
          </div>

          <div className="relative group">
            <input
              {...register('company.address.state')}
              placeholder="State"
              maxLength={60}
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 px-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {errors.company?.address?.state && (
              <p className="text-xs text-red-500 mt-1">{errors.company.address.state.message}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── SMART MODE (default) ─────────────────────────────────────────────────────
  return (
    <div className="space-y-4 pt-2">
      {/* Row 1: Pincode + Full Address */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pincode — trigger field */}
        <div className="relative group">
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors pointer-events-none
            ${status === 'error' ? 'text-red-400' : status === 'success' ? 'text-emerald-500' : 'text-slate-400 group-focus-within:text-sky-500'}`}
          >
            <MapPin size={18} />
          </div>
          <input
            {...register('company.address.pincode')}
            placeholder="Pincode *"
            maxLength={6}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
            }}
            className={`w-full bg-slate-50 dark:bg-slate-900 border-b-2 py-3 pl-10 pr-10 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400
              ${status === 'error'
                ? 'border-red-400 focus:border-red-500'
                : status === 'success'
                  ? 'border-emerald-400 focus:border-emerald-500'
                  : 'border-slate-200 dark:border-slate-800 focus:border-sky-500'
              }`}
          />
          {/* Right status indicator */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {status === 'loading' && <Loader2 size={16} className="animate-spin text-sky-500" />}
            {status === 'success' && <CheckCircle2 size={16} className="text-emerald-500" />}
            {status === 'error' && <AlertCircle size={16} className="text-red-400" />}
          </div>
          {/* API error + manual fallback CTA */}
          {status === 'error' && errorMessage && (
            <div className="mt-1 space-y-1">
              <p className="text-xs text-red-500">{errorMessage}</p>
              <button
                type="button"
                onClick={handleEnterManually}
                className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-medium transition-colors"
              >
                Fill manually instead →
              </button>
            </div>
          )}
          {errors.company?.address?.pincode && (
            <p className="text-xs text-red-500 mt-1">{errors.company.address.pincode.message}</p>
          )}
        </div>

        {/* Full Address — spans 2 cols on md */}
        <div className="relative group md:col-span-2">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
            <MapPin size={18} />
          </div>
          <input
            {...register('company.address.fullAddress')}
            placeholder="House / Street / Landmark"
            maxLength={200}
            className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
          />
          {errors.company?.address?.fullAddress && (
            <p className="text-xs text-red-500 mt-1">{errors.company.address.fullAddress.message}</p>
          )}
        </div>
      </div>

      {/* Row 2: Locality (combobox) + District + State */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Locality combobox */}
        <div>
          <LocalityCombobox
            options={localityOptions}
            value={cityValue}
            onChange={(name) => {
              selectLocality(name);
            }}
            disabled={status !== 'success'}
            placeholder="Select Locality / Area"
          />
          {errors.company?.address?.city && (
            <p className="text-xs text-red-500 mt-1">{errors.company.address.city.message}</p>
          )}
          {status === 'success' && localityOptions.length > 1 && !cityValue && (
            <p className="text-xs text-sky-500 mt-1">Select your locality from the dropdown</p>
          )}
          {/* Proactive manual option shown when idle/loading */}
          {(status === 'idle' || status === 'loading') && (
            <button
              type="button"
              onClick={handleEnterManually}
              className="mt-1 text-xs text-slate-400 hover:text-sky-500 transition-colors"
            >
              Skip, enter address manually
            </button>
          )}
        </div>

        {/* District — read-only when autofilled */}
        <div className="relative group">
          {isAutofilled && districtLocked ? (
            <>
              <div className="w-full bg-sky-50 dark:bg-sky-900/20 border-b-2 border-sky-300 dark:border-sky-700 py-3 px-4 text-slate-900 dark:text-sky-100 flex items-center justify-between">
                <span className="text-sm font-medium">{districtValue || 'District'}</span>
                <button
                  type="button"
                  onClick={() => setDistrictLocked(false)}
                  className="text-sky-400 hover:text-sky-600 transition-colors ml-2 flex-shrink-0"
                  title="Edit district manually"
                >
                  <Pencil size={13} />
                </button>
              </div>
              <p className="text-xs text-sky-500 mt-1 flex items-center gap-1">
                <CheckCircle2 size={11} /> Auto-filled
              </p>
            </>
          ) : (
            <input
              {...register('company.address.district')}
              placeholder="District"
              maxLength={60}
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 px-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          )}
          {errors.company?.address?.district && (
            <p className="text-xs text-red-500 mt-1">{errors.company.address.district.message}</p>
          )}
        </div>

        {/* State — read-only when autofilled */}
        <div className="relative group">
          {isAutofilled && stateLocked ? (
            <>
              <div className="w-full bg-sky-50 dark:bg-sky-900/20 border-b-2 border-sky-300 dark:border-sky-700 py-3 px-4 text-slate-900 dark:text-sky-100 flex items-center justify-between">
                <span className="text-sm font-medium">{stateValue || 'State'}</span>
                <button
                  type="button"
                  onClick={() => setStateLocked(false)}
                  className="text-sky-400 hover:text-sky-600 transition-colors ml-2 flex-shrink-0"
                  title="Edit state manually"
                >
                  <Pencil size={13} />
                </button>
              </div>
              <p className="text-xs text-sky-500 mt-1 flex items-center gap-1">
                <CheckCircle2 size={11} /> Auto-filled
              </p>
            </>
          ) : (
            <input
              {...register('company.address.state')}
              placeholder="State"
              maxLength={60}
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 px-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          )}
          {errors.company?.address?.state && (
            <p className="text-xs text-red-500 mt-1">{errors.company.address.state.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}


// ─── Register Form ────────────────────────────────────────────────────────────

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [agreedError, setAgreedError] = useState(false);
  const { register: registerUser, isRegistering } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    if (!agreed) {
      setAgreedError(true);
      return;
    }
    setAgreedError(false);
    const clean = (v?: string) => {
      const t = v?.trim();
      return t ? t : undefined;
    };

    const bankDetails = data.company.bankDetails
      ? {
        bankName: clean(data.company.bankDetails.bankName),
        accountHolder: clean(data.company.bankDetails.accountHolder),
        accountNumber: clean(data.company.bankDetails.accountNumber),
        ifscCode: clean(data.company.bankDetails.ifscCode),
      }
      : undefined;

    const hasBankDetails = bankDetails && Object.values(bankDetails).some(Boolean);

    registerUser({
      ...data,
      referral: clean(data.referral),
      company: {
        ...data.company,
        ...(hasBankDetails ? { bankDetails } : {}),
      },
    });
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
          Less paper. More trucks. Zero leaks.
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Sign up and run your transport business 90% faster
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Personal Info Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b pb-2">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <User size={18} />
              </div>
              <input
                {...register('name')}
                placeholder="Full Name"
                maxLength={60}
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                {...register('email')}
                type="email"
                placeholder="Email"
                maxLength={254}
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <Phone size={18} />
              </div>
              <input
                {...register('phone')}
                placeholder="Phone Number (10 digits)"
                maxLength={10}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
                }}
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                {...register('password')}
                type={showPassword ? "text" : "password"}
                placeholder="Create Password (6-30 chars)"
                maxLength={30}
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-12 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <Gift size={18} />
              </div>
              <input
                {...register('referral')}
                placeholder="Referral Code (Optional)"
                maxLength={7}
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 uppercase"
              />
              {errors.referral && (
                <p className="text-xs text-red-500 mt-1">{errors.referral.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Company Info Section */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b pb-2">Company Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <Building size={18} />
              </div>
              <input
                {...register('company.companyName')}
                placeholder="Company Name"
                maxLength={60}
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.company?.companyName && (
                <p className="text-xs text-red-500 mt-1">{errors.company.companyName.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <Hash size={18} />
              </div>
              <input
                {...register('company.gstin')}
                placeholder="GSTIN (e.g. 22AAAAA0000A1Z5)"
                maxLength={15}
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 uppercase"
              />
              {errors.company?.gstin && (
                <p className="text-xs text-red-500 mt-1">{errors.company.gstin.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <Hash size={18} />
              </div>
              <input
                {...register('company.pan')}
                placeholder="PAN (e.g. ABCDE1234F)"
                maxLength={10}
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 uppercase"
              />
              {errors.company?.pan && (
                <p className="text-xs text-red-500 mt-1">{errors.company.pan.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <Briefcase size={18} />
              </div>
              <input
                {...register('company.contactPerson')}
                placeholder="Contact Person"
                maxLength={60}
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.company?.contactPerson && (
                <p className="text-xs text-red-500 mt-1">{errors.company.contactPerson.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <Phone size={18} />
              </div>
              <input
                {...register('company.phone')}
                placeholder="Company Phone (10 digits)"
                maxLength={10}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
                }}
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.company?.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.company.phone.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                {...register('company.email')}
                type="email"
                placeholder="Company Email"
                maxLength={254}
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.company?.email && (
                <p className="text-xs text-red-500 mt-1">{errors.company.email.message}</p>
              )}
            </div>
          </div>

          {/* Address Block — Pincode-first smart autofill */}
          <AddressBlock register={register} errors={errors} setValue={setValue} watch={watch} />
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b pb-2">Bank Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <Landmark size={18} />
              </div>
              <input
                {...register('company.bankDetails.bankName')}
                placeholder="Bank Name"
                maxLength={80}
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.company?.bankDetails?.bankName && (
                <p className="text-xs text-red-500 mt-1">{errors.company.bankDetails.bankName.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <User size={18} />
              </div>
              <input
                {...register('company.bankDetails.accountHolder')}
                placeholder="Account Holder"
                maxLength={80}
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.company?.bankDetails?.accountHolder && (
                <p className="text-xs text-red-500 mt-1">{errors.company.bankDetails.accountHolder.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <Hash size={18} />
              </div>
              <input
                {...register('company.bankDetails.accountNumber')}
                placeholder="Account Number (9-18 digits)"
                maxLength={18}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
                }}
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.company?.bankDetails?.accountNumber && (
                <p className="text-xs text-red-500 mt-1">{errors.company.bankDetails.accountNumber.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <Hash size={18} />
              </div>
              <input
                {...register('company.bankDetails.ifscCode')}
                placeholder="IFSC Code (e.g. SBIN0001234)"
                maxLength={11}
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all uppercase text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.company?.bankDetails?.ifscCode && (
                <p className="text-xs text-red-500 mt-1">{errors.company.bankDetails.ifscCode.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Terms & Conditions Agreement */}
        <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                if (e.target.checked) setAgreedError(false);
              }}
              className="mt-0.5 h-5 w-5 rounded border-slate-300 text-sky-500 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900"
            />
            <span className="text-sm text-slate-500 dark:text-slate-400 leading-tight">
              I agree to the{' '}
              <Link
                href="/user-agreement"
                target="_blank"
                className="font-semibold text-slate-800 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 underline decoration-dotted transition-colors"
              >
                User Agreement
              </Link>
              ,{' '}
              <Link
                href="/terms-and-conditions"
                target="_blank"
                className="font-semibold text-slate-800 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 underline decoration-dotted transition-colors"
              >
                Terms &amp; Conditions
              </Link>
              , and{' '}
              <Link
                href="/privacy-policy"
                target="_blank"
                className="font-semibold text-slate-800 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 underline decoration-dotted transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {agreedError && (
            <p className="text-xs text-red-500 animate-in fade-in duration-200">
              You must agree to the terms, conditions, and user agreement before signing up.
            </p>
          )}
        </div>


        <div className="pt-6">
          <button
            type="submit"
            disabled={isRegistering || !agreed}
            suppressHydrationWarning
            className="w-full group relative overflow-hidden bg-sky-700 dark:bg-sky-600 text-white py-4 font-bold transition-all hover:bg-sky-800 dark:hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              {isRegistering ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </button>
        </div>
      </form>

      <div className="text-center text-sm text-slate-500 pb-8">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-bold text-slate-900 dark:text-sky-400 hover:underline underline-offset-4"
        >
          Sign in here
        </Link>
      </div>
    </div>
  );
}
