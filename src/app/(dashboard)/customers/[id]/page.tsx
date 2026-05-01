'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Edit2, Trash2, User as UserIcon, MapPin, Phone, Mail, Building, FileText, Loader2
} from 'lucide-react';
import { useCustomer, useDeleteCustomer } from '@/hooks/useCustomers';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { CustomerFormPanel } from '@/components/customers/CustomerFormPanel';

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const { data: response, isLoading, isError, error } = useCustomer(id);
  const deleteMutation = useDeleteCustomer();

  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const customer = response?.data;

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        router.push('/customers');
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading Customer...</span>
      </div>
    );
  }

  if (isError || !customer) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <span className="text-lg font-bold text-slate-800 dark:text-slate-200">Customer Not Found</span>
        <span className="text-sm text-slate-500">{(error as any)?.message}</span>
        <button onClick={() => router.push('/customers')} className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700">
          <ArrowLeft size={16} /> Back to Customers
        </button>
      </div>
    );
  }

  return (
    <>
      <CustomerFormPanel 
        isOpen={isEditPanelOpen} 
        onClose={() => setIsEditPanelOpen(false)} 
        editData={customer}
      />
      
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete ${customer.name}? This action cannot be undone.`}
        confirmLabel="Delete Customer"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />

      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.push('/customers')}
            className="flex items-center gap-2 h-10 px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all font-bold text-sm"
          >
            <ArrowLeft size={18} /> Back to List
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsEditPanelOpen(true)}
              className="flex items-center gap-2 h-10 px-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:border-emerald-500 transition-all"
            >
              <Edit2 size={16} /> Edit
            </button>
            <button 
              onClick={() => setIsDeleteDialogOpen(true)}
              className="flex items-center gap-2 h-10 px-5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 font-bold text-sm hover:bg-red-100 dark:hover:bg-red-500/20 transition-all"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/20 dark:shadow-none">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            
            {/* Avatar / Icon */}
            <div className="h-32 w-32 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center text-emerald-500 shrink-0">
              <UserIcon size={48} strokeWidth={1.5} />
            </div>

            {/* Core Details */}
            <div className="flex-1 space-y-6">
              <div>
                <p className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase italic">CUSTOMER PROFILE</p>
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mt-2">
                  {customer.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm font-bold text-slate-500">
                  <span className="flex items-center gap-1.5"><Phone size={14} className="text-slate-400" /> {customer.phone}</span>
                  {customer.email && <span className="flex items-center gap-1.5"><Mail size={14} className="text-slate-400" /> {customer.email}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                {/* Contact & Business Info */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Business Info</h3>
                  <div className="space-y-4">
                    <InfoRow icon={FileText} label="GSTIN" value={customer.gstin || 'Not Provided'} />
                    <InfoRow icon={Building} label="Pricing Type" value={customer.pricingType ? `Per ${customer.pricingType}` : 'Not Configured'} />
                    <InfoRow icon={Building} label="Default Rate" value={customer.defaultRate ? `₹ ${customer.defaultRate}` : 'Not Configured'} />
                  </div>
                </div>

                {/* Location Info */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Location Info</h3>
                  <div className="space-y-4">
                    <InfoRow icon={MapPin} label="Address" value={customer.address || 'Not Provided'} />
                    <InfoRow icon={MapPin} label="City & State" value={[customer.city, customer.state].filter(Boolean).join(', ') || 'Not Provided'} />
                    <InfoRow icon={MapPin} label="Pincode" value={customer.pincode || 'Not Provided'} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-slate-400">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500">{label}</p>
        <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{value}</p>
      </div>
    </div>
  );
}