import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Cookie Policy — TSM by Expendifii',
  description: 'How TSM uses cookies for session management and analytics on our platform.',
  alternates: { canonical: 'https://tsm.expendifii.com/cookie-policy' },
};

const lastUpdated = 'June 2025';

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-16 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:48px_48px] opacity-50" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 to-[#F8FAFC] dark:to-slate-950" />
          <div className="relative mx-auto max-w-2xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-4">Legal</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-3">Cookie Policy</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="py-16 sm:py-20 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 prose prose-slate dark:prose-invert prose-sm sm:prose-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They allow the site to recognise your device and remember certain information across sessions. TSM uses only first-party cookies — we do not place third-party advertising or tracking cookies on your device.
            </p>

            <h2>2. Cookies We Use</h2>
            <p>We use two categories of cookies:</p>
            <ul>
              <li>
                <strong>Necessary Cookies</strong> — Required for the platform to function. These enable secure sign-in, session management, and CSRF protection. They cannot be disabled.
              </li>
              <li>
                <strong>Analytics Cookies</strong> — Help us understand how the platform is used (page visits, navigation patterns, errors). This data is anonymous and used solely to improve TSM.
              </li>
            </ul>

            <h2>3. What We Do Not Use</h2>
            <p>
              We do not use marketing, advertising, or cross-site tracking cookies. We do not sell or share cookie data with third-party advertisers.
            </p>

            <h2>4. Managing Your Preferences</h2>
            <p>
              When you first visit TSM, a banner will appear asking for your consent to analytics cookies. You can change your preference at any time in{' '}
              <strong>Settings → Cookie Preferences</strong>.
            </p>
            <p>
              You can also control or delete cookies through your browser settings. Note that disabling necessary cookies will prevent you from logging in to TSM.
            </p>

            <h2>5. Changes to This Policy</h2>
            <p>
              We may update this policy when our cookie usage changes. We will notify you via the consent banner if any significant change is made.
            </p>

            <h2>6. Contact</h2>
            <p>
              For questions about how we use cookies, email us at{' '}
              <a href="mailto:expendifiii@gmail.com">expendifiii@gmail.com</a>.
            </p>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
