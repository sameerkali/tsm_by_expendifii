import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — TSM by Expendifii',
  description: 'How TSM collects, uses, and protects your personal and operational data.',
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
              Expendifii (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) operates TSM, a Transport Management System available at tsm.expendifii.com. This Privacy Policy explains how we collect, use, and protect your information. Expendifii is currently an unregistered business operating in India.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We collect the following information:</p>
            <ul>
              <li><strong>Account data:</strong> Your name, email address, and company name when you register.</li>
              <li><strong>Operational data:</strong> GRs, customer records, and other data you create within TSM.</li>
              <li><strong>Usage data:</strong> Basic log data including IP address, browser type, and timestamps for security purposes.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>To provide and run the TSM platform.</li>
              <li>To help you create, manage, and print GRs and related records.</li>
              <li>To send essential communications account alerts, product updates.</li>
              <li>To improve the product based on how it&apos;s used.</li>
              <li>To comply with applicable legal obligations.</li>
            </ul>

            <h2>4. Data Sharing</h2>
            <p>We do not sell, rent, or trade your data. Period. We share data only with:</p>
            <ul>
              <li><strong>Service providers:</strong> Hosting and infrastructure partners bound by confidentiality.</li>
              <li><strong>Legal authorities:</strong> Only when required by Indian law or a valid court order.</li>
            </ul>

            <h2>5. Data Retention</h2>
            <p>
              Your data is retained as long as your account is active. You may request deletion at any time by emailing <a href="mailto:expendifiii@gmail.com">expendifiii@gmail.com</a> or <a href="mailto:work.sameerfaridi@gmail.com">work.sameerfaridi@gmail.com</a>. Requests are processed within 7 business days.
            </p>

            <h2>6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data; export your data in a usable format; withdraw consent at any time by contacting us.</p>

            <h2>7. Security</h2>
            <p>
              We use encryption in transit and at rest to protect your data. See our <a href="/security">Security page</a> for full details.
            </p>

            <h2>8. Cookies</h2>
            <p>
              We use only necessary cookies for session management. No advertising or third-party tracking cookies.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We&apos;ll notify you by email at least 14 days before any material changes take effect.
            </p>

            <h2>10. Contact</h2>
            <p>
              For privacy-related questions, email us at <a href="mailto:expendifiii@gmail.com">expendifiii@gmail.com</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

