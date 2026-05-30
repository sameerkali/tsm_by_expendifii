import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'User Agreement — TSM by Expendifii',
  description: 'The TSM User Agreement governing your use of accounts, roles, driver access, and customer portals within the platform.',
  alternates: { canonical: 'https://tsm.expendifii.com/user-agreement' },
};

const lastUpdated = 'May 2025';

export default function UserAgreementPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <section className="relative overflow-hidden bg-[#F8FAFC] border-b border-slate-200 py-16 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:48px_48px] opacity-50" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 to-[#F8FAFC]" />
          <div className="relative mx-auto max-w-2xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] mb-4">Legal</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A] mb-3">User Agreement</h1>
            <p className="text-sm text-slate-500">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 prose prose-slate prose-sm sm:prose-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <h2>1. Purpose of This Agreement</h2>
            <p>
              This User Agreement supplements our Terms and Conditions and governs the specific obligations, rights, and responsibilities of individual users accessing TSM — including administrators, dispatchers, drivers, and customers.
            </p>

            <h2>2. User Roles & Permissions</h2>
            <p>TSM uses a role-based access model. Your role determines what data you can view and what actions you can take:</p>
            <ul>
              <li><strong>Admin:</strong> Full access to all platform features, user management, and billing.</li>
              <li><strong>Dispatcher:</strong> Create and manage jobs, assign drivers, view fleet status.</li>
              <li><strong>Driver:</strong> View assigned jobs, navigate, capture proof of delivery, update status.</li>
              <li><strong>Customer:</strong> Track shipments via the customer portal. Read-only access to their orders.</li>
            </ul>

            <h2>3. Account Credentials</h2>
            <p>
              You are solely responsible for maintaining the confidentiality of your login credentials. You must notify us immediately at security@expendifii.com if you suspect unauthorised access to your account. We will never ask for your password via email or phone.
            </p>

            <h2>4. Driver-Specific Obligations</h2>
            <p>Drivers using the TSM mobile interface agree to:</p>
            <ul>
              <li>Only access the platform while lawfully permitted to use a mobile device (e.g., not while driving).</li>
              <li>Accurately capture proof of delivery and report exceptions promptly.</li>
              <li>Not share their login credentials with any other individual.</li>
              <li>Use the GPS tracking feature honestly and only during active job shifts.</li>
            </ul>

            <h2>5. Data You Submit</h2>
            <p>
              You retain ownership of all data you submit to TSM. By submitting data, you grant us a limited licence to process that data to provide the platform&apos;s services. We do not use your submitted data for any purpose outside of service delivery.
            </p>

            <h2>6. Prohibited Conduct</h2>
            <p>All users agree not to:</p>
            <ul>
              <li>Submit false, misleading, or fraudulent information.</li>
              <li>Attempt to access accounts or data belonging to other users.</li>
              <li>Use the platform to harass, impersonate, or harm any individual.</li>
              <li>Introduce malware, viruses, or any harmful code into the platform.</li>
            </ul>

            <h2>7. Account Suspension & Termination</h2>
            <p>
              We reserve the right to suspend or terminate any user account that violates this Agreement, with or without prior notice, depending on the severity of the violation. You may appeal suspension decisions by emailing support@expendifii.com.
            </p>

            <h2>8. Feedback & Suggestions</h2>
            <p>
              Any feedback, ideas, or suggestions you share with us may be used by Expendifii Technologies without obligation, compensation, or restriction of any kind.
            </p>

            <h2>9. Changes to This Agreement</h2>
            <p>
              We may update this Agreement periodically. Continued use of the Platform after the effective date of changes constitutes acceptance. We will notify you of material changes by email at least 14 days in advance.
            </p>

            <h2>10. Contact</h2>
            <p>
              For questions regarding this Agreement, email us at <a href="mailto:legal@expendifii.com">legal@expendifii.com</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
