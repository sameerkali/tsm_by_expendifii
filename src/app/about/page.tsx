import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'About — TSM by Expendifii',
  description:
    'Learn about TSM by Expendifii — our mission is to make transport management transparent, trustworthy, and easy for every logistics team.',
  alternates: { canonical: 'https://tsm.expendifii.com/about' },
};

const values = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 4V2M12 22V20M4 12H2M22 12H20M6.34315 6.34315L4.92893 4.92893M19.0711 19.0711L17.6569 17.6569M6.34315 17.6569L4.92893 19.0711M19.0711 4.92893L17.6569 6.34315" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
    title: 'Transparency',
    description: 'No hidden fees, no black boxes. Every data point, every log, every calculation is visible and auditable by your team.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22C12 22 3 16 3 9C3 7.14348 3.7375 5.36301 5.05025 4.05025C6.36301 2.7375 8.14348 2 10 2H14C15.8565 2 17.637 2.7375 18.9497 4.05025C20.2625 5.36301 21 7.14348 21 9C21 16 12 22 12 22Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Trust',
    description: "Your data is yours. We're SOC-2 aligned, encrypt everything end-to-end, and never sell or share your operational data.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14.5 2H6C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21V6.5L14.5 2Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M14 2V7H19M9 12H15M9 16H15M9 8H10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
    title: 'Easiness',
    description: 'Onboard in 48 hours, not 6 months. Clean interfaces, sensible defaults, and a support team that actually answers.',
  },
];

const team = [
  { name: 'Founders at Expendifii', role: 'Product & Engineering', initials: 'EX' },
  { name: 'Operations Specialists', role: 'Customer Success & Onboarding', initials: 'OS' },
  { name: 'Logistics Veterans', role: 'Domain Expertise & Advisory', initials: 'LV' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#F8FAFC] border-b border-slate-200 py-20 sm:py-28">
          <div
            aria-hidden="true"
            className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:48px_48px] opacity-50"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 to-[#F8FAFC]" />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] mb-4">Our Story</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A] mb-6 leading-tight">
              Built by logistics people, for logistics people
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              TSM was born from frustration. Our founders spent years watching logistics teams drown in WhatsApp messages, misfiled Excel sheets, and phone calls that never get answered. We decided to fix it.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 sm:py-24 bg-white" aria-labelledby="mission-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] mb-4">Mission</p>
                <h2 id="mission-heading" className="text-3xl font-bold text-[#0F172A] tracking-tight mb-5">
                  Operational clarity for every logistics business
                </h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  We believe every transport company — regardless of fleet size — deserves the same visibility and operational control that only large enterprises could previously afford.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  TSM levels the playing field. Whether you run 10 trucks or 1,000, you get a real-time, intelligent command centre that keeps you in control and your customers informed.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-8">
                <div className="space-y-6">
                  {[
                    { num: '2020', label: 'Founded by former logistics ops leads' },
                    { num: '2022', label: 'First enterprise client — 80+ vehicles' },
                    { num: '2024', label: 'Expanded to 500+ managed vehicles' },
                    { num: 'Today', label: 'Trusted by teams across India' },
                  ].map((milestone) => (
                    <div key={milestone.num} className="flex items-start gap-4">
                      <div className="shrink-0 w-16 text-sm font-bold text-[#0369A1]">{milestone.num}</div>
                      <div className="text-sm text-slate-600 leading-relaxed pt-0.5">{milestone.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 sm:py-24 bg-[#F8FAFC] border-y border-slate-200" aria-labelledby="values-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] mb-3">Core Principles</p>
              <h2 id="values-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
                Three values that guide every decision
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((v) => (
                <div key={v.title} className="rounded-2xl border border-slate-200 bg-white p-7 hover:shadow-lg hover:shadow-slate-200/60 hover:border-[#0369A1]/30 transition-all duration-200">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F172A] text-white">
                    {v.icon}
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 sm:py-24 bg-white" aria-labelledby="team-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] mb-3">Who We Are</p>
            <h2 id="team-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-12">
              A focused team obsessed with operations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {team.map((member) => (
                <div key={member.name} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] px-6 py-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0F172A] text-white text-sm font-bold">
                    {member.initials}
                  </div>
                  <p className="text-sm font-semibold text-[#0F172A]">{member.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0F172A] py-20" aria-labelledby="about-cta-heading">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 id="about-cta-heading" className="text-3xl font-bold text-white mb-4">Want to learn more?</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">Reach out — we&apos;re always happy to show you around the platform.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-[#0369A1] px-6 py-3.5 text-sm font-semibold text-white hover:bg-sky-600 transition-colors duration-200 cursor-pointer">
                Contact us →
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-colors duration-200 cursor-pointer">
                Get started free
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
