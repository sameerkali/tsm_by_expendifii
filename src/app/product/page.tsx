import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Product Overview — TSM by Expendifii',
  description:
    'Take a detailed tour of TSM by Expendifii: view the dashboard interface, live fleet status tracker, active job logs, and smart invoice management built for Indian logistics.',
  alternates: { canonical: 'https://tsm.expendifii.com/product' },
};

export default function ProductPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-20 sm:py-28">
          <div
            aria-hidden="true"
            className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:48px_48px] opacity-50"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 to-[#F8FAFC] dark:to-slate-950" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white mb-6">
              A complete cockpit for your <span className="text-[#0369A1] dark:text-sky-400">transport business</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              TSM provides a visual, real-time control panel to run your daily operations, track jobs, monitor vehicle statuses, and watch invoices without manual record books.
            </p>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-8 tracking-tight">
              Interactive Dashboard Overview
            </h2>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
              {/* Fake browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                <span className="h-3 w-3 rounded-full bg-red-400" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-amber-400" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" aria-hidden="true" />
                <div className="ml-4 flex-1 rounded-md bg-slate-200/70 dark:bg-slate-700 px-3 py-1 text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                  tsm.expendifii.com/dashboard
                </div>
              </div>
              {/* Dashboard preview */}
              <div className="p-4 sm:p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-[300px]">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Active Jobs', value: '48', trend: '+12% this week', up: true },
                    { label: 'Vehicles Live', value: '31', trend: '100% utilisation', up: true },
                    { label: 'Invoices Due', value: '₹2.4L', trend: '-8% reduction', up: false },
                    { label: 'On-time Rate', value: '94%', trend: '+3% improvement', up: true },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-4 shadow-sm">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-[#0F172A] dark:text-white">{stat.value}</p>
                      <p className={`text-xs font-semibold mt-1 ${stat.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>{stat.trend}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-5 py-4 shadow-sm">
                    <p className="text-sm font-bold text-slate-800 dark:text-white mb-4">Live Transit Jobs</p>
                    {[
                      { id: 'JB-1042', route: 'Mumbai → Pune', status: 'In Transit', color: 'bg-blue-500', eta: '2 hrs left' },
                      { id: 'JB-1041', route: 'Nashik → Nagpur', status: 'Delivered', color: 'bg-emerald-500', eta: 'Completed' },
                      { id: 'JB-1040', route: 'Pune → Kolhapur', status: 'Pending Dispatch', color: 'bg-amber-400', eta: 'Today' },
                    ].map((job) => (
                      <div key={job.id} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
                        <div className="flex items-center gap-3">
                          <span className={`h-2.5 w-2.5 rounded-full ${job.color}`} aria-hidden="true" />
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">{job.id}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{job.route}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{job.status}</span>
                          <p className="text-[10px] text-slate-400 mt-0.5">{job.eta}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white mb-4">Fleet Status Overview</p>
                      {[
                        { label: 'Active (On Road)', count: 31, color: 'bg-emerald-500' },
                        { label: 'Idle (Yard)', count: 8, color: 'bg-amber-400' },
                        { label: 'Service / Maintenance', count: 3, color: 'bg-red-400' },
                      ].map((s) => (
                        <div key={s.label} className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-750 last:border-0">
                          <div className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${s.color}`} aria-hidden="true" />
                            <span className="text-xs text-slate-600 dark:text-slate-300">{s.label}</span>
                          </div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{s.count}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-4 italic">Updated live every 60 seconds</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">Actual TSM dashboard visual representation</p>
          </div>
        </section>

        {/* Ready to leave the paper behind CTA */}
        <section className="bg-[#0F172A] dark:bg-slate-900 py-20 sm:py-24 border-t border-slate-850" aria-labelledby="final-cta-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="final-cta-heading" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Ready to leave the paper behind?
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
              Join transporters across NCR who are creating GRs in minutes not hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                id="product-cta-primary"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0369A1] px-7 py-4 text-sm font-semibold text-white shadow-lg hover:bg-sky-600 transition-colors duration-200 cursor-pointer"
              >
                Get Started Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/live-demo"
                id="product-cta-demo"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-7 py-4 text-sm font-semibold text-slate-300 hover:border-sky-500 hover:text-sky-400 transition-colors duration-200 cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" />
                </svg>
                See a live demo no signup
              </Link>
            </div>
            <div className="mt-12 pt-6 border-t border-slate-800 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/features" className="hover:text-white transition-colors">Features list</Link>
              <Link href="/why-tsm" className="hover:text-white transition-colors">Why Choose TSM</Link>
              <Link href="/logistics-glossary" className="hover:text-white transition-colors">Logistics Glossary</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
