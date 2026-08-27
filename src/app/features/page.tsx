import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { LiveDemoLink } from '@/components/shared/LiveDemoLink';
import { Card } from '@/components/landing/Card';

export const metadata: Metadata = {
  title: 'Features | Modern Transport Management System',
  description:
    'Explore the powerful features of BiltyOne: fast digital GR creation, three-copy print layouts, permanent search archive, and analytics built for Indian transporters.',
  alternates: { canonical: 'https://biltyone.com/features' },
};

const featureDetails = [
  {
    id: '01',
    title: 'Instant Digital GR Creation',
    description: 'Create goods receipts and lorry receipts in under 2 minutes. Auto-fill recurring consignor and consignee details, and calculate freight rates dynamically.',
  },
  {
    id: '02',
    title: 'Customisable Lorry Receipt Print layouts',
    description: 'Choose which fields to show on printouts. Support for standard three-copy layouts (Driver, Consignor, Consignee) that match your existing formats.',
  },
  {
    id: '03',
    title: 'Permanent Search & Records Archive',
    description: 'Every GR is stored securely on the cloud. Instantly search and retrieve historic shipments by GR number, date, consignor name, or vehicle number.',
  },
  {
    id: '04',
    title: 'Transporter Analytics Dashboard',
    description: 'Get real-time visibility into active jobs, pending invoices, vehicle locations, and fleet on-time performance metrics in one simple screen.',
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20 bg-[#F8FAFC] dark:bg-slate-950 [background-image:linear-gradient(to_right,rgba(226,232,240,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.5)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.5)_1px,transparent_1px)] [background-size:48px_48px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-20 sm:py-28">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[48px_48px] opacity-50"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 to-[#F8FAFC] dark:to-slate-950" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white mb-6">
              Everything you need to create, print, and manage <span className="text-[#0369A1] dark:text-sky-400">your GRs</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              BiltyOne replaces manual paperwork, lost physical logs, and error-prone Excel sheets with one simple, modern system built for transporters.
            </p>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featureDetails.map((feat) => (
                <Card key={feat.id} id={feat.id} title={feat.title} description={feat.description} />
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Image */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC] dark:bg-slate-900 border-t border-b border-slate-200 dark:border-slate-800" aria-label="Product screenshot">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 overflow-hidden shadow-xl">
              <div className="p-4 sm:p-6">
                <Image
                  src="/landingImg01.webp"
                  alt="BiltyOne dashboard showing GR management, active jobs, and fleet status overview for Indian transport businesses"
                  width={1200}
                  height={675}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>
              <div className="px-6 pb-6">
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  BiltyOne transport management system dashboard
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA block */}
        <section className="bg-[#0F172A] dark:bg-slate-900 py-20 sm:py-24 border-t border-slate-800" aria-labelledby="final-cta-heading">
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
                id="features-cta-primary"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0369A1] px-7 py-4 text-sm font-semibold text-white shadow-lg hover:bg-sky-600 transition-colors duration-200 cursor-pointer"
              >
                Get Started Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <LiveDemoLink
                id="features-cta-demo"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-7 py-4 text-sm font-semibold text-slate-300 hover:border-sky-500 hover:text-sky-400 transition-colors duration-200 cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" />
                </svg>
                See a live demo, no signup
              </LiveDemoLink>
            </div>
            <div className="mt-12 pt-6 border-t border-slate-800 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/product" className="hover:text-white transition-colors">Product Overview</Link>
              <Link href="/why-tsm" className="hover:text-white transition-colors">Why Choose BiltyOne</Link>
              <Link href="/logistics-glossary" className="hover:text-white transition-colors">Logistics Glossary</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
