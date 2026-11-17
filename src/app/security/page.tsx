import type { Metadata } from 'next';
import { buildPageMetadata, pageJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { FaqList } from '@/components/content/ContentPage';
import { CONTACT } from '@/config/site';

export const metadata: Metadata = buildPageMetadata('/security');

const practices = [
  {
    title: 'Encrypted in Transit',
    body: 'Every piece of data between your browser and our servers is encrypted. Nobody can intercept it.',
  },
  {
    title: 'Encrypted at Rest',
    body: 'Your GR records, customer data, and account information are stored encrypted. Even if someone got into our database, your data would be unreadable.',
  },
  {
    title: 'Role-Based Access',
    body: 'Admins see everything. Other users only see what they need. No accidental access, no data leakage between roles.',
  },
  {
    title: 'Your Data is Yours',
    body: 'We do not sell, share, or use your operational data for anything beyond running BiltyOne for you. It belongs to you, and you can export it or request deletion at any time.',
  },
  {
    title: 'Secure Credentials',
    body: 'Passwords are hashed and never stored in plain text. We recommend using a strong, unique password for your BiltyOne account.',
  },
  {
    title: 'Ongoing Improvements',
    body: 'BiltyOne is actively developed. Security updates and patches are applied as a priority, not an afterthought.',
  },
];

// Only protections that can be checked from outside (response headers) or
// that CORE_APP_SPEC.md documents. Do not add claims the backend can't back.
const safeguards = [
  {
    title: 'HTTPS on every page',
    body: 'Every page and API request travels over HTTPS, and browsers are told to always use a secure connection to BiltyOne (HSTS), so nobody on the same Wi-Fi can read or change it.',
  },
  {
    title: 'Sign-in kept away from scripts',
    body: 'Your session lives in an httpOnly cookie, which scripts running on the page cannot read.',
  },
  {
    title: 'Every request is checked',
    body: 'The server checks your sign-in on every request and only returns GRs, customers and settings that belong to your company account.',
  },
  {
    title: 'No look-alike pages',
    body: 'BiltyOne cannot be loaded inside another website’s frame, and a Content Security Policy limits where the app can load code from.',
  },
];

const exits = [
  {
    title: 'Back up any time',
    body: 'Download every GR as one Excel workbook from Settings, even if your plan is not active.',
  },
  {
    title: 'Deletions stay deleted',
    body: 'A deleted GR disappears from lists, search, PDFs, statements and exports, and its number is never given to another GR.',
  },
  {
    title: 'Close your account',
    body: 'Request account deletion from Settings. Once approved, your account and all company data are permanently deleted.',
  },
  {
    title: 'Offline app on your PC',
    body: 'BiltyOne Desktop keeps records in a database on your own computer, saves automatic backups to a folder you choose, and sends a backup copy to BiltyOne once a week when online.',
  },
];

// 40-60 word answers, distinct from questions marked up on other pages.
const faqs = [
  {
    q: 'Does BiltyOne sell or share my transport data?',
    a: 'No. Your GRs, customers and company details are used only to run BiltyOne for you. We do not sell them, share them with other transporters or use them for advertising. You can download everything as an Excel backup at any time, and our privacy policy explains exactly what we collect.',
  },
  {
    q: 'How do I delete my BiltyOne account?',
    a: 'Open Settings and choose Delete Account. Once the request is approved, your account and all company data are permanently deleted and cannot be recovered, so download an Excel backup first. While the request is pending you cannot create or edit records, but you can still print and export them.',
  },
  {
    q: 'How do I report a security problem in BiltyOne?',
    a: `Email ${CONTACT.email} with the subject line "Security Issue" and a short description of what you found and how to reproduce it. We take every report seriously and reply as quickly as possible. Please give us time to fix the problem before sharing it publicly.`,
  },
];

function CheckList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
      {items.map((it) => (
        <li key={it.title} className="flex gap-3">
          <svg className="mt-1 shrink-0 text-[#0369A1] dark:text-sky-400" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12.5L10 17.5L19 7" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong className="block font-semibold text-[#0F172A] dark:text-white">{it.title}</strong>
            {it.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function SecurityPage() {
  return (
    <>
      <JsonLd data={pageJsonLd('/security', { faqs })} />
      <Navbar />
      <main id="main-content" className="pt-20 bg-[#F8FAFC] dark:bg-slate-950 [background-image:linear-gradient(to_right,rgba(226,232,240,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.5)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.5)_1px,transparent_1px)] [background-size:48px_48px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-20 sm:py-24">
          <div aria-hidden="true" className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:48px_48px] opacity-50" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 to-[#F8FAFC] dark:to-slate-950" />
          <div className="relative mx-auto max-w-2xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-4">Security</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-4">Your data. Always safe.</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Paper GRs can burn, get soaked, or go missing. Your data in BiltyOne won&apos;t. Here&apos;s exactly how we protect it, with no technical jargon.
            </p>
          </div>
        </section>

        {/* Practices */}
        <section className="py-20 bg-white dark:bg-slate-950" aria-labelledby="security-practices-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 id="security-practices-heading" className="sr-only">Security Practices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {practices.map((p) => (
                <div key={p.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 p-6 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-900 hover:border-[#0369A1]/30 dark:hover:border-sky-500/30 transition-all duration-200">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F172A] dark:bg-[#0369A1]/20 text-white dark:text-sky-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 22C12 22 3 16 3 9C3 7.14348 3.7375 5.36301 5.05025 4.05025C6.36301 2.7375 8.14348 2 10 2H14C15.8565 2 17.637 2.7375 18.9497 4.05025C20.2625 5.36301 21 7.14348 21 9C21 16 12 22 12 22Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-[#0F172A] dark:text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verifiable safeguards and data exit */}
        <section className="py-20 bg-[#F8FAFC] dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" aria-labelledby="safeguards-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 id="safeguards-heading" className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white tracking-tight">
              What protects your account
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
              These protections are switched on for every BiltyOne account. You don&apos;t need to set anything up.
            </p>
            <CheckList items={safeguards} />

            <h2 id="exit-heading" className="mt-16 text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white tracking-tight">
              Your data, your exit
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
              Software you can&apos;t leave is a risk too. BiltyOne makes it easy to take your records with you.
            </p>
            <CheckList items={exits} />
          </div>
        </section>

        <section className="pb-20 bg-white dark:bg-slate-950" aria-label="Security questions">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <FaqList faqs={faqs} title="Security: common questions" />
          </div>
        </section>

        {/* Report a vulnerability */}
        <section className="py-16 bg-[#F8FAFC] dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-3">Found a security issue?</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              We take every report seriously. If you discover a vulnerability, please email us at <a href={`mailto:${CONTACT.email}`} className="text-[#0369A1] dark:text-sky-400 hover:underline">{CONTACT.email}</a> with the subject line &ldquo;Security Issue&rdquo; and we&apos;ll respond as quickly as possible.
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0F172A] dark:bg-[#0369A1] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0369A1] dark:hover:bg-sky-600 transition-colors duration-200 cursor-pointer"
            >
              {CONTACT.email}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
