import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'User Agreement — TSM by Expendifii',
  description: 'The TSM User Agreement governing roles, responsibilities, and acceptable conduct on the platform.',
  alternates: { canonical: 'https://tsm.expendifii.com/user-agreement' },
};

const lastUpdated = 'May 2026';

export default function UserAgreementPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-16 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:48px_48px] opacity-50" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 to-[#F8FAFC] dark:to-slate-950" />
          <div className="relative mx-auto max-w-2xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-4">Legal</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-3">User Agreement</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 prose prose-slate dark:prose-invert prose-sm sm:prose-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <h2>1. Purpose</h2>
            <p>This agreement covers how individual users — across different roles — are expected to use TSM responsibly.</p>

            <h2>2. Roles &amp; Permissions</h2>
            <p>TSM uses a role-based access model. Your role determines what data you can view and what actions you can take:</p>
            <ul>
              <li><strong>Admin:</strong> Full access — create GRs, manage customers, manage users, access all records.</li>
              <li><strong>Dispatcher:</strong> Create and manage GRs, view customer records.</li>
              <li><strong>Viewer:</strong> Read-only access to records — no creation or editing.</li>
            </ul>

            <h2>3. Your Credentials</h2>
            <p>You are responsible for your login credentials. Do not share your password. If you suspect unauthorised access, contact us immediately at <a href="mailto:expendifiii@gmail.com">expendifiii@gmail.com</a>.</p>

            <h2>4. Accurate Data</h2>
            <p>You agree to submit accurate and honest data. TSM is a record-keeping system — incorrect data defeats its purpose and may create legal or operational problems for your business.</p>

            <h2>5. Prohibited Conduct</h2>
            <p>You must not attempt to access other accounts, inject malicious code, scrape data, or use TSM in any way that could harm other users or the platform.</p>

            <h2>6. Data Ownership</h2>
            <p>All data you create in TSM belongs to you. We process it only to provide the service.</p>

            <h2>7. Suspension</h2>
            <p>We reserve the right to suspend accounts that violate this agreement. If you believe a suspension was made in error, contact us at <a href="mailto:expendifiii@gmail.com">expendifiii@gmail.com</a>.</p>

            <h2>8. Refer &amp; Earn</h2>
            <p>If you refer a fellow transporter and they purchase a paid plan, both of you receive 15 extra days free. Referral rewards are applied automatically.</p>

            <h2>9. Feedback</h2>
            <p>Any feedback or suggestions you share with us may be used to improve TSM — we won&apos;t owe you compensation for it, but we will genuinely listen.</p>

            <h2>10. Updates</h2>
            <p>We&apos;ll notify you at least 14 days before making material changes to this agreement.</p>

            <h2>11. Contact</h2>
            <p>Questions about this agreement? Email us at <a href="mailto:expendifiii@gmail.com">expendifiii@gmail.com</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

