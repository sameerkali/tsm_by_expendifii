'use client';

import React, { useState, useMemo } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  TrendingUp,
  Users,
  FileText,
  DollarSign,
  RefreshCw,
  AlertCircle,
  Clock,
  Truck,
  CheckCircle,
  HelpCircle,
  Building,
  IndianRupee
} from 'lucide-react';
import { DashboardData } from '@/lib/api/dashboard.api';
import { cn } from '@/lib/utils/cn';

interface AnalyticsDashboardProps {
  data?: DashboardData;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export function AnalyticsDashboard({ data, isLoading, isError, refetch }: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // 1. Calculate derived metrics
  const derivedMetrics = useMemo(() => {
    if (!data) return null;

    const { grs, revenue, payment, topCustomersByGRCount, topCustomersByRevenue } = data;

    // Average Freight Value per GR
    const totalGRCount = grs.total || 0;
    const avgFreightValue = totalGRCount > 0 ? revenue.total / totalGRCount : 0;

    // Paid vs Pending Revenue Ratio
    const paidRevenueRatio = revenue.total > 0 ? (revenue.paid / revenue.total) * 100 : 0;
    const pendingRevenueRatio = revenue.total > 0 ? (revenue.pending / revenue.total) * 100 : 0;

    // Payment collection rate (count based)
    const totalPayments = payment.pending + payment.paid;
    const paymentCollectionRate = totalPayments > 0 ? (payment.paid / totalPayments) * 100 : 0;

    // Combined Top Customers list with derived Average Ticket Value
    const customersMap = new Map<string, { id: string; name: string; phone: string; grCount: number; revenue: number }>();

    topCustomersByGRCount.forEach(c => {
      customersMap.set(c.customerId, {
        id: c.customerId,
        name: c.name,
        phone: c.phone,
        grCount: c.grCount,
        revenue: 0
      });
    });

    topCustomersByRevenue.forEach(c => {
      const existing = customersMap.get(c.customerId);
      if (existing) {
        existing.revenue = c.revenue;
      } else {
        customersMap.set(c.customerId, {
          id: c.customerId,
          name: c.name,
          phone: c.phone,
          grCount: 0,
          revenue: c.revenue
        });
      }
    });

    const customersList = Array.from(customersMap.values()).map(c => {
      const averageTicketValue = c.grCount > 0 ? c.revenue / c.grCount : 0;
      return {
        ...c,
        averageTicketValue
      };
    });

    // Format currency helper
    const formatCurrency = (val: number) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(val);
    };

    return {
      avgFreightValue,
      paidRevenueRatio,
      pendingRevenueRatio,
      paymentCollectionRate,
      customersList,
      formatCurrency
    };
  }, [data]);

  // 2. Format SVG Chart Data
  const chartData = useMemo(() => {
    if (!data || !data.recentGRs) return null;

    // Sort recent GRs by date ascending for the timeline chart
    const sortedGRs = [...data.recentGRs].sort(
      (a, b) => new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime()
    );

    // Map min/max for scale
    const amounts = sortedGRs.map(gr => gr.freightAmount);
    const maxAmount = Math.max(...amounts, 1000);
    const minAmount = Math.min(...amounts, 0);

    return {
      sortedGRs,
      maxAmount,
      minAmount
    };
  }, [data]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-dashed border-red-200 dark:border-red-900/50 rounded-2xl bg-red-50/50 dark:bg-red-950/10 space-y-4">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Failed to load analytics</h3>
        <p className="text-xs text-slate-500 max-w-sm text-center">
          There was an error communicating with the server. Please verify your connection and try again.
        </p>
        <button
          onClick={refetch}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      </div>
    );
  }

  const { grs, revenue, payment } = data;
  const metrics = derivedMetrics!;

  // Donut chart stroke math
  const donutData = [
    { label: 'Booked', count: grs.booked, color: 'stroke-sky-500 text-sky-500 dark:text-sky-400', bg: 'bg-sky-500 dark:bg-sky-400' },
    { label: 'In Transit', count: grs.inTransit, color: 'stroke-blue-500 text-blue-500 dark:text-blue-400', bg: 'bg-blue-500 dark:bg-blue-400' },
    { label: 'Delivered', count: grs.delivered, color: 'stroke-emerald-500 text-emerald-500', bg: 'bg-emerald-500' }
  ].filter(d => d.count > 0);

  const totalSegments = donutData.reduce((sum, d) => sum + d.count, 0);
  let accumulatedPercent = 0;

  return (
    <Tooltip.Provider>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <span className="text-[10px] font-black tracking-[0.2em] text-sky-600 dark:text-sky-400 uppercase font-mono">
              Live Feed & Analytics
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-sky-600 dark:text-sky-400 uppercase italic">
              Operational Metrics
            </h2>
          </div>
          
          <button
            onClick={() => refetch()}
            className="self-start sm:self-center flex items-center justify-center gap-2 h-10 px-4 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer active:scale-95"
          >
            <RefreshCw size={12} className="text-slate-400 group-hover:rotate-180 transition-transform duration-500" />
            Refresh Feed
          </button>
        </div>

        {/* ── KPI GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Revenue */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-6 relative overflow-hidden transition-all hover:border-sky-600/40 dark:hover:border-sky-400/40">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {metrics.formatCurrency(revenue.total)}
                </h3>
              </div>
              <div className="p-2.5 bg-sky-600/10 dark:bg-sky-400/10 rounded-md text-sky-600 dark:text-sky-400">
                <IndianRupee size={20} />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Paid: {metrics.formatCurrency(revenue.paid)}</span>
                <span className="text-sky-600 dark:text-sky-400 font-bold font-mono">{metrics.paidRevenueRatio.toFixed(0)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sky-600 dark:bg-sky-400 transition-all duration-500" 
                  style={{ width: `${metrics.paidRevenueRatio}%` }}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Goods Receipts */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-6 relative overflow-hidden transition-all hover:border-sky-600/40 dark:hover:border-sky-400/40">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Goods Receipts (GR)</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {grs.total}
                </h3>
              </div>
              <div className="p-2.5 bg-sky-600/10 dark:bg-sky-400/10 rounded-md text-sky-600 dark:text-sky-400">
                <FileText size={20} />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex justify-between gap-1 text-[10px] font-bold text-slate-400 uppercase">
              <span className="flex items-center gap-1"><Clock size={10} className="text-sky-600 dark:text-sky-400" /> {grs.booked} Booked</span>
              <span className="flex items-center gap-1"><Truck size={10} className="text-blue-500 dark:text-blue-400" /> {grs.inTransit} Transit</span>
              <span className="flex items-center gap-1"><CheckCircle size={10} className="text-emerald-500" /> {grs.delivered} Del</span>
            </div>
          </div>

          {/* Card 3: Avg Freight */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-6 relative overflow-hidden transition-all hover:border-sky-600/40 dark:hover:border-sky-400/40">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Freight / Trip</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {metrics.formatCurrency(metrics.avgFreightValue)}
                </h3>
              </div>
              <div className="p-2.5 bg-emerald-500/10 rounded-md text-emerald-500">
                <TrendingUp size={20} />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Trips Tracked</span>
              <span className="text-slate-900 dark:text-white font-black font-mono">{grs.total}</span>
            </div>
          </div>

          {/* Card 4: Customers & Outstandings */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-6 relative overflow-hidden transition-all hover:border-sky-600/40 dark:hover:border-sky-400/40">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Customers</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {data.totalCustomers}
                </h3>
              </div>
              <div className="p-2.5 bg-indigo-500/10 rounded-md text-indigo-500">
                <Users size={20} />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
              <span className="text-slate-400">Bills Pending</span>
              <span className="text-sky-600 dark:text-sky-400 font-bold font-mono">{payment.pending} invoices</span>
            </div>
          </div>
        </div>

        {/* ── RADIX TABS WORKSPACE ── */}
        <Tabs.Root 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="flex flex-col space-y-6"
        >
          {/* Tab Selection Row */}
          <Tabs.List className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/40 p-1 rounded-lg self-start">
            <Tabs.Trigger 
              value="overview" 
              className={cn(
                "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md cursor-pointer transition-all focus:outline-none",
                activeTab === 'overview' 
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              )}
            >
              Overview
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="financials" 
              className={cn(
                "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md cursor-pointer transition-all focus:outline-none",
                activeTab === 'financials' 
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              )}
            >
              Financials
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="customers" 
              className={cn(
                "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md cursor-pointer transition-all focus:outline-none",
                activeTab === 'customers' 
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              )}
            >
              Customers
            </Tabs.Trigger>
          </Tabs.List>

          {/* 1. OVERVIEW TAB */}
          <Tabs.Content value="overview" className="space-y-6 focus:outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column (2/3): Operational Revenue Area Timeline Chart */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="text-sm font-black uppercase italic text-slate-900 dark:text-white">Freight Revenue Timeline</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Historical booking analysis of recent Goods Receipts</p>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-sky-600 dark:bg-sky-400 rounded-sm" /> Freight (INR)</span>
                  </div>
                </div>

                {/* SVG Line/Area Chart */}
                <div className="h-64 w-full relative">
                  {chartData && chartData.sortedGRs.length > 0 ? (
                    <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" className="text-sky-600 dark:text-sky-400" stopColor="currentColor" stopOpacity="0.25" />
                          <stop offset="100%" className="text-sky-600 dark:text-sky-400" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Grid Lines */}
                      <line x1="0" y1="20" x2="500" y2="20" className="stroke-slate-100 dark:stroke-slate-800/40" strokeWidth="1" strokeDasharray="3" />
                      <line x1="0" y1="70" x2="500" y2="70" className="stroke-slate-100 dark:stroke-slate-800/40" strokeWidth="1" strokeDasharray="3" />
                      <line x1="0" y1="120" x2="500" y2="120" className="stroke-slate-100 dark:stroke-slate-800/40" strokeWidth="1" strokeDasharray="3" />
                      <line x1="0" y1="170" x2="500" y2="170" className="stroke-slate-100 dark:stroke-slate-800/40" strokeWidth="1" strokeDasharray="3" />

                      {/* Area Path */}
                      <path
                        d={(() => {
                          const points = chartData.sortedGRs.map((gr, idx) => {
                            const x = (idx / (chartData.sortedGRs.length - 1 || 1)) * 500;
                            const y = 180 - ((gr.freightAmount - chartData.minAmount) / (chartData.maxAmount - chartData.minAmount || 1)) * 140;
                            return `${x},${y}`;
                          });
                          return `M0,180 L${points.join(' L')} L500,180 Z`;
                        })()}
                        fill="url(#chart-glow)"
                      />

                      {/* Line Path */}
                      <path
                        d={chartData.sortedGRs.map((gr, idx) => {
                          const x = (idx / (chartData.sortedGRs.length - 1 || 1)) * 500;
                          const y = 180 - ((gr.freightAmount - chartData.minAmount) / (chartData.maxAmount - chartData.minAmount || 1)) * 140;
                          return `${idx === 0 ? 'M' : 'L'}${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        className="stroke-sky-600 dark:stroke-sky-400"
                        strokeWidth="2.5"
                      />

                      {/* Interactive Nodes with Radix Tooltip */}
                      {chartData.sortedGRs.map((gr, idx) => {
                        const x = (idx / (chartData.sortedGRs.length - 1 || 1)) * 500;
                        const y = 180 - ((gr.freightAmount - chartData.minAmount) / (chartData.maxAmount - chartData.minAmount || 1)) * 140;

                        return (
                          <g key={gr.grId} className="cursor-pointer group">
                            {/* Hover highlight circle */}
                            <circle
                              cx={x}
                              cy={y}
                              r="8"
                              className="fill-sky-600/20 dark:fill-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                            
                            {/* Visual circle */}
                            <Tooltip.Root delayDuration={100}>
                              <Tooltip.Trigger asChild>
                                <circle
                                  cx={x}
                                  cy={y}
                                  r="4.5"
                                  className="fill-white dark:fill-slate-900 stroke-sky-600 dark:stroke-sky-400"
                                  strokeWidth="2"
                                />
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content
                                  side="top"
                                  sideOffset={5}
                                  className="bg-slate-950/95 backdrop-blur-md text-white border border-slate-800 px-3 py-2 rounded-md shadow-lg z-[200] text-xs font-medium space-y-1.5"
                                >
                                  <div className="font-bold flex items-center justify-between gap-4">
                                    <span>{gr.grNumber}</span>
                                    <span className="text-[10px] font-black uppercase text-sky-600 dark:text-sky-400 font-mono">{gr.status}</span>
                                  </div>
                                  <div className="text-slate-400 font-mono text-[10px] flex gap-2">
                                    <span>{gr.fromCity} ➔ {gr.toCity}</span>
                                  </div>
                                  <div className="text-white font-bold font-mono">
                                    {metrics.formatCurrency(gr.freightAmount)}
                                  </div>
                                  <div className="text-[9px] text-slate-500">
                                    {new Date(gr.bookingDate).toLocaleDateString('en-IN', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric'
                                    })}
                                  </div>
                                  <Tooltip.Arrow className="fill-slate-950" />
                                </Tooltip.Content>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          </g>
                        );
                      })}
                    </svg>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400 font-medium">
                      No operations data recorded.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column (1/3): Goods Receipt Status Distribution (Donut Chart) */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-black uppercase italic text-slate-900 dark:text-white">GR Status Mix</h4>
                  <p className="text-[10px] text-slate-400 font-medium mb-6">Proportion of bookings in operational phases</p>
                </div>

                {/* Donut graphic */}
                <div className="flex justify-center items-center h-40 relative shrink-0">
                  <svg viewBox="0 0 128 128" className="w-32 h-32 overflow-visible">
                    <g transform="rotate(-90 64 64)">
                      <circle
                        cx="64"
                        cy="64"
                        r="48"
                        className="fill-none stroke-slate-100 dark:stroke-slate-800"
                        strokeWidth="12"
                      />
                      
                      {/* Render status segments */}
                      {donutData.map((seg) => {
                        const percent = (seg.count / totalSegments) * 100;
                        const strokeDash = (percent / 100) * (2 * Math.PI * 48);
                        
                        // Calculate segment accumulation offset
                        const currentOffset = ((100 - percent - accumulatedPercent) / 100) * (2 * Math.PI * 48);
                        accumulatedPercent += percent;

                        return (
                          <Tooltip.Root key={seg.label} delayDuration={100}>
                            <Tooltip.Trigger asChild>
                              <circle
                                cx="64"
                                cy="64"
                                r="48"
                                className={cn("fill-none cursor-pointer transition-all hover:stroke-[14px]", seg.color)}
                                strokeWidth="12"
                                strokeDasharray={`${strokeDash} ${2 * Math.PI * 48}`}
                                strokeDashoffset={currentOffset}
                              />
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content
                                side="right"
                                className="bg-slate-950/95 text-white border border-slate-800 px-3 py-2 rounded-md shadow-lg z-[200] text-xs font-semibold"
                              >
                                <div className="flex items-center gap-2">
                                  <span className={cn("w-2 h-2 rounded-full", seg.bg)} />
                                  <span>{seg.label}: {seg.count} ({percent.toFixed(0)}%)</span>
                                </div>
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        );
                      })}
                    </g>
                  </svg>

                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{grs.total}</span>
                    <span className="text-[8px] font-black uppercase text-slate-400 tracking-wider">Total GRs</span>
                  </div>
                </div>

                {/* Legend list */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 grid grid-cols-3 gap-2 text-center text-xs">
                  {donutData.map(seg => (
                    <div key={seg.label} className="space-y-0.5">
                      <span className="text-[10px] text-slate-400 font-bold block">{seg.label}</span>
                      <span className={cn("font-bold font-mono text-sm block", seg.color.split(' ')[1])}>{seg.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Goods Receipts list */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md">
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black uppercase italic text-slate-900 dark:text-white">Recent Operations Feed</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Real-time status updates of latest consignments</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 dark:bg-slate-900/40">
                      <th className="px-6 py-4">GR Number</th>
                      <th className="px-6 py-4">Booking Date</th>
                      <th className="px-6 py-4">Route</th>
                      <th className="px-6 py-4">Freight Amount</th>
                      <th className="px-6 py-4">Payment</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {data.recentGRs && data.recentGRs.length > 0 ? (
                      data.recentGRs.map((gr) => (
                        <tr key={gr.grId} className="group hover:bg-slate-50/40 dark:hover:bg-slate-900/30 transition-all">
                          <td className="px-6 py-4 font-mono font-bold text-xs text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                            {gr.grNumber}
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                            {new Date(gr.bookingDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="px-6 py-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                            {gr.fromCity} ➔ {gr.toCity}
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-xs text-slate-900 dark:text-slate-200">
                            {metrics.formatCurrency(gr.freightAmount)}
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider",
                              gr.paymentStatus === 'PAID' 
                                ? "bg-emerald-500/10 text-emerald-500" 
                                : "bg-sky-500/10 text-sky-500"
                            )}>
                              {gr.paymentStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border",
                              gr.status === 'DELIVERED' && "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50",
                              gr.status === 'IN_TRANSIT' && "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50",
                              gr.status === 'BOOKED' && "bg-sky-50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900/50"
                            )}>
                              {gr.status.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-xs text-slate-400 font-medium">
                          No recent goods receipts available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Tabs.Content>

          {/* 2. FINANCIALS TAB */}
          <Tabs.Content value="financials" className="space-y-6 focus:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Financial Balance Status */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-black uppercase italic text-slate-900 dark:text-white">Outstanding Balances</h4>
                  <p className="text-[10px] text-slate-400 font-medium mb-6">Status of invoice realizations</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400 uppercase">Paid Invoices</span>
                      <span className="text-emerald-500 font-mono">{metrics.formatCurrency(revenue.paid)}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-sm overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${metrics.paidRevenueRatio}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400 uppercase">Pending Invoices</span>
                      <span className="text-sky-600 dark:text-sky-400 font-mono">{metrics.formatCurrency(revenue.pending)}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-sm overflow-hidden">
                      <div className="h-full bg-sky-600 dark:bg-sky-400" style={{ width: `${metrics.pendingRevenueRatio}%` }} />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>Invoice Collection Rate</span>
                    <span className="text-slate-900 dark:text-white font-mono font-black">{metrics.paymentCollectionRate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* Financial Performance Ratios & Numbers */}
              <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-6">
                <h4 className="text-sm font-black uppercase italic text-slate-900 dark:text-white mb-6">Financial Intelligence</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div className="p-4 rounded border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Freight / GR</span>
                      <HelpCircle size={14} className="text-slate-300 dark:text-slate-700" />
                    </div>
                    <h5 className="text-xl font-black text-slate-950 dark:text-white font-mono">
                      {metrics.formatCurrency(metrics.avgFreightValue)}
                    </h5>
                    <p className="text-[10px] text-slate-400">
                      Calculated from total booked trips. Represents yield per trip.
                    </p>
                  </div>

                  <div className="p-4 rounded border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Outstanding Bills</span>
                      <HelpCircle size={14} className="text-slate-300 dark:text-slate-700" />
                    </div>
                    <h5 className="text-xl font-black text-slate-950 dark:text-white font-mono">
                      {payment.pending} bills
                    </h5>
                    <p className="text-[10px] text-slate-400">
                      Unpaid bills representing a potential working capital drag of {metrics.formatCurrency(revenue.pending)}.
                    </p>
                  </div>

                  <div className="p-4 rounded border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Collection Volume</span>
                      <HelpCircle size={14} className="text-slate-300 dark:text-slate-700" />
                    </div>
                    <h5 className="text-xl font-black text-slate-950 dark:text-white font-mono">
                      {metrics.formatCurrency(revenue.total)}
                    </h5>
                    <p className="text-[10px] text-slate-400">
                      Total system bookings valuation aggregate.
                    </p>
                  </div>

                  <div className="p-4 rounded border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Collected Invoices</span>
                      <HelpCircle size={14} className="text-slate-300 dark:text-slate-700" />
                    </div>
                    <h5 className="text-xl font-black text-slate-950 dark:text-white font-mono">
                      {payment.paid} bills
                    </h5>
                    <p className="text-[10px] text-slate-400">
                      Realized payments successfully marked as PAID.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </Tabs.Content>

          {/* 3. CUSTOMERS TAB */}
          <Tabs.Content value="customers" className="space-y-6 focus:outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column (2/3): Customer Performance Rankings Table */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="text-sm font-black uppercase italic text-slate-900 dark:text-white">Customer Performance Registry</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Consolidated view of customer activity, total revenue, and trip volumes</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 dark:bg-slate-900/40">
                        <th className="px-4 py-3">Customer Name</th>
                        <th className="px-4 py-3">Contact</th>
                        <th className="px-4 py-3 text-right">Trips (GR)</th>
                        <th className="px-4 py-3 text-right">Total Revenue</th>
                        <th className="px-4 py-3 text-right">Avg Trip Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {metrics.customersList.length > 0 ? (
                        metrics.customersList.map((customer) => (
                          <tr key={customer.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/30 transition-all">
                            <td className="px-4 py-3 text-xs font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                              <Building size={14} className="text-slate-400" />
                              {customer.name}
                            </td>
                            <td className="px-4 py-3 text-xs text-slate-500 font-mono">
                              {customer.phone || 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-200 text-right">
                              {customer.grCount}
                            </td>
                            <td className="px-4 py-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-200 text-right">
                              {metrics.formatCurrency(customer.revenue)}
                            </td>
                            <td className="px-4 py-3 text-xs font-mono font-bold text-slate-955 dark:text-white text-right">
                              {metrics.formatCurrency(customer.averageTicketValue)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-4 py-12 text-center text-xs text-slate-400 font-medium">
                            No customer records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column (1/3): Top Customers by Contribution */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-black uppercase italic text-slate-900 dark:text-white">Revenue Contribution</h4>
                  <p className="text-[10px] text-slate-400 font-medium mb-6">Percentage share of top performing accounts</p>
                </div>

                <div className="space-y-5">
                  {metrics.customersList.slice(0, 3).map((customer) => {
                    const percent = revenue.total > 0 ? (customer.revenue / revenue.total) * 100 : 0;
                    return (
                      <div key={customer.id} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-700 dark:text-slate-300 truncate max-w-[150px]">{customer.name}</span>
                          <span className="text-slate-400 font-mono">{percent.toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-sky-600 dark:bg-sky-400" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono">
                          <span>{customer.grCount} GRs</span>
                          <span>{metrics.formatCurrency(customer.revenue)}</span>
                        </div>
                      </div>
                    );
                  })}
                  {metrics.customersList.length === 0 && (
                    <div className="text-center py-8 text-xs text-slate-400 font-medium">
                      No data to chart.
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-[10px] text-slate-400 font-semibold leading-relaxed">
                  Average Ticket Value of Top Customers computes the net billing generated per individual shipment.
                </div>
              </div>

            </div>
          </Tabs.Content>

        </Tabs.Root>

      </div>
    </Tooltip.Provider>
  );
}

// ── SKELETON LOADER ──
function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="space-y-2">
          <div className="h-3 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-6 h-32 space-y-4">
            <div className="flex justify-between">
              <div className="space-y-2 w-2/3">
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
              </div>
              <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-6 h-80" />
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-6 h-80" />
      </div>
    </div>
  );
}
