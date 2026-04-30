'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, type RegisterInput } from '@/lib/validations/auth.schema';
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, Lock, Phone, Building, Loader2, ArrowRight, Eye, EyeOff, MapPin, Hash, Briefcase } from 'lucide-react';
import Link from 'next/link';

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser, isRegistering } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    registerUser(data);
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
          Join the network
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Create your company account to get started
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Personal Info Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b pb-2">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <User size={18} />
              </div>
              <input
                {...register('name')}
                placeholder="Full Name"
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                {...register('email')}
                type="email"
                placeholder="Work Email"
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <Phone size={18} />
              </div>
              <input
                {...register('phone')}
                placeholder="Phone Number"
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                {...register('password')}
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-12 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Company Info Section */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b pb-2">Company Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <Building size={18} />
              </div>
              <input
                {...register('company.companyName')}
                placeholder="Company Name"
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.company?.companyName && (
                <p className="text-xs text-red-500 mt-1">{errors.company.companyName.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <Hash size={18} />
              </div>
              <input
                {...register('company.gstin')}
                placeholder="GSTIN"
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.company?.gstin && (
                <p className="text-xs text-red-500 mt-1">{errors.company.gstin.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <Hash size={18} />
              </div>
              <input
                {...register('company.pan')}
                placeholder="PAN"
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.company?.pan && (
                <p className="text-xs text-red-500 mt-1">{errors.company.pan.message}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <Briefcase size={18} />
              </div>
              <input
                {...register('company.contactPerson')}
                placeholder="Contact Person"
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.company?.contactPerson && (
                <p className="text-xs text-red-500 mt-1">{errors.company.contactPerson.message}</p>
              )}
            </div>
            
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <Phone size={18} />
              </div>
              <input
                {...register('company.phone')}
                placeholder="Company Phone"
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.company?.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.company.phone.message}</p>
              )}
            </div>
            
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                {...register('company.email')}
                type="email"
                placeholder="Company Email"
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.company?.email && (
                <p className="text-xs text-red-500 mt-1">{errors.company.email.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-4 pt-2">
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <MapPin size={18} />
              </div>
              <input
                {...register('company.address.fullAddress')}
                placeholder="Full Address"
                className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {errors.company?.address?.fullAddress && (
                <p className="text-xs text-red-500 mt-1">{errors.company.address.fullAddress.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative group">
                <input
                  {...register('company.address.city')}
                  placeholder="City"
                  className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 px-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                />
                {errors.company?.address?.city && (
                  <p className="text-xs text-red-500 mt-1">{errors.company.address.city.message}</p>
                )}
              </div>
              
              <div className="relative group">
                <input
                  {...register('company.address.district')}
                  placeholder="District"
                  className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 px-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                />
                {errors.company?.address?.district && (
                  <p className="text-xs text-red-500 mt-1">{errors.company.address.district.message}</p>
                )}
              </div>
              
              <div className="relative group">
                <input
                  {...register('company.address.state')}
                  placeholder="State"
                  className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 px-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                />
                {errors.company?.address?.state && (
                  <p className="text-xs text-red-500 mt-1">{errors.company.address.state.message}</p>
                )}
              </div>
              
              <div className="relative group">
                <input
                  {...register('company.address.pincode')}
                  placeholder="Pincode"
                  className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 px-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                />
                {errors.company?.address?.pincode && (
                  <p className="text-xs text-red-500 mt-1">{errors.company.address.pincode.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={isRegistering}
            className="w-full group relative overflow-hidden bg-slate-900 dark:bg-emerald-600 text-white py-4 font-bold transition-all hover:bg-slate-800 dark:hover:bg-emerald-500 disabled:opacity-50"
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
          href="/" 
          className="font-bold text-slate-900 dark:text-emerald-400 hover:underline underline-offset-4"
        >
          Sign in here
        </Link>
      </div>
    </div>
  );
}
