import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'What is a Transport Management System (TMS)? — TSM',
  description:
    'Learn what a Transport Management System (TMS) is, how it functions in logistics, and how TSM by Expendifii provides a simplified digital GR creator for Indian transporters.',
  alternates: { canonical: 'https://tsm.expendifii.com/transport-management-system' },
};

export default function TMSOverviewPage() {
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
              Understanding Transport Management Systems (TMS)
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              An educational overview of how digital TMS platforms help logistics companies plan, execute, and optimise the movement of physical goods.
            </p>
          </div>
        </section>

        {/* Content Article */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <article className="prose prose-slate dark:prose-invert max-w-none space-y-8">
              
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  What is a Transport Management System?
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                  A Transport Management System (TMS) is a specialized logistics software platform that uses technology to help businesses plan, execute, and optimize the inbound and outbound shipping of goods. By digitising the documentation, vehicle dispatch, billing, and route tracking processes, a TMS helps logistics operations remain compliant and efficient.
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  Why Do Indian Transporters Need a TMS?
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base mb-4">
                  Traditionally, Indian transport companies manage their daily operations using paper Books, hand-written Lorry Receipts (LR/GR), physical ledger cards, and manual phone call tracking. While this worked in previous decades, today&apos;s logistics market demands:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  <li><strong>Fast document turnarounds:</strong> Creating GRs, PODs, and invoices in minutes instead of hours.</li>
                  <li><strong>Audit compliance:</strong> Having clean records of GSTINs, pincodes, and states for E-Way Bills.</li>
                  <li><strong>Transparency:</strong> Sharing copies of receipts directly with consigners and drivers digitally.</li>
                  <li><strong>Space savings:</strong> Replacing physical filing cabinets with secure, cloud-based data storage.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  How TSM by Expendifii Fits In
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                  Most enterprise-grade TMS platforms are highly complex, require months of onboarding, and charge steep fees. <strong>TSM by Expendifii</strong> takes a different path. We focus purely on what Indian transporters use most: fast Goods Receipt (GR) generation, 3-copy layouts matching standard layouts, and simple analytics. It is free to start, and takes just 2–24 hours to set up.
                </p>
              </div>

            </article>
            
            <div className="mt-16 p-6 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Want to see a simplified TMS in action?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Test the live demo - no sign-up or credit card required.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/live-demo" className="px-5 py-2.5 rounded-lg bg-[#0369A1] hover:bg-sky-600 text-white text-sm font-semibold transition-colors duration-150 cursor-pointer">
                  Launch Live Demo
                </Link>
                <Link href="/register" className="px-5 py-2.5 rounded-lg border border-slate-350 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#0369A1] text-sm font-semibold transition-colors duration-150 cursor-pointer">
                  Sign Up Free
                </Link>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-[#0369A1] transition-colors">Home</Link>
              <Link href="/features" className="hover:text-[#0369A1] transition-colors">Features</Link>
              <Link href="/why-tsm" className="hover:text-[#0369A1] transition-colors">Why Choose TSM</Link>
              <Link href="/logistics-glossary" className="hover:text-[#0369A1] transition-colors">Logistics Glossary</Link>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
