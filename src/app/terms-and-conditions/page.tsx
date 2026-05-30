import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Terms & Conditions — TSM by Expendifii',
  description: 'Read the TSM Terms and Conditions governing use of the platform provided by Expendifii Technologies.',
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
            <p>By accessing or using TSM (&ldquo;the Platform&rdquo;), operated by Expendifii Technologies (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the Platform.</p>

            <h2>2. Platform Description</h2>
            <p>TSM is a B2B Transport Management System that enables logistics businesses to manage jobs, fleets, drivers, billing, and customer communications through a unified dashboard.</p>

            <h2>3. Account Registration</h2>
            <p>To use TSM, you must register for an account. You agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account.</p>

            <h2>4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Platform for any unlawful purpose or in violation of applicable regulations.</li>
              <li>Interfere with or disrupt the integrity or performance of the Platform.</li>
              <li>Attempt to gain unauthorised access to any part of the Platform.</li>
              <li>Scrape, harvest, or extract data from the Platform without written permission.</li>
              <li>Resell or sublicense the Platform without a written agreement from us.</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>All content, trademarks, and software comprising the Platform are the property of Expendifii Technologies. You are granted a limited, non-exclusive, non-transferable licence to use the Platform for your internal business operations only.</p>

            <h2>6. Payment &amp; Billing</h2>
            <p>Paid plans are billed in advance on a monthly or annual basis. Invoices are due upon receipt. Non-payment may result in suspension of your account. Refunds are not provided for partial periods unless required by applicable law.</p>

            <h2>7. Availability &amp; Uptime</h2>
            <p>We target 99.9% monthly uptime. Scheduled maintenance windows are communicated in advance. We are not liable for downtime caused by third-party infrastructure providers or events outside our reasonable control.</p>

            <h2>8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Expendifii Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Platform.</p>

            <h2>9. Termination</h2>
            <p>Either party may terminate the agreement at any time. Upon termination, your access to the Platform will be disabled and your data will be retained for 30 days before deletion, during which you may request an export.</p>

            <h2>10. Governing Law</h2>
            <p>These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.</p>

            <h2>11. Changes to Terms</h2>
            <p>We may revise these Terms at any time. We will notify you via email at least 14 days before material changes take effect. Continued use of the Platform after the effective date constitutes acceptance of the updated Terms.</p>

            <h2>12. Contact</h2>
            <p>For questions about these Terms, contact us at <a href="mailto:legal@expendifii.com">legal@expendifii.com</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
