'use client';

import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Download, MoreHorizontal, FileText,
  Truck, MapPin, Calendar, ChevronLeft, ChevronRight, Copy, Pencil
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { GRFormPanel, type GRFormData } from '@/components/gr/GRFormPanel';

const GR_DATA: (GRFormData & { grNumber: string })[] = [
  { grNumber: 'GR-0001', bookingDate: '2026-04-12', fromCity: 'Mumbai', toCity: 'Delhi', consignor: 'Stark Industries', consignee: 'Avengers HQ', productDescription: 'Electronic Equipment', hsnCode: '8471', weight: '5400', pricingType: 'by_weight', rate: '12', freightAmount: '64800.00', vehicleNumber: 'MH04 AB 1234', driverName: 'Raju Singh', driverMobile: '9876543210', paymentStatus: 'to_pay', status: 'in_transit' },
  { grNumber: 'GR-0002', bookingDate: '2026-04-11', fromCity: 'Bangalore', toCity: 'Kolkata', consignor: 'Wayne Enterprises', consignee: 'Batcave', productDescription: 'Industrial Parts', hsnCode: '7326', weight: '1200', pricingType: 'by_weight', rate: '15', freightAmount: '18000.00', vehicleNumber: 'KA03 CD 5678', driverName: 'Sanjay Kumar', driverMobile: '9988776655', paymentStatus: 'paid', status: 'delivered' },
  { grNumber: 'GR-0003', bookingDate: '2026-04-11', fromCity: 'Pune', toCity: 'Chennai', consignor: 'Oscorp', consignee: 'E-Corp', productDescription: 'Chemical Supplies', hsnCode: '2901', weight: '2800', pricingType: 'by_weight', rate: '18', freightAmount: '50400.00', vehicleNumber: 'MH12 EF 9012', driverName: 'Vijay Patil', driverMobile: '9876512345', paymentStatus: 'to_be_billed', status: 'booked' },
  { grNumber: 'GR-0004', bookingDate: '2026-04-10', fromCity: 'Ahmedabad', toCity: 'Jaipur', consignor: 'Acme Corp', consignee: 'Road Runner Inc', productDescription: 'Machinery', hsnCode: '8428', weight: '850', pricingType: 'by_weight', rate: '10', freightAmount: '8500.00', vehicleNumber: 'GJ01 GH 3456', driverName: 'Ramesh Patel', driverMobile: '9765432100', paymentStatus: 'paid', status: 'delivered' },
  { grNumber: 'GR-0005', bookingDate: '2026-04-09', fromCity: 'Gurgaon', toCity: 'Hyderabad', consignor: 'Cyberdyne Systems', consignee: 'Resistance HQ', productDescription: 'Heavy Equipment', hsnCode: '8479', weight: '12400', pricingType: 'by_weight', rate: '20', freightAmount: '248000.00', vehicleNumber: 'HR26 IJ 7890', driverName: 'Abdul Khan', driverMobile: '9812345678', paymentStatus: 'to_pay', status: 'in_transit' },
];

const STATUS_MAP = {
  in_transit: { label: 'In Transit', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  delivered: { label: 'Delivered', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  booked: { label: 'Booked', className: 'bg-slate-100 text-slate-600 border-slate-200' },
};

const PAYMENT_MAP = {
  to_pay: 'To Pay',
  paid: 'Paid',
  to_be_billed: 'To Be Billed',
};

export default function GRListPage() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [editData, setEditData] = useState<(GRFormData & { grNumber: string }) | null>(null);

  const openNew = () => { setEditData(null); setPanelOpen(true); };
  const openEdit = (row: GRFormData & { grNumber: string }) => { setEditData(row); setPanelOpen(true); };
  const openDuplicate = (row: GRFormData & { grNumber: string }) => {
    setEditData({ ...row, grNumber: undefined as any });
    setPanelOpen(true);
  };

  return (
    <>
      <GRFormPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} editData={editData} />

      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs font-black tracking-[0.3em] text-emerald-500 uppercase italic">FREIGHT MANAGEMENT</p>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">Goods Receipts</h1>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black tracking-widest text-slate-500 uppercase mt-2">
                5 RECORDS
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="h-12 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 font-bold text-sm hover:border-emerald-500 transition-all flex items-center gap-2">
              <Download size={18} />Export
            </button>
            <button 
              onClick={openNew}
              className="flex items-center gap-2 px-6 h-12 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl font-bold tracking-tight hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              <Plus size={18} />New Receipt
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by GR number, customer name, or vehicle number..." className="w-full h-12 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl pl-12 pr-4 text-sm outline-none focus:border-emerald-500 transition-all font-medium" />
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
            <button className="h-12 px-4 flex-1 lg:flex-none border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <Filter size={16} />Status
            </button>
            <button className="h-12 px-4 flex-1 lg:flex-none border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <Calendar size={16} />Date
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800/50 h-16 text-left">
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">GR Details</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Consignor → Consignee</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Route</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Freight</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {GR_DATA.map((row) => {
                  const status = STATUS_MAP[row.status];
                  return (
                    <tr key={row.grNumber} className="group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shrink-0">
                            <FileText size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight italic">{row.grNumber}</p>
                            <p className="text-xs text-slate-400 font-medium mt-0.5">{row.bookingDate}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{row.consignor}</p>
                        <p className="text-xs text-slate-400 mt-0.5">→ {row.consignee}</p>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-bold text-slate-700 dark:text-slate-300">{row.fromCity}</span>
                          <MapPin size={10} className="text-emerald-500" />
                          <span className="font-bold text-slate-500">{row.toCity}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{row.vehicleNumber || '—'}</p>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-sm font-black text-slate-900 dark:text-white">₹ {parseFloat(row.freightAmount).toLocaleString('en-IN')}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{row.weight} kg × ₹{row.rate}</p>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{PAYMENT_MAP[row.paymentStatus]}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className={cn("inline-flex items-center px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest", status.className)}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openDuplicate(row)} title="Duplicate" className="h-9 w-9 inline-flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-slate-400 hover:text-slate-900 dark:hover:text-white">
                            <Copy size={16} />
                          </button>
                          <button onClick={() => openEdit(row)} title="Edit" className="h-9 w-9 inline-flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-slate-400 hover:text-emerald-500">
                            <Pencil size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="h-20 border-t border-slate-50 dark:border-slate-800/50 px-8 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400">Showing <span className="text-slate-900 dark:text-white font-black">1-5</span> of 5</p>
            <div className="flex items-center gap-2">
              <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 text-slate-400 opacity-50 cursor-not-allowed"><ChevronLeft size={18} /></button>
              <button className="h-10 px-4 bg-emerald-500 text-white rounded-xl font-bold text-xs tracking-widest shadow-lg shadow-emerald-500/20">1</button>
              <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 opacity-50 cursor-not-allowed"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
