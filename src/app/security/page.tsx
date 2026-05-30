import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Security — TSM by Expendifii',
  description: 'Learn how TSM keeps your transport data safe with industry-standard encryption, access controls, and data governance practices.',
  alternates: { canonical: 'https://tsm.expendifii.com/security' },
};

const practices = [
  {
    title: 'Encryption in Transit & At Rest',
    body: 'All data transferred between your browser, our APIs, and our databases is encrypted using TLS 1.2+. Data at rest is encrypted using AES-256.',
  },
  {
    title: 'Role-Based Access Control',
    body: 'Granular permissions ensure every user only sees what they need to. Admins, dispatchers, drivers, and customers each have isolated access scopes.',
  },
  {
    title: 'Audit Logs',
    body: 'Every action in TSM is logged with timestamp, user, and IP. You can export audit trails for compliance and incident investigation at any time.',
  },
  {
    title: 'SOC-2 Aligned Practices',
    body: 'Our infrastructure and processes are aligned with SOC-2 Type II controls for security, availability, and confidentiality.',
  },
  {
    title: 'Regular Security Testing',
    body: 'We run automated dependency scanning, static analysis, and periodic third-party penetration tests. Critical vulnerabilities are patched within 24 hours.',
  },
  {
    title: 'Data Ownership & Portability',
    body: 'Your data belongs to you, always. You can export everything at any time. We never share or sell your operational data to third parties.',
  },
];

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-20 sm:py-24">
          <div aria-hidden="true" className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:48px_48px] opacity-50" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 to-[#F8FAFC] dark:to-slate-950" />
          <div className="relative mx-auto max-w-2xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-4">Security</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-4">Your data. Locked down.</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              We treat your operational data with the same care we&apos;d want applied to our own. Here&apos;s exactly how we protect it.
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

        {/* Report a vulnerability */}
        <section className="py-16 bg-[#F8FAFC] dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-3">Found a vulnerability?</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              We run a responsible disclosure programme. If you discover a security issue, please email us directly and we&apos;ll respond within 24 hours.
            </p>
            <a
              href="mailto:security@expendifii.com"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0F172A] dark:bg-[#0369A1] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0369A1] dark:hover:bg-sky-600 transition-colors duration-200 cursor-pointer"
            >
              security@expendifii.com
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
