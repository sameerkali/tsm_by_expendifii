import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Goods Receipt (GR) Management & 3-Copy Print — TSM',
  description:
    'Manage your Goods Receipt (GR) and Lorry Receipt (LR) workflows digitally. TSM auto-generates 3 print copies (Consigner, Consignee, Driver) in under 2 minutes.',
  alternates: { canonical: 'https://tsm.expendifii.com/gr-management' },
};

export default function GRManagementPage() {
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
              Digital Goods Receipt (GR) Management
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Create, customize, print, and track Goods Receipts and Lorry Receipts natively from a single, cloud-hosted platform.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <article className="prose prose-slate dark:prose-invert max-w-none space-y-8">
              
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  The Life Cycle of a Goods Receipt (GR)
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base mb-4">
                  In logistics, the Goods Receipt is the source of truth for the entire shipping agreement. It outlines exactly what was loaded, where it is going, who is shipping it, and the terms of transport. Managing it digitally ensures:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  <li><strong>Instant Generation:</strong> Populate driver, vehicle, and cargo weights into templates in seconds.</li>
                  <li><strong>Three-Copy Generation:</strong> Automatically output Driver, Consignor, and Consignee copies instantly.</li>
                  <li><strong>Payment Releases:</strong> A clean digital copy helps resolve shipping disputes faster and releases payments.</li>
                </ol>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  Customizable Lorry Receipt Layouts
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                  Every transport agency operates differently. TSM by Expendifii does not lock you into a rigid template. You can configure which inputs are mandatory, add custom headers, toggle tax columns, and set default terms and conditions for your printed receipts.
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  Permanent Search Archive
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                  Never dig through rows of dusty folders to find an old shipment record. TSM securely backs up every transaction. Filter and query historical receipts instantly by GR Number, Date Range, Shipped Destination, or Shipped Vehicle.
                </p>
              </div>

            </article>

            <div className="mt-16 p-6 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Ready to modernise your GR workflow?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Start using TSM by Expendifii completely free today.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register" className="px-5 py-2.5 rounded-lg bg-[#0369A1] hover:bg-sky-600 text-white text-sm font-semibold transition-colors duration-150 cursor-pointer">
                  Get Started Free
                </Link>
                <Link href="/lorry-receipt-software" className="px-5 py-2.5 rounded-lg border border-slate-350 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#0369A1] text-sm font-semibold transition-colors duration-150 cursor-pointer">
                  Lorry Receipt Software
                </Link>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-[#0369A1] transition-colors">Home</Link>
              <Link href="/features" className="hover:text-[#0369A1] transition-colors">Features</Link>
              <Link href="/logistics-glossary" className="hover:text-[#0369A1] transition-colors">Logistics Glossary</Link>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
