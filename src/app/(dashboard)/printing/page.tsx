'use client';

import React, { useState } from 'react';
import { Search, Filter, Printer, Calendar, ChevronDown, FileText, MapPin, Truck, CheckSquare, Square } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const GR_DATA = [
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

// The printable GR template (hidden from screen view, shown only on print)
function PrintableGRDoc({ gr }: { gr: typeof GR_DATA[0] }) {
  return (
    <div className="print-document hidden print:block page-break-after border border-gray-300 p-8 mb-8 font-sans text-sm" style={{ fontFamily: 'Arial, sans-serif', color: '#111' }}>
      {/* Company Header */}
      <div className="flex items-start justify-between border-b-2 border-gray-800 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Expendifii Transport Ltd.</h1>
          <p className="text-xs text-gray-500 mt-1">404, Terminal Tower, Andheri East, Mumbai, MH 400069</p>
          <p className="text-xs text-gray-500">GSTIN: 27AAIEX1234B1ZX | Ph: +91 98765 43210</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-gray-800 italic">{gr.grNumber}</div>
          <p className="text-xs text-gray-500 mt-1">Date: {gr.bookingDate}</p>
          <div className={cn(
            "inline-block mt-2 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded border",
            STATUS_MAP[gr.status as keyof typeof STATUS_MAP]?.className
          )}>
            {STATUS_MAP[gr.status as keyof typeof STATUS_MAP]?.label}
          </div>
        </div>
      </div>

      {/* Route */}
      <div className="flex items-center gap-6 bg-gray-50 rounded p-4 mb-6 border border-gray-200">
        <div className="text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">From</p>
          <p className="text-lg font-black text-gray-900">{gr.fromCity}</p>
        </div>
        <div className="flex-1 border-t-2 border-dashed border-gray-300 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-2">
            <Truck size={16} className="text-gray-400" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">To</p>
          <p className="text-lg font-black text-gray-900">{gr.toCity}</p>
        </div>
      </div>

      {/* Parties Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <InfoBox label="Consignor (Sender)" value={gr.consignor} />
        <InfoBox label="Consignee (Receiver)" value={gr.consignee} />
      </div>

      {/* Goods Details */}
      <table className="w-full border border-gray-300 mb-6 text-xs">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-3 py-2 text-left font-black text-gray-700 uppercase text-[10px] tracking-widest">Product</th>
            <th className="border border-gray-300 px-3 py-2 text-left font-black text-gray-700 uppercase text-[10px] tracking-widest">HSN</th>
            <th className="border border-gray-300 px-3 py-2 text-left font-black text-gray-700 uppercase text-[10px] tracking-widest">Weight (kg)</th>
            <th className="border border-gray-300 px-3 py-2 text-left font-black text-gray-700 uppercase text-[10px] tracking-widest">Rate (₹)</th>
            <th className="border border-gray-300 px-3 py-2 text-left font-black text-gray-700 uppercase text-[10px] tracking-widest">Freight (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-3 py-3 font-medium">{gr.productDescription}</td>
            <td className="border border-gray-300 px-3 py-3 font-mono">{gr.hsnCode}</td>
            <td className="border border-gray-300 px-3 py-3 font-bold">{gr.weight}</td>
            <td className="border border-gray-300 px-3 py-3 font-bold">₹ {gr.rate}</td>
            <td className="border border-gray-300 px-3 py-3 font-black text-gray-900">₹ {parseFloat(gr.freightAmount).toLocaleString('en-IN')}</td>
          </tr>
        </tbody>
      </table>

      {/* Vehicle & Driver / Payment */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-xs">
        <InfoBox label="Vehicle Number" value={gr.vehicleNumber} />
        <InfoBox label="Driver" value={`${gr.driverName} | ${gr.driverMobile}`} />
        <InfoBox label="Payment Status" value={gr.paymentStatus.replace(/_/g, ' ').toUpperCase()} />
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4 flex justify-between text-[10px] text-gray-400">
        <span>TMS by Expendifii — Printed on {new Date().toLocaleDateString('en-IN')}</span>
        <span>This is a computer-generated document.</span>
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-gray-200 rounded p-3">
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm font-bold text-gray-800">{value || '—'}</p>
    </div>
  );
}

export default function PrintingPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const allSelected = selected.length === GR_DATA.length;

  const filtered = GR_DATA.filter((gr) => {
    const matchSearch = !search || [gr.grNumber, gr.consignor, gr.consignee, gr.vehicleNumber].some(v => v.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === 'all' || gr.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleAll = () => setSelected(allSelected ? [] : GR_DATA.map(gr => gr.grNumber));
  const toggleOne = (grNumber: string) => setSelected(prev => prev.includes(grNumber) ? prev.filter(n => n !== grNumber) : [...prev, grNumber]);
  
  const handlePrint = () => {
    if (selected.length === 0) return;
    window.print();
  };

  const selectedGRs = GR_DATA.filter(gr => selected.includes(gr.grNumber));

  return (
    <>
      {/* Print-hidden content — shown only during window.print() */}
      <div className="print:block hidden">
        {selectedGRs.map(gr => <PrintableGRDoc key={gr.grNumber} gr={gr} />)}
      </div>

      {/* Screen UI — hidden during print */}
      <div className="space-y-10 print:hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs font-black tracking-[0.3em] text-emerald-500 uppercase italic">DOCUMENT CENTER</p>
            <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">Printing</h1>
          </div>
          <div className="flex items-center gap-3">
            {selected.length > 0 && (
              <span className="px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-black tracking-widest">
                {selected.length} selected
              </span>
            )}
            <button
              onClick={handlePrint}
              disabled={selected.length === 0}
              className="flex items-center gap-2 px-6 h-12 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl font-bold tracking-tight hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Printer size={18} />
              Print Selected
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/40 rounded-2xl">
          <p className="text-xs font-bold text-blue-700 dark:text-blue-300">
            <span className="font-black">How to print:</span> Select one or more GR records using the checkboxes → Click "Print Selected" → The browser print dialog opens with A4-formatted GR documents.
          </p>
        </div>

        {/* Filters */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by GR number, customer name, or vehicle..."
              className="w-full h-12 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl pl-12 pr-4 text-sm outline-none focus:border-emerald-500 transition-all font-medium"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="h-12 pr-10 pl-4 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 outline-none focus:border-emerald-500 appearance-none transition-all cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="booked">Booked</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800/50 h-16 text-left">
                  <th className="px-6 w-14">
                    <button onClick={toggleAll} className="text-slate-400 hover:text-emerald-500 transition-colors">
                      {allSelected ? <CheckSquare size={20} className="text-emerald-500" /> : <Square size={20} />}
                    </button>
                  </th>
                  <th className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">GR Details</th>
                  <th className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Consignor → Consignee</th>
                  <th className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Route</th>
                  <th className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehicle</th>
                  <th className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Freight</th>
                  <th className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {filtered.map((row) => {
                  const isSelected = selected.includes(row.grNumber);
                  const status = STATUS_MAP[row.status as keyof typeof STATUS_MAP];
                  return (
                    <tr
                      key={row.grNumber}
                      onClick={() => toggleOne(row.grNumber)}
                      className={cn(
                        "cursor-pointer transition-all",
                        isSelected ? "bg-emerald-50 dark:bg-emerald-500/10" : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                      )}
                    >
                      <td className="px-6 py-5">
                        {isSelected
                          ? <CheckSquare size={20} className="text-emerald-500" />
                          : <Square size={20} className="text-slate-300 dark:text-slate-700" />
                        }
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-3">
                          <div className={cn("h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors", isSelected ? "bg-emerald-500 text-white" : "bg-emerald-500/10 text-emerald-500")}>
                            <FileText size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white uppercase italic">{row.grNumber}</p>
                            <p className="text-xs text-slate-400">{row.bookingDate}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{row.consignor}</p>
                        <p className="text-xs text-slate-400">→ {row.consignee}</p>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{row.fromCity}</span>
                          <MapPin size={10} className="text-emerald-500" />
                          <span className="text-xs font-bold text-slate-500">{row.toCity}</span>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <span className="text-xs font-bold font-mono text-slate-600 dark:text-slate-400">{row.vehicleNumber}</span>
                      </td>
                      <td className="px-4 py-5">
                        <p className="text-sm font-black text-slate-900 dark:text-white">₹ {parseFloat(row.freightAmount).toLocaleString('en-IN')}</p>
                      </td>
                      <td className="px-4 py-5">
                        <span className={cn("inline-flex items-center px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest", status?.className)}>
                          {status?.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="h-16 border-t border-slate-50 dark:border-slate-800/50 px-8 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400">
              {filtered.length} records • {selected.length} selected
            </p>
            {selected.length > 0 && (
              <button onClick={() => setSelected([])} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
                Clear selection
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
