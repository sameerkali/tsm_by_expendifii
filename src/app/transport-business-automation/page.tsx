import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Transport Business Automation: Save Hours Daily — TSM',
  description:
    'Discover how transport business automation can eliminate manual errors, replace redundant data entry work, and scale fleet operations efficiently with TSM.',
  alternates: { canonical: 'https://tsm.expendifii.com/transport-business-automation' },
};

export default function AutomationOverviewPage() {
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
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white mb-6">
              Transport Business Automation
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              How modern logistics tools eliminate paperwork, save on admin staffing costs, and scale operations effortlessly.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <article className="prose prose-slate dark:prose-invert max-w-none space-y-8">
              
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  Eliminating Redundant Data Entry
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                  In a typical transport yard, dispatch staff spend several hours copying shipper addresses, GSTIN numbers, driver license details, and pricing structures from old spreadsheets or folders. By implementing smart automation, these details are saved directly inside a secure customer directory. Typing a single customer name auto-populates the entire GR form instantly, cutting creation time from 15 minutes to under 2 minutes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  Reducing Operations Costs
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                  Growing transport fleets often require hiring additional administrative staff just to keep up with physical GR filings and customer billing requests. TSM by Expendifii automates the generation of lorry receipts and makes them digitally searchable in seconds. Transporters can double their active fleet without hiring more office staff, directly saving on operational overheads.
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  Smart Digital Dispatch Tracking
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                  Instead of calling drivers every hour to check their status, automated systems display active jobs in transit, recent deliveries, and pending dispatches directly on a centralized dashboard. Transporters gain absolute operational clarity.
                </p>
              </div>

            </article>

            <div className="mt-16 p-6 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Automate your transport business today</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">TSM is free to start. Setting up takes just 2–24 hours.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register" className="px-5 py-2.5 rounded-lg bg-[#0369A1] hover:bg-sky-600 text-white text-sm font-semibold transition-colors duration-150 cursor-pointer">
                  Get Started Free
                </Link>
                <Link href="/live-demo" className="px-5 py-2.5 rounded-lg border border-slate-350 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#0369A1] text-sm font-semibold transition-colors duration-150 cursor-pointer">
                  Try Live Demo
                </Link>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-[#0369A1] transition-colors">Home</Link>
              <Link href="/features" className="hover:text-[#0369A1] transition-colors">Features</Link>
              <Link href="/digital-transport-management" className="hover:text-[#0369A1] transition-colors">Digital vs Paper</Link>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
