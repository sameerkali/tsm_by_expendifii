import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildPageMetadata, pageJsonLd } from '@/lib/seo';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { LiveDemoLink } from '@/components/shared/LiveDemoLink';
import { Card } from '@/components/landing/Card';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = buildPageMetadata('/features');

// Every feature listed here exists in the web app or BiltyOne Desktop today
// (see CORE_APP_SPEC.md). Do not list roadmap items as features.
const groups: { id: string; title: string; lead: string; items: { title: string; description: string }[] }[] = [
  {
    id: 'gr-creation',
    title: 'GR / LR (bilty) creation',
    lead: 'Everything a transporter writes on a GR, in one fast form.',
    items: [
      {
        title: 'Complete GR form',
        description:
          'Booking date, route, consignor and consignee with GSTIN, goods, weight or boxes, declared value, vehicle and driver, invoice and e-way bill numbers, insurance and remarks.',
      },
      {
        title: 'Automatic GR numbers',
        description: 'Every GR gets the next number in your series. Numbers are never edited or reused, even after a deletion.',
      },
      {
        title: 'Automatic freight',
        description: 'Rate × quantity, calculated as you type, priced per KM, box, kg, quintal or ton.',
      },
      {
        title: 'Duplicate for repeat loads',
        description: 'Copy an existing GR to a new one with a fresh number, today’s date and status reset to Booked.',
      },
    ],
  },
  {
    id: 'printing-billing',
    title: 'Printing and billing',
    lead: 'Professional copies and customer bills without retyping anything.',
    items: [
      {
        title: 'Three-copy print',
        description: 'One PDF with driver, consignor and consignee copies on A5 landscape, for any office printer.',
      },
      {
        title: 'Your letterhead on every copy',
        description: 'Company name, logo, GSTIN, PAN, phone and address from your company profile. Optional sections print only when filled.',
      },
      {
        title: 'Customer freight statements',
        description: 'Pick a customer and date range for a PDF bill with totals, amount paid and balance due, plus every GR.',
      },
      {
        title: 'Billing types and payment status',
        description: 'Mark each GR Paid, To Pay or To Be Billed, and track whether its freight is Pending or Paid.',
      },
    ],
  },
  {
    id: 'customers',
    title: 'Customers',
    lead: 'Type a regular customer’s details once, never again.',
    items: [
      {
        title: 'Customer directory',
        description: 'Name, phone, email, GSTIN, address and default pricing for every consignor you work with.',
      },
      {
        title: 'Auto-fill on every GR',
        description: 'Pick a customer and their details and default rate fill in. A new consignor is saved automatically with the GR.',
      },
      {
        title: 'Pincode lookup',
        description: 'Type a 6-digit pincode and the city and state fill in from India Post data.',
      },
      {
        title: 'Customer profiles',
        description: 'Each customer’s phone (tap to call), email, GSTIN with one-tap copy, pricing unit, default rate and billing address.',
      },
    ],
  },
  {
    id: 'records',
    title: 'Records, tracking and data',
    lead: 'Every load stays findable, and your data stays yours.',
    items: [
      {
        title: 'Status tracking',
        description: 'Move each GR from Booked to In Transit to Delivered so anyone in the office can answer customer calls.',
      },
      {
        title: 'Instant search',
        description: 'Find a GR by the start of its number, consignor, consignee, vehicle number or city.',
      },
      {
        title: 'Excel and CSV import',
        description: 'Bring old GRs in from a spreadsheet using the template in Settings; consignors with a GSTIN become customers.',
      },
      {
        title: 'One-click Excel backup',
        description: 'Download every GR as an Excel workbook at any time. No lock-in, no export fee.',
      },
    ],
  },
  {
    id: 'access',
    title: 'Online, offline and at a glance',
    lead: 'Use BiltyOne where you work, on the device you have.',
    items: [
      {
        title: 'Web app on any device',
        description: 'Runs in any modern browser on Windows, Mac, Android or iPhone. Nothing to install.',
      },
      {
        title: 'BiltyOne Desktop (offline)',
        description: 'Free Windows 10/11 app that creates, prints and searches GRs without internet after activation.',
      },
      {
        title: 'Analytics dashboard',
        description: 'Revenue, GRs booked, loads in transit and outstanding payments on one screen.',
      },
      {
        title: 'Secure by default',
        description: 'Encrypted in transit and at rest, with your data never sold or shared.',
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={pageJsonLd('/features', { aboutSoftware: true })} />
      <Navbar />
      <main id="main-content" className="pt-20 bg-white dark:bg-slate-950" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-20 sm:py-28">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[48px_48px] opacity-50"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 to-[#F8FAFC] dark:to-slate-950" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-400">Features</p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white mb-6">
              Transport management software features for <span className="text-[#0369A1] dark:text-sky-400">Indian transporters</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Everything BiltyOne does today: create and print GR/LR (bilty), manage customers, track loads and payments, bill
              customers and keep every record safe, online or offline.
            </p>
            <nav aria-label="Feature groups" className="mt-8 flex flex-wrap justify-center gap-2">
              {groups.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 hover:border-[#0369A1] hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                >
                  {g.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {groups.map((g, i) => (
          <section
            key={g.id}
            id={g.id}
            aria-labelledby={`${g.id}-heading`}
            className={`scroll-mt-24 py-16 sm:py-20 border-b border-slate-200 dark:border-slate-800 ${i % 2 ? 'bg-[#F8FAFC] dark:bg-slate-900' : 'bg-white dark:bg-slate-950'}`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 id={`${g.id}-heading`} className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                {g.title}
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{g.lead}</p>
              <div className="mt-6 grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-4">
                {g.items.map((item, j) => (
                  <Card key={item.title} id={String(i * 4 + j + 1).padStart(2, '0')} title={item.title} description={item.description} />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Product screenshot */}
        <section className="py-16 sm:py-20 bg-white dark:bg-slate-950" aria-labelledby="screenshot-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 id="screenshot-heading" className="sr-only">BiltyOne dashboard screenshot</h2>
            <figure className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 overflow-hidden shadow-xl">
              <div className="p-4 sm:p-6">
                <Image
                  src="/dashboard_img_herosection_straight.avif"
                  alt="BiltyOne dashboard with total revenue, today's GRs, active shipments, outstanding amount, a revenue chart and recent bookings"
                  width={1672}
                  height={941}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                  className="w-full h-auto rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>
              <figcaption className="px-6 pb-6 text-xs text-slate-500 dark:text-slate-400 text-center">
                The BiltyOne dashboard (sample data). See every screen in the{' '}
                <Link href="/product" className="font-semibold text-sky-700 dark:text-sky-400 hover:underline">
                  product tour
                </Link>
                .
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Final CTA block */}
        <section className="bg-[#0F172A] dark:bg-slate-900 py-20 sm:py-24 border-t border-slate-800" aria-labelledby="final-cta-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="final-cta-heading" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Ready to leave the paper behind?
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
              Create your first GR in minutes. Free for early transporters, no credit card needed.
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
              <Link href="/transport-management-system" className="hover:text-white transition-colors">Transport Management System</Link>
              <Link href="/product" className="hover:text-white transition-colors">Product Tour</Link>
              <Link href="/why-biltyone" className="hover:text-white transition-colors">Why BiltyOne</Link>
              <Link href="/lorry-receipt-software" className="hover:text-white transition-colors">Lorry Receipt Software</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
