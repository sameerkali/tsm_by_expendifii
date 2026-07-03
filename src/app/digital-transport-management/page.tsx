import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Digital Transport Management vs Paper & Excel — TSM',
  description:
    'Compare traditional paper GR books and Excel sheets against digital transport management. Learn how TSM by Expendifii automates lorry receipts securely.',
  alternates: { canonical: 'https://tsm.expendifii.com/digital-transport-management' },
};

export default function ComparisonPage() {
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
              Paper vs Excel vs Digital Transport Management
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              An honest comparison of the three most common ways Indian transporters manage lorry receipts and transit records.
            </p>
          </div>
        </section>

        {/* Content Article */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <article className="prose prose-slate dark:prose-invert max-w-none space-y-12">
              
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  1. The Traditional Way: Paper GR Books
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base mb-4">
                  For decades, transporters have relied on carbon-copy paper books to fill Goods Receipts. Each shipment requires writing down identical information three times (for the Driver, Consignor, and Consignee).
                </p>
                <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 rounded-r-xl">
                  <p className="text-xs sm:text-sm text-red-800 dark:text-red-300">
                    <strong>The Risks:</strong> Paper records can easily be lost to fire, water, or rats. They require expensive physical storage space and are impossible to search through. Misplacing a single copy can delay customer payments for weeks.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  2. The Intermediate Step: Excel Sheets
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base mb-4">
                  Moving records to Excel or Google Sheets solves the storage problem. You can type details and print receipts, but it brings its own set of bottlenecks.
                </p>
                <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r-xl">
                  <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300">
                    <strong>The Bottlenecks:</strong> Excel requires constant manual data entry. There is no automated customer registry, meaning you have to type GSTINs and addresses repeatedly. It is prone to typos, and there is no live overview of transit jobs.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  3. The Modern Solution: Digital Transport Management (TSM)
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base mb-4">
                  TSM by Expendifii combines the speed of digital tools with the familiarity of transport layouts. It replaces manual paperwork with a 2-minute digital workflow.
                </p>
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 p-4 rounded-r-xl">
                  <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 font-medium">
                    <strong>The Benefits:</strong> Auto-fills recurring consignor information, auto-calculates totals, prints 3 copies with one click, stores records permanently on secure servers, and displays active transit summaries in real-time.
                  </p>
                </div>
              </div>

            </article>
            
            <div className="mt-16 p-6 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Ready to transition your transport business?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">TSM is free to start and takes under 2–24 hours to set up.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register" className="px-5 py-2.5 rounded-lg bg-[#0369A1] hover:bg-sky-600 text-white text-sm font-semibold transition-colors duration-150 cursor-pointer">
                  Create Free Account
                </Link>
                <Link href="/why-tsm" className="px-5 py-2.5 rounded-lg border border-slate-350 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#0369A1] text-sm font-semibold transition-colors duration-150 cursor-pointer">
                  Why Choose TSM
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
