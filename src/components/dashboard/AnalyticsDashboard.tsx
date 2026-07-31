'use client';

import React, { useState, useMemo } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  TrendingUp, Users, FileText, RefreshCw, AlertCircle, Clock, Truck,
  CheckCircle, HelpCircle, Building, IndianRupee
} from 'lucide-react';
import { DashboardData } from '@/lib/api/dashboard.api';
import { cn } from '@/lib/utils/cn';

interface AnalyticsDashboardProps {
  data?: DashboardData;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

export function AnalyticsDashboard({ data, isLoading, isError, refetch }: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const derivedMetrics = useMemo(() => {
    if (!data) return null;
    const { grs, revenue, payment, topCustomersByGRCount, topCustomersByRevenue } = data;
    const totalGRCount = grs.total || 0;
    const avgFreightValue = totalGRCount > 0 ? revenue.total / totalGRCount : 0;
    const paidRevenueRatio = revenue.total > 0 ? (revenue.paid / revenue.total) * 100 : 0;
    const pendingRevenueRatio = revenue.total > 0 ? (revenue.pending / revenue.total) * 100 : 0;
    const totalPayments = payment.pending + payment.paid;
    const paymentCollectionRate = totalPayments > 0 ? (payment.paid / totalPayments) * 100 : 0;

    const customersMap = new Map<string, { id: string; name: string; phone: string; grCount: number; revenue: number }>();
    topCustomersByGRCount.forEach(c => customersMap.set(c.customerId, { id: c.customerId, name: c.name, phone: c.phone, grCount: c.grCount, revenue: 0 }));
    topCustomersByRevenue.forEach(c => {
      const ex = customersMap.get(c.customerId);
      if (ex) ex.revenue = c.revenue;
      else customersMap.set(c.customerId, { id: c.customerId, name: c.name, phone: c.phone, grCount: 0, revenue: c.revenue });
    });

    const customersList = Array.from(customersMap.values()).map(c => ({ ...c, averageTicketValue: c.grCount > 0 ? c.revenue / c.grCount : 0 }));
    return { avgFreightValue, paidRevenueRatio, pendingRevenueRatio, paymentCollectionRate, customersList, formatCurrency };
  }, [data]);

  const chartData = useMemo(() => {
    if (!data?.recentGRs) return null;
    const sortedGRs = [...data.recentGRs].sort((a, b) => new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime());
    const amounts = sortedGRs.map(gr => gr.freightAmount);
    return { sortedGRs, maxAmount: Math.max(...amounts, 1000), minAmount: Math.min(...amounts, 0) };
  }, [data]);

  if (isLoading) return <DashboardSkeleton />;

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-dashed border-red-200 dark:border-red-900/50 rounded-2xl bg-red-50/50 dark:bg-red-950/10 space-y-4">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Failed to load analytics</h3>
        <p className="text-xs text-slate-500 max-w-sm text-center">There was an error communicating with the server. Please verify your connection and try again.</p>
        <button onClick={refetch} className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    );
  }

  const { grs, revenue, payment } = data;
  const metrics = derivedMetrics!;

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <span className="text-[10px] font-black tracking-[0.2em] text-sky-600 dark:text-sky-400 uppercase font-mono">Live Feed & Analytics</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-sky-600 dark:text-sky-400 uppercase italic">Operational Metrics</h2>
          </div>
          <button onClick={() => refetch()} className="self-start sm:self-center flex items-center justify-center gap-2 h-10 px-4 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer active:scale-95">
            <RefreshCw size={12} className="text-slate-400 group-hover:rotate-180 transition-transform duration-500" /> Refresh Feed
          </button>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <KpiCard title="Total Revenue" value={formatCurrency(revenue.total)} icon={IndianRupee} iconBg="bg-sky-600/10 dark:bg-sky-400/10 text-sky-600 dark:text-sky-400">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Paid: {formatCurrency(revenue.paid)}</span>
              <span className="text-sky-600 dark:text-sky-400 font-bold font-mono">{metrics.paidRevenueRatio.toFixed(0)}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-sky-600 dark:bg-sky-400 transition-all duration-500" style={{ width: `${metrics.paidRevenueRatio}%` }} />
            </div>
          </KpiCard>

          <KpiCard title="Goods Receipts (GR)" value={grs.total} icon={FileText} iconBg="bg-sky-600/10 dark:bg-sky-400/10 text-sky-600 dark:text-sky-400">
            <div className="flex justify-between gap-1 text-[10px] font-bold text-slate-400 uppercase">
              <span className="flex items-center gap-1"><Clock size={10} className="text-sky-600 dark:text-sky-400" /> {grs.booked} Booked</span>
              <span className="flex items-center gap-1"><Truck size={10} className="text-blue-500 dark:text-blue-400" /> {grs.inTransit} Transit</span>
              <span className="flex items-center gap-1"><CheckCircle size={10} className="text-emerald-500" /> {grs.delivered} Del</span>
            </div>
          </KpiCard>

          <KpiCard title="Avg Freight / Trip" value={formatCurrency(metrics.avgFreightValue)} icon={TrendingUp} iconBg="bg-emerald-500/10 text-emerald-500">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Trips Tracked</span>
              <span className="text-slate-900 dark:text-white font-black font-mono">{grs.total}</span>
            </div>
          </KpiCard>

          <KpiCard title="Active Customers" value={data.totalCustomers} icon={Users} iconBg="bg-indigo-500/10 text-indigo-500">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Bills Pending</span>
              <span className="text-sky-600 dark:text-sky-400 font-bold font-mono">{payment.pending} invoices</span>
            </div>
          </KpiCard>
        </div>

        {/* Tabs Workspace */}
        <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="flex flex-col space-y-6">
          <Tabs.List className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/40 p-1 rounded-lg self-start">
            {['overview', 'financials'].map((tab) => (
              <Tabs.Trigger key={tab} value={tab} className={cn("px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md cursor-pointer transition-all focus:outline-none capitalize", activeTab === tab ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300")}>
                {tab}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {/* TAB 1: OVERVIEW */}
          <Tabs.Content value="overview" className="space-y-6 focus:outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Donut Status Chart */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Status Breakdown</h3>
                  <p className="text-xs text-slate-400 mb-6">Proportion of active vs completed GR shipments</p>
                </div>
                <div className="flex items-center justify-center my-4 relative">
                  <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100 dark:text-slate-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    {donutData.map((d) => {
                      const percent = (d.count / (totalSegments || 1)) * 100;
                      const strokeDasharray = `${percent} ${100 - percent}`;
                      const strokeDashoffset = -accumulatedPercent;
                      accumulatedPercent += percent;
                      return <path key={d.label} className={cn("transition-all duration-1000", d.color)} strokeWidth="3.5" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />;
                    })}
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">{grs.total}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total GRs</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                  {donutData.map((d) => (
                    <div key={d.label} className="text-center">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <span className={cn("w-2 h-2 rounded-full", d.bg)} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{d.label}</span>
                      </div>
                      <span className="text-sm font-black text-slate-900 dark:text-white font-mono">{d.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline SVG Line Chart */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Freight Value Timeline</h3>
                    <span className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">Recent Activity</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-6">Historical trend of freight booking amounts across recent shipments</p>
                </div>
                {chartData && chartData.sortedGRs.length > 0 ? (
                  <div className="space-y-4">
                    <div className="h-44 w-full relative pt-4">
                      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 120">
                        {chartData.sortedGRs.map((gr, idx) => {
                          const x = (idx / (chartData.sortedGRs.length - 1 || 1)) * 500;
                          const range = (chartData.maxAmount - chartData.minAmount) || 1;
                          const y = 110 - ((gr.freightAmount - chartData.minAmount) / range) * 90;
                          return (
                            <g key={gr.grId || idx} className="group">
                              <circle cx={x} cy={y} r="5" className="fill-sky-600 dark:fill-sky-400 stroke-white dark:stroke-slate-900 stroke-2 transition-all hover:r-7 cursor-pointer" />
                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <rect x={x - 15} y={0} width="30" height="120" fill="transparent" className="cursor-pointer" />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content className="bg-slate-900 text-white text-xs px-3 py-2 rounded-md shadow-xl border border-slate-800 z-50">
                                    <p className="font-bold">{gr.grNumber} • {formatCurrency(gr.freightAmount)}</p>
                                    <p className="text-[10px] text-slate-400">{gr.fromCity} → {gr.toCity}</p>
                                    <Tooltip.Arrow className="fill-slate-900" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="h-44 flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">No recent timeline data available</div>
                )}
              </div>
            </div>
          </Tabs.Content>

          {/* TAB 2: FINANCIALS */}
          <Tabs.Content value="financials" className="space-y-6 focus:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FinCard title="Total Billed" value={formatCurrency(revenue.total)} subText="All Created Records" border="border-sky-500/20" text="text-sky-600 dark:text-sky-400" />
              <FinCard title="Collections (Paid)" value={formatCurrency(revenue.paid)} subText={`${metrics.paidRevenueRatio.toFixed(0)}% Realised`} border="border-emerald-500/20" text="text-emerald-500" />
              <FinCard title="Pending Outstanding" value={formatCurrency(revenue.pending)} subText={`${metrics.pendingRevenueRatio.toFixed(0)}% Uncollected`} border="border-amber-500/20" text="text-amber-500" />
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </Tooltip.Provider>
  );
}

function KpiCard({ title, value, icon: Icon, iconBg, children }: { title: string; value: string | number; icon: React.ComponentType<{ size?: number }>; iconBg: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-6 relative overflow-hidden transition-all hover:border-sky-600/40 dark:hover:border-sky-400/40">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white font-mono">{value}</h3>
        </div>
        <div className={cn("p-2.5 rounded-md", iconBg)}><Icon size={20} /></div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">{children}</div>
    </div>
  );
}

function FinCard({ title, value, subText, border, text }: { title: string; value: string; subText: string; border: string; text: string }) {
  return (
    <div className={cn("bg-white dark:bg-slate-900 border rounded-2xl p-6", border)}>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
      <h3 className={cn("text-3xl font-black font-mono mt-2", text)}>{value}</h3>
      <p className="text-xs text-slate-400 mt-1 font-medium">{subText}</p>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl w-64" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-36 bg-slate-200 dark:bg-slate-800 rounded-xl" />)}
      </div>
    </div>
  );
}
