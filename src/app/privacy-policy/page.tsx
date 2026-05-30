import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — TSM by Expendifii',
  description: 'Read the TSM Privacy Policy to understand how we collect, use, and protect your personal and operational data.',
  alternates: { canonical: 'https://tsm.expendifii.com/privacy-policy' },
};

const lastUpdated = 'May 2025';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-16 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:48px_48px] opacity-50" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 to-[#F8FAFC] dark:to-slate-950" />
          <div className="relative mx-auto max-w-2xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-4">Legal</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-3">Privacy Policy</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 prose prose-slate dark:prose-invert prose-sm sm:prose-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <h2>1. Introduction</h2>
            <p>
              Expendifii Technologies (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) operates TSM, a Transport Management System available at tsm.expendifii.com. This Privacy Policy explains how we collect, use, disclose, and protect information about you when you use our platform.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We collect the following categories of information:</p>
            <ul>
              <li><strong>Account data:</strong> Name, email address, company name, and role when you register.</li>
              <li><strong>Operational data:</strong> Jobs, routes, vehicles, invoices, and other records you create within the platform.</li>
              <li><strong>Usage data:</strong> Log data including IP address, browser type, pages visited, and timestamps for security and analytics purposes.</li>
              <li><strong>Location data:</strong> GPS coordinates from driver devices, used exclusively for live tracking and job management.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>To provide, maintain, and improve the TSM platform.</li>
              <li>To process and manage transport operations, jobs, and billing.</li>
              <li>To send transactional communications (job updates, invoices, alerts).</li>
              <li>To ensure security and prevent fraud.</li>
              <li>To comply with legal obligations.</li>
            </ul>

            <h2>4. Data Sharing</h2>
            <p>We do not sell, rent, or trade your data. We share data only with:</p>
            <ul>
              <li><strong>Service providers:</strong> Hosting, analytics, and payment processors bound by confidentiality agreements.</li>
              <li><strong>Legal authorities:</strong> When required by applicable law or court order.</li>
            </ul>

            <h2>5. Data Retention</h2>
            <p>
              We retain your data for as long as your account is active or as required by law. You may request deletion of your data at any time by contacting us at privacy@expendifii.com. Some data may be retained in anonymised form for statistical purposes.
            </p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access, correct, or delete your personal data.</li>
              <li>Restrict or object to certain processing.</li>
              <li>Export your data in a portable format.</li>
              <li>Withdraw consent at any time where processing is based on consent.</li>
            </ul>

            <h2>7. Security</h2>
            <p>
              We implement industry-standard security measures including TLS encryption, AES-256 encryption at rest, and role-based access controls. See our <a href="/security">Security page</a> for full details.
            </p>

            <h2>8. Cookies</h2>
            <p>
              We use strictly necessary cookies for session management and optional analytics cookies. You may control cookie preferences through your browser settings.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this policy periodically. Material changes will be communicated via email or an in-app notice at least 14 days before they take effect.
            </p>

            <h2>10. Contact</h2>
            <p>
              For privacy-related enquiries, please contact us at <a href="mailto:privacy@expendifii.com">privacy@expendifii.com</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
