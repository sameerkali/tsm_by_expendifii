import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Terms & Conditions — TSM by Expendifii',
  description: 'The terms governing your use of TSM by Expendifii.',
  alternates: { canonical: 'https://tsm.expendifii.com/terms-and-conditions' },
};

const lastUpdated = 'May 2025';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-16 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:48px_48px] opacity-50" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 to-[#F8FAFC] dark:to-slate-950" />
          <div className="relative mx-auto max-w-2xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-4">Legal</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-3">Terms &amp; Conditions</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 prose prose-slate dark:prose-invert prose-sm sm:prose-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using TSM (&ldquo;the Platform&rdquo;), operated by Expendifii (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), you agree to these Terms and Conditions. Expendifii is currently an unregistered business operating in India.</p>

            <h2>2. Platform Description</h2>
            <p>TSM is a Transport Management System for logistics and transport businesses. It enables GR creation, printing, customer management, and related workflows.</p>

            <h2>3. Account Registration</h2>
            <p>You must provide accurate information when registering. You are responsible for keeping your credentials secure.</p>

            <h2>4. Acceptable Use</h2>
            <p>You agree not to misuse the platform — including submitting false data, attempting unauthorised access, or using TSM for unlawful purposes.</p>

            <h2>5. Intellectual Property</h2>
            <p>All software, design, and content in TSM belongs to Expendifii. You are granted a licence to use the platform for your transport business only.</p>

            <h2>6. Pricing &amp; Billing</h2>
            <p>TSM is currently free. When paid plans are introduced, you will be notified at least 14 days in advance. Billing will be on a subscription basis — monthly or annual.</p>

            <h2>7. Availability</h2>
            <p>We aim to keep TSM available at all times. Planned maintenance will be communicated in advance. We are not liable for brief unplanned downtime.</p>

            <h2>8. Limitation of Liability</h2>
            <p>Expendifii is not liable for indirect or consequential damages arising from use of the platform.</p>

            <h2>9. Termination</h2>
            <p>You may delete your account at any time. We reserve the right to suspend accounts that violate these terms. Data is retained for 30 days post-termination before deletion.</p>

            <h2>10. Governing Law</h2>
            <p>These terms are governed by the laws of India.</p>

            <h2>11. Changes to Terms</h2>
            <p>Material changes will be communicated at least 14 days in advance.</p>

            <h2>12. Contact</h2>
            <p>For questions about these terms, email us at <a href="mailto:expendifiii@gmail.com">expendifiii@gmail.com</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

