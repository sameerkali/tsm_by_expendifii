'use client';

import React from 'react';
import { 
  TrendingUp, 
  Package, 
  Users as UsersIcon, 
  Clock, 
  Plus, 
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

const STATS = [
  { label: 'Total GRs', value: '1,284', change: '+12.5%', icon: Package, color: 'emerald' },
  { label: 'Active Customers', value: '432', change: '+3.2%', icon: UsersIcon, color: 'blue' },
  { label: 'Revenue (MTD)', pressed: '₹ 4.2L', value: '₹ 4.2L', change: '+18.4%', icon: TrendingUp, color: 'emerald' },
  { label: 'Pending Delivery', value: '28', change: '-4.1%', icon: Clock, color: 'amber' },
];

const RECENT_ACTIVITY = [
  { id: '1', type: 'GR_CREATED', title: 'GR #7842 Created', detail: 'Stark Industries • 5,400 kg', date: '2 mins ago' },
  { id: '2', type: 'CUSTOMER_ADDED', title: 'New Customer: Oscorp', detail: 'Norman Osborn added to database', date: '1 hour ago' },
  { id: '3', type: 'DELIVERY_UPDATE', title: 'GR #7839 Delivered', detail: 'Wayne Enterprises • Delhi Terminal', date: '4 hours ago' },
];

export default function OverviewPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-black tracking-[0.3em] text-emerald-500 uppercase italic">OPERATIONAL OVERVIEW</p>
          <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">
            Command Center
          </h1>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-6 h-12 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 rounded-xl font-bold tracking-tight hover:opacity-90 transition-all active:scale-95">
              <Plus size={18} />
              Quick Action
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <div 
            key={i} 
            className="group p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden"
          >
             <div className="relative z-10 flex flex-col justify-between h-full gap-4">
                <div className="flex items-center justify-between">
                   <div className={cn(
                     "h-12 w-12 rounded-2xl flex items-center justify-center",
                     stat.color === 'emerald' ? "bg-emerald-500/10 text-emerald-500" :
                     stat.color === 'blue' ? "bg-blue-500/10 text-blue-500" :
                     "bg-amber-500/10 text-amber-500"
                   )}>
                      <stat.icon size={24} />
                   </div>
                   <div className={cn(
                     "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full",
                     stat.change.startsWith('+') ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                   )}>
                      {stat.change.startsWith('+') ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                      {stat.change}
                   </div>
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-400 tracking-tight">{stat.label}</p>
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1 uppercase tracking-tighter italic">
                     {stat.value}
                   </h3>
                </div>
             </div>
             {/* Decorative BG element */}
             <div className="absolute top-0 right-0 h-24 w-24 -translate-y-1/2 translate-x-1/2 bg-emerald-500/5 blur-3xl rounded-full" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Chart Placeholder */}
        <div className="xl:col-span-2 p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
           <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-white tracking-tight uppercase italic">Tonnage Analytics</h3>
                 <div className="flex gap-2">
                    {['1W', '1M', '3M'].map(t => (
                      <button key={t} className="px-3 py-1 text-[10px] font-black text-slate-400 hover:text-white border border-slate-700 rounded-lg transition-colors">{t}</button>
                    ))}
                 </div>
              </div>
              
              {/* Fake Graph Visual */}
              <div className="h-48 flex items-end gap-2 px-2">
                 {[40, 70, 45, 90, 65, 80, 55, 75, 95, 60, 85, 50].map((h, i) => (
                   <div 
                    key={i} 
                    className="flex-1 bg-emerald-500/20 rounded-t-lg transition-all hover:bg-emerald-500 relative group cursor-pointer"
                    style={{ height: `${h}%` }}
                   >
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-500 text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {h}k kg
                     </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="relative z-10 pt-8 mt-auto border-t border-slate-800 flex items-center justify-between">
              <div className="flex gap-10">
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Growth</p>
                    <p className="text-xl font-bold text-white tracking-tighter">+24.8%</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Efficiency</p>
                    <p className="text-xl font-bold text-white tracking-tighter">94.2%</p>
                 </div>
              </div>
              <button className="text-xs font-black text-emerald-500 hover:text-emerald-400 transition-colors uppercase tracking-[0.2em] italic">Full Report &rarr;</button>
           </div>

           {/* Backdrop Typo */}
           <div className="absolute inset-0 opacity-5 select-none pointer-events-none flex items-center justify-center">
              <span className="text-[20rem] font-black tracking-tighter italic">DATA</span>
           </div>
        </div>

        {/* Recent Activity */}
        <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem]">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">Live Feed</h3>
              <Link href="/logs" className="text-xs font-bold text-slate-400 hover:text-emerald-500 transition-colors tracking-tight">View All</Link>
           </div>

           <div className="space-y-6">
              {RECENT_ACTIVITY.map((item) => (
                <div key={item.id} className="flex gap-4 relative group cursor-pointer">
                   <div className="shrink-0 h-10 w-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-all">
                      <Clock size={16} />
                   </div>
                   <div className="flex-1 pb-6 border-b border-slate-50 dark:border-slate-800/50 group-last:border-none">
                      <div className="flex items-center justify-between">
                         <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">{item.title}</h4>
                         <span className="text-[10px] font-bold text-slate-400">{item.date}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{item.detail}</p>
                   </div>
                </div>
              ))}
           </div>
           
           <button className="w-full h-14 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl font-bold text-sm tracking-tight border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all active:scale-[0.98] mt-4">
              Refresh System Logs
           </button>
        </div>
      </div>
    </div>
  );
}
