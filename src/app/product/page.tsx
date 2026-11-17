import type { Metadata } from 'next';
import { buildPageMetadata, pageJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { DataTable, FaqList } from '@/components/content/ContentPage';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { LiveDemoLink } from '@/components/shared/LiveDemoLink';

export const metadata: Metadata = buildPageMetadata('/product');

// Screen-by-screen tour. Matches the four tabs and dashboard described in
// CORE_APP_SPEC.md; update when screens change.
const screens = [
  {
    id: 'gr-tab',
    name: 'GR tab',
    summary: 'Where every load starts. The landing screen after you sign in.',
    points: [
      'A list of all GRs, newest first, with search by GR number, consignor, consignee, vehicle number or city.',
      'A create panel with every GR field: route, parties with GSTIN, goods, weight or boxes, pricing, vehicle and driver, invoice and e-way bill numbers, insurance and remarks.',
      'Automatic GR number and freight; status buttons for Booked, In Transit and Delivered.',
      'Print (three copies in one PDF), duplicate and delete actions on every row.',
    ],
  },
  {
    id: 'customers-tab',
    name: 'Customers tab',
    summary: 'Your directory of regular consignors.',
    points: [
      'Add a customer once with phone, email, GSTIN, address and a default pricing type and rate.',
      'Pincode lookup fills the city and state.',
      'Each customer has a profile page with tap-to-call, GSTIN copy and billing address.',
    ],
  },
  {
    id: 'printing-tab',
    name: 'Printing tab',
    summary: 'Month-end billing in a few clicks.',
    points: [
      'Pick a customer and a date range.',
      'Download a PDF freight bill: an A4 summary with totals, amount paid and balance due, followed by every GR in the period.',
    ],
  },
  {
    id: 'settings-tab',
    name: 'Settings',
    summary: 'Your company identity and your data.',
    points: [
      'Company profile: name, GSTIN, PAN, phone, address, logo and bank details, printed on every GR and statement.',
      'Bulk data import from an Excel or CSV template, and a one-click Excel backup of all GRs.',
      'Appearance, plan status and sign-out.',
    ],
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    summary: 'The business at a glance.',
    points: ['Total revenue, today’s GRs, active shipments and outstanding amounts, a revenue chart, recent bookings and top customers.'],
  },
];

// The two documents BiltyOne prints. Matches the PDF layouts in
// CORE_APP_SPEC.md section 11; update when the layouts change.
const printouts = [
  {
    id: 'gr-print',
    title: 'The GR, in three copies',
    body: 'One PDF with three A5 landscape pages: the driver copy, consignor copy and consignee copy. Each page carries your logo, company name, GSTIN, PAN, phone and address, then the GR number, date and route; the consignor and consignee with their GSTINs; a goods table with packages, description, weight and freight; and a summary line with the invoice and e-way bill numbers, rate, billing type and total. Vehicle, driver, insurance and remarks print only when you have filled them in.',
  },
  {
    id: 'statement-print',
    title: 'The customer freight bill',
    body: 'Page one is an A4 freight bill: your company details, the customer, a count of GRs by status, a table of every GR in the period, then the total amount, amount paid and balance due, with signature blocks for you and the customer. Every GR follows on its own A5 page, newest first, so the customer can check each load against the bill.',
  },
];

// Day-to-day questions and the screen that answers each one.
const lookups: [string, string][] = [
  ['How is the business doing this month?', 'Dashboard: revenue, today’s GRs, active shipments and outstanding amounts'],
  ['Where is this load?', 'GR tab: search by GR number, party, vehicle number or city, and read the status badge'],
  ['What does this customer owe?', 'Printing tab: download their freight bill for any date range'],
  ['What is this customer’s GSTIN or phone?', 'Customers tab: profile with tap-to-call and one-tap GSTIN copy'],
  ['Is all our data backed up?', 'Settings: download every GR as one Excel workbook'],
];

// 40-60 word answers, distinct from questions marked up on other pages.
const faqs = [
  {
    q: 'What is on the customer freight bill?',
    a: 'Page one is an A4 freight bill with your company details, the customer, every GR in the date range in one table, the total amount, the amount paid and the balance due. Each GR then follows on its own A5 page, newest first, so your customer can check every load against the bill before paying.',
  },
  {
    q: 'Can I try BiltyOne before signing up?',
    a: 'Yes. The live demo opens BiltyOne in guest mode with sample data, with no signup and no credit card. Look through the GR list, customers, printing and dashboard to see how the screens work, then register when you want to use it with your own company details and logo.',
  },
  {
    q: 'Which screen opens first after I sign in?',
    a: 'The GR tab, because creating and finding GRs is most of the day’s work. It lists every GR, newest first, with search by GR number, consignor, consignee, vehicle number or city. The dashboard, customers, printing and settings are one click away in the sidebar.',
  },
];

export default function ProductPage() {
  return (
    <>
      <JsonLd data={pageJsonLd('/product', { aboutSoftware: true, faqs })} />
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
              A tour of BiltyOne <span className="text-[#0369A1] dark:text-sky-400">transport software</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              BiltyOne runs a transport office from five screens: GRs, customers, printing, settings and a dashboard. Here is what each one does, so you know exactly what you get before you sign up.
            </p>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-8 tracking-tight">
              The BiltyOne dashboard
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
                src="/dashboard_img_herosection_straight.avif"
                alt="BiltyOne dashboard with total revenue, today’s GRs, active shipments, outstanding amount, a revenue chart and recent bookings"
                width={1672}
                height={941}
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        {/* Screen-by-screen tour */}
        <section className="py-20 bg-[#F8FAFC] dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" aria-labelledby="tour-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 id="tour-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Screen by screen
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {screens.map((sc) => (
                <section key={sc.id} id={sc.id} aria-labelledby={`${sc.id}-heading`} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6">
                  <h3 id={`${sc.id}-heading`} className="text-lg font-bold text-slate-900 dark:text-white">{sc.name}</h3>
                  <p className="mt-1 text-sm font-medium text-sky-700 dark:text-sky-400">{sc.summary}</p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400 marker:text-sky-600">
                    {sc.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <p className="mt-10 text-slate-600 dark:text-slate-400 leading-relaxed">
              Need to work without internet? <Link href="/desktop" className="font-semibold text-sky-700 dark:text-sky-400 hover:underline">BiltyOne Desktop</Link> brings GR creation, printing and search to Windows, offline. For the full list of capabilities, see{' '}
              <Link href="/features" className="font-semibold text-sky-700 dark:text-sky-400 hover:underline">features</Link>.
            </p>
          </div>
        </section>

        {/* What BiltyOne prints */}
        <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800" aria-labelledby="printouts-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 id="printouts-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              What BiltyOne prints
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
              Two documents leave a transport office every day: the GR that travels with the goods, and the bill that goes to the customer. Both come out of BiltyOne as PDFs that any office printer can handle.
            </p>
            {printouts.map((pr) => (
              <section key={pr.id} id={pr.id} aria-labelledby={`${pr.id}-heading`} className="mt-8">
                <h3 id={`${pr.id}-heading`} className="text-lg font-bold text-slate-900 dark:text-white">{pr.title}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">{pr.body}</p>
              </section>
            ))}
          </div>
        </section>

        {/* Which screen answers which question */}
        <section className="py-20 bg-[#F8FAFC] dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" aria-labelledby="lookups-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 id="lookups-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Which screen answers which question
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
              The questions a transport office hears every day, and where BiltyOne keeps the answer.
            </p>
            <DataTable caption="Common transport office questions and the BiltyOne screen that answers each" headers={['Question', 'Where to look']} rows={lookups} />
            <FaqList faqs={faqs} title="Product tour: common questions" />
          </div>
        </section>

        {/* Ready to leave the paper behind CTA */}
        <section className="bg-[#0F172A] dark:bg-slate-900 py-20 sm:py-24 border-t border-slate-850" aria-labelledby="final-cta-heading">
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
              <Link href="/why-biltyone" className="hover:text-white transition-colors">Why Choose BiltyOne</Link>
              <Link href="/logistics-glossary" className="hover:text-white transition-colors">Logistics Glossary</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
