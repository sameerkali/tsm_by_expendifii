'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Edit2, Trash2, Loader2, Copy, Check
} from 'lucide-react';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/errors';
import { useCustomer, useDeleteCustomer } from '@/hooks/useCustomers';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { CustomerFormPanel } from '@/components/customers/CustomerFormPanel';
import { DEMO_READ_ONLY_MESSAGE, isGuestModeClient } from '@/lib/demo/guest';

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const isGuest = isGuestModeClient();

  const { data: response, isLoading, isError, error } = useCustomer(id);
  const deleteMutation = useDeleteCustomer();

  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [copiedGstin, setCopiedGstin] = useState(false);

  const customer = response?.data;

  const handleDelete = () => {
    if (isGuest) {
      toast.info(DEMO_READ_ONLY_MESSAGE);
      return;
    }
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        router.push('/customers');
      }
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getPricingBadgeColor = (type: string) => {
    switch (type) {
      case 'KM':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50';
      case 'BOX':
        return 'bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-950/20 dark:text-sky-400 dark:border-sky-900/50';
      case 'KG':
        return 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50';
      case 'QUINTAL':
        return 'bg-cyan-50 text-cyan-700 border border-cyan-200 dark:bg-cyan-950/20 dark:text-cyan-400 dark:border-cyan-900/50';
      case 'TON':
        return 'bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/50';
      default:
        return 'bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-950/20 dark:text-slate-400 dark:border-slate-900/50';
    }
  };

  const handleCopyGstin = (gstin: string) => {
    navigator.clipboard.writeText(gstin);
    setCopiedGstin(true);
    toast.success('GSTIN copied to clipboard');
    setTimeout(() => setCopiedGstin(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-sky-500" />
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest animate-pulse">Loading Customer...</span>
      </div>
    );
  }

  if (isError || !customer) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <span className="text-lg font-bold text-slate-800 dark:text-slate-200">Customer Not Found</span>
        <span className="text-sm text-slate-500">{getApiErrorMessage(error, 'Customer not found.', 'customer')}</span>
        <button onClick={() => router.push('/customers')} className="mt-4 flex items-center gap-2 text-sm font-bold text-sky-500 hover:text-sky-600 cursor-pointer">
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

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top bar: Back Link and Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <button 
              onClick={() => router.push('/customers')}
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to Customers
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => isGuest ? toast.info(DEMO_READ_ONLY_MESSAGE) : setIsEditPanelOpen(true)}
              className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Edit2 size={14} /> Edit
            </button>
            <button 
              onClick={() => isGuest ? toast.info(DEMO_READ_ONLY_MESSAGE) : setIsDeleteDialogOpen(true)}
              className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/10 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-900/30 font-semibold text-sm transition-all cursor-pointer"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>

        {/* Profile Header */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {customer.name}
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50">
              Active
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Member since {formatDate(customer.createdAt)}
          </p>
        </div>

        {/* Info Grid (No icons, typography-driven, minimal) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12 pt-4">
          
          {/* Column 1: Contact Details */}
          <div className="space-y-6">
            <h2 className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase border-b border-slate-100 dark:border-slate-800 pb-2">
              Contact Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Phone Number</span>
                <a 
                  href={`tel:${customer.phone}`}
                  className="mt-1 block text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  {customer.phone}
                </a>
              </div>
              
              {customer.email && (
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Email Address</span>
                  <a 
                    href={`mailto:${customer.email}`}
                    className="mt-1 block text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 transition-colors truncate"
                  >
                    {customer.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Business & Pricing Configurations */}
          <div className="space-y-6">
            <h2 className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase border-b border-slate-100 dark:border-slate-800 pb-2">
              Business Profile
            </h2>
            
            <div className="space-y-4">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">GSTIN</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-bold tracking-wide text-slate-800 dark:text-slate-200">
                    {customer.gstin || 'Not Provided'}
                  </span>
                  {customer.gstin && (
                    <button
                      onClick={() => handleCopyGstin(customer.gstin!)}
                      className="inline-flex items-center justify-center p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                      title="Copy GSTIN"
                    >
                      {copiedGstin ? (
                        <Check size={14} className="text-emerald-500" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Pricing Unit</span>
                  <div className="mt-1">
                    {customer.pricingType ? (
                      <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold ${getPricingBadgeColor(customer.pricingType)}`}>
                        Per {customer.pricingType}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 dark:text-slate-500">Not Set</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Default Rate</span>
                  <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {customer.defaultRate ? `₹${customer.defaultRate}` : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Location Details */}
          <div className="space-y-6">
            <h2 className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase border-b border-slate-100 dark:border-slate-800 pb-2">
              Billing Address
            </h2>
            
            <div className="space-y-4">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Street Address</span>
                <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                  {customer.address || 'Not Provided'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">City / State</span>
                  <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                    {[customer.city, customer.state].filter(Boolean).join(', ') || 'N/A'}
                  </p>
                </div>

                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Pincode</span>
                  <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                    {customer.pincode || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
