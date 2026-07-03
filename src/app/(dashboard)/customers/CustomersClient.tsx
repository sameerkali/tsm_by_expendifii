'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus, Search, User as UserIcon, Phone, Mail, Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { CustomerFormPanel } from '@/components/customers/CustomerFormPanel';
import { Pagination, type PageSizeOption } from '@/components/shared/Pagination';
import { DEMO_READ_ONLY_MESSAGE, isGuestModeClient } from '@/lib/demo/guest';
import { useCustomers } from '@/hooks/useCustomers';
import { useDebounce } from '@/hooks/useDebounce';

export function CustomersClient() {
  const router = useRouter();
  const isGuest = isGuestModeClient();
  
  // Panel state for creating a new customer
  const [panelOpen, setPanelOpen] = useState(false);
  
  // Search and pagination state
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<PageSizeOption>(10);

  // Fetch customers
  const { data: response, isLoading, isError, error } = useCustomers({
    search: debouncedSearch,
    page,
    limit,
  });

  const customers = response?.data || [];
  const pagination = response?.pagination;

  const openNew = () => {
    setPanelOpen(true);
  };

  const handleLimitChange = (nextLimit: PageSizeOption) => {
    setLimit(nextLimit);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleRowClick = (id: string) => {
    router.push(`/customers/${id}`);
  };

  return (
    <>
      <CustomerFormPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} />

      <div className="space-y-10">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-black tracking-[0.3em] text-sky-600 dark:text-sky-400 uppercase italic">CRM INTEGRITY</p>
              <div className="flex items-center gap-4">
                <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">Customer Registry</h1>
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black tracking-widest text-slate-500 uppercase mt-2">
                  {pagination?.total || 0} ACCOUNTS
                </span>
              </div>
              {isGuest && (
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  Guest preview uses static data. Create, edit, and delete actions are disabled.
                </p>
              )}
            </div>
            <button
              onClick={openNew}
              className="flex items-center gap-2.5 px-7 h-12 bg-sky-700 hover:bg-sky-800 text-white rounded-2xl font-black text-sm tracking-tight transition-all active:scale-95 shadow-lg shadow-sky-500/25"
            >
              <Plus size={20} strokeWidth={2.5} />Add Customer
            </button>
          </div>

          {/* Search */}
          <div className="relative max-w-lg">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or mobile..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full h-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl pl-12 pr-4 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 transition-all font-medium"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800/50 h-16 text-left">
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">GSTIN</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing Type</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Default Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400 gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
                        <span className="text-sm font-medium">Loading customers...</span>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-red-400 gap-3">
                        <span className="text-sm font-medium">
                          Failed to load customers. {error instanceof Error ? error.message : ''}
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : customers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400 gap-3">
                        <UserIcon className="w-8 h-8 opacity-50" />
                        <span className="text-sm font-medium">No customers found.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  customers.map((row) => (
                    <tr 
                      key={row.id} 
                      onClick={() => handleRowClick(row.id)}
                      className="group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-pointer"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-sky-500 transition-colors shrink-0">
                            <UserIcon size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white italic tracking-tight">{row.name}</p>
                            {row.city && (
                                <span className="text-[10px] text-slate-500 font-medium">
                                  {row.city}{row.state ? `, ${row.state}` : ''}
                                </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 space-y-1">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Phone size={12} className="text-sky-500" />
                          <span className="text-xs font-bold">{row.phone}</span>
                        </div>
                        {row.email && (
                            <div className="flex items-center gap-2 text-slate-500">
                              <Mail size={12} className="text-slate-400" />
                              <span className="text-xs font-medium">{row.email}</span>
                            </div>
                        )}
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">{row.gstin || '—'}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{row.pricingType || '—'}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-black text-slate-900 dark:text-white">
                            {row.defaultRate ? `₹ ${row.defaultRate}` : '—'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!isLoading && !isError && pagination && (
            <Pagination
              pagination={pagination}
              page={page}
              limit={limit}
              onPageChange={setPage}
              onLimitChange={handleLimitChange}
              itemLabel="accounts"
            />
          )}
        </div>
      </div>
    </>
  );
}
