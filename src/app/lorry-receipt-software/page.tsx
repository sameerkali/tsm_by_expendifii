import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Lorry Receipt (LR) Software for Indian Transporters — TSM',
  description:
    'Generate clean, professional, and compliant Lorry Receipts (LR/GR) digitally. Free software for Indian transport owners to customise layouts and print 3 copies.',
  alternates: { canonical: 'https://tsm.expendifii.com/lorry-receipt-software' },
};

export default function LorryReceiptSoftwarePage() {
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
              Lorry Receipt Software Built for India
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Create, print, and track clean Lorry Receipts (LR) instantly. Designed to help transport businesses eliminate paper ledger books.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <article className="prose prose-slate dark:prose-invert max-w-none space-y-8">
              
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  Why Use Lorry Receipt Software?
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                  Managing lorry receipts (LR/GR) on physical paper carbon books is slow, prone to spelling errors, and highly vulnerable to damage or misplacement. TSM Lorry Receipt Software provides a clean, single-screen creator to build LRs instantly.
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  Compliant Lorry Receipts (LR)
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base mb-4">
                  Under GST guidelines, lorry receipts must accurately state the consignor&apos;s and consignee&apos;s GSTIN numbers, correct state codes, and proper pincodes for inter-state transit verification. Our software automatically checks GSTIN format and matches pincodes with states to ensure compliance.
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  Custom Terms & Conditions
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                  Configure specific carriage conditions, default weight structures, custom headers, and logo tags. Once saved, TSM stores these preferences to auto-generate every subsequent lorry receipt exactly the way you want.
                </p>
              </div>

            </article>

            <div className="mt-16 p-6 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Start printing Lorry Receipts digitally</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Free for early transporters. No training required.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register" className="px-5 py-2.5 rounded-lg bg-[#0369A1] hover:bg-sky-600 text-white text-sm font-semibold transition-colors duration-150 cursor-pointer">
                  Get Started Free
                </Link>
                <Link href="/live-demo" className="px-5 py-2.5 rounded-lg border border-slate-350 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#0369A1] text-sm font-semibold transition-colors duration-150 cursor-pointer">
                  Launch Live Demo
                </Link>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-[#0369A1] transition-colors">Home</Link>
              <Link href="/features" className="hover:text-[#0369A1] transition-colors">Features</Link>
              <Link href="/gr-management" className="hover:text-[#0369A1] transition-colors">GR Management</Link>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
