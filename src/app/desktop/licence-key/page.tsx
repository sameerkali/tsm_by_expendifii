import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, KeyRound, Mail, Wifi } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { LicenceKeyRequestForm } from '@/components/desktop/LicenceKeyRequestForm';

export const metadata: Metadata = {
  title: 'Free Licence Key for BiltyOne Desktop',
  description: 'Request a free licence key for BiltyOne Desktop for Windows. We email your key, usually within one business day.',
  alternates: { canonical: 'https://biltyone.com/desktop/licence-key' },
  // Reached from the download email; the /desktop page is the one to rank.
  robots: { index: false, follow: true },
};

const next = [
  { icon: Mail, text: 'We email your licence key, usually within one business day.' },
  { icon: KeyRound, text: 'Open BiltyOne Desktop and enter the key on the first screen.' },
  { icon: Wifi, text: 'Activation needs internet once. After that the app works offline.' },
];

export default function LicenceKeyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#F8FAFC] pt-20 dark:bg-slate-950">
        <section aria-labelledby="licence-heading" className="py-14 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 lg:px-8">
            <div>
              <Link
                href="/desktop"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-[#0369A1] dark:text-slate-400 dark:hover:text-sky-400"
              >
                <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
                BiltyOne Desktop
              </Link>
              <h1
                id="licence-heading"
                className="mt-6 text-4xl leading-[1.1] font-bold tracking-tight text-balance text-slate-900 sm:text-5xl dark:text-white"
              >
                Get your free licence key
              </h1>
              <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                BiltyOne Desktop asks for a licence key the first time you open it. Keys are free. Tell us where to send
                yours.
              </p>

              <h2 className="mt-12 text-sm font-semibold text-slate-900 dark:text-white">What happens next</h2>
              <ul className="mt-5 space-y-5">
                {next.map((n) => (
                  <li key={n.text} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#0369A1] dark:bg-sky-500/10 dark:text-sky-400">
                      <n.icon size={20} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="pt-2 leading-relaxed text-slate-700 dark:text-slate-300">{n.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
              <LicenceKeyRequestForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
