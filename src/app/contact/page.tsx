'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { toast } from 'sonner';
import apiClient from '@/lib/api/client';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      !form.name.trim() &&
      !form.email.trim() &&
      !form.phone.trim() &&
      !form.company.trim() &&
      !form.message.trim()
    ) {
      toast.error('Please fill in at least one field.');
      return;
    }

    try {
      setStatus('loading');
      await apiClient.post('/contact', {
        name: form.name.trim() || undefined,
        email: form.email.trim() || undefined,
        phone: form.phone.trim() || undefined,
        companyName: form.company.trim() || undefined,
        message: form.message.trim() || undefined,
      });
      setStatus('success');
    } catch (err: unknown) {
      console.error(err);
      setStatus('idle');
      const message =
        err instanceof Error && err.message
          ? err.message
          : 'Failed to send message. Please try again.';
      toast.error(message);
    }
  };

  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-20 sm:py-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:48px_48px] opacity-50"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 to-[#F8FAFC] dark:to-slate-950" />
          <div className="relative mx-auto max-w-2xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-4">Contact Us</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-4 leading-tight">
              Let&apos;s talk about your operations
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Whether you have a quick question or want a full demo &mdash; our team is here and responds within one business day.
            </p>
          </div>
        </section>

        {/* Contact grid */}
        <section className="py-16 sm:py-24 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left — info */}
            <aside className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-3">Get in touch</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Use the form for general inquiries, demos, or partnership requests. For urgent support, log in to your account and use the in-app chat.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
                      </svg>
                    ),
                    label: 'Email',
                    value: 'hello@expendifii.com',
                    href: 'mailto:work.sameerfaridi@gmail.com',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.75" />
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                      </svg>
                    ),
                    label: 'Response time',
                    value: 'Within 1 business day',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8FAFC] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-medium text-[#0369A1] dark:text-sky-400 hover:underline cursor-pointer">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-[#0F172A] dark:text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-900 p-5">
                <p className="text-sm font-semibold text-[#0F172A] dark:text-white mb-2">Looking for support?</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  Existing customers can access priority support directly from within their TSM dashboard.
                </p>
                <Link href="/login" className="text-sm font-semibold text-[#0369A1] dark:text-sky-400 hover:underline cursor-pointer">
                  Sign in to your account &rarr;
                </Link>
              </div>
            </aside>

            {/* Right — form */}
            <div className="lg:col-span-3">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8 rounded-2xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 13L9 17L19 7" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-2">Message sent!</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                    Thanks for reaching out. We&apos;ll get back to you at <strong>{form.email}</strong> within one business day.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-900 p-8 space-y-5"
                  noValidate
                  aria-label="Contact form"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-[#0F172A] dark:text-white mb-1.5">
                        Full name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Rajiv Mehta"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0369A1]/40 focus:border-[#0369A1] transition-all duration-150"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-[#0F172A] dark:text-white mb-1.5">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        placeholder="rajiv@company.com"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0369A1]/40 focus:border-[#0369A1] transition-all duration-150"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-company" className="block text-sm font-medium text-[#0F172A] dark:text-white mb-1.5">
                        Company name
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        autoComplete="organization"
                        value={form.company}
                        onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                        placeholder="FastMove Logistics Pvt. Ltd."
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0369A1]/40 focus:border-[#0369A1] transition-all duration-150"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-[#0F172A] dark:text-white mb-1.5">
                        Contact number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0369A1]/40 focus:border-[#0369A1] transition-all duration-150"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-[#0F172A] dark:text-white mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      placeholder="Tell us about your fleet size, current setup, or what you'd like to see in a demo..."
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0369A1]/40 focus:border-[#0369A1] transition-all duration-150 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={status === 'loading'}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F172A] dark:bg-[#0369A1] py-3 text-sm font-semibold text-white hover:bg-[#0369A1] dark:hover:bg-sky-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending&hellip;
                      </>
                    ) : (
                      'Send message'
                    )}
                  </button>

                  <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
                    By submitting, you agree to our{' '}
                    <Link href="/privacy-policy" className="underline hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
