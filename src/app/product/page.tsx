import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { LiveDemoLink } from '@/components/shared/LiveDemoLink';

export const metadata: Metadata = {
  title: 'Product Overview',
  description:
    'Take a detailed tour of BiltyOne: view the dashboard interface, live fleet status tracker, active job logs, and smart invoice management built for Indian logistics.',
  alternates: { canonical: 'https://biltyone.com/product' },
};

export default function ProductPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20 bg-[#F8FAFC] dark:bg-slate-950 [background-image:linear-gradient(to_right,rgba(226,232,240,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.5)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.5)_1px,transparent_1px)] [background-size:48px_48px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-20 sm:py-28">
          <div
            aria-hidden="true"
            className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:48px_48px] opacity-50"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 to-[#F8FAFC] dark:to-slate-950" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white mb-6">
              Everything you need to run your <span className="text-[#0369A1] dark:text-sky-400">transport business</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              BiltyOne gives you one dashboard to run daily operations, track jobs, monitor vehicle status, and keep an eye on invoices, with no more digging through manual record books.
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
                  biltyone.com/dashboard
                </div>
              </div>
              <Image
                src="/dashboard_img_herosection_straight.webp"
                alt="BiltyOne dashboard showing revenue overview, active shipments, and recent GRs"
                width={1672}
                height={941}
                className="h-auto w-full"
              />
            </div>
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
              <LiveDemoLink
                id="product-cta-demo"
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
              <Link href="/features" className="hover:text-white transition-colors">Features list</Link>
              <Link href="/why-biltypro" className="hover:text-white transition-colors">Why Choose BiltyOne</Link>
              <Link href="/logistics-glossary" className="hover:text-white transition-colors">Logistics Glossary</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
