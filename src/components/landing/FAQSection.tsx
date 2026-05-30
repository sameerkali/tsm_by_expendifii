'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFAQ(index);
    }
  };

  return (
    <section 
      id="faq" 
      className="py-24 sm:py-32 bg-[#F8FAFC] dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800/80 relative overflow-hidden" 
      aria-labelledby="faq-heading"
    >
      {/* Decorative Background Elements */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-400/5 dark:bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400/5 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Asymmetric Left Sticky Column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200/50 dark:border-sky-500/10 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-400">
                <HelpCircle className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Common Questions</span>
              </div>
              
              <div className="space-y-4">
                <h2 id="faq-heading" className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  Clear answers for <span className="text-[#0369A1] dark:text-sky-400">busy transporters.</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md">
                  We know you don't have time for complicated setup. Here is everything you need to know about TSM in simple words.
                </p>
              </div>

              {/* Premium CTA Card */}
              <div className="relative group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div aria-hidden="true" className="absolute -right-10 -bottom-10 w-32 h-32 bg-emerald-500/10 dark:bg-emerald-500/5 blur-2xl rounded-full group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                <div className="flex gap-4 items-start relative z-10">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Still have questions?</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">
                      Can't find the answer you are looking for? Get in touch with Sameer and our support team.
                    </p>
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0369A1] dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors group/link cursor-pointer"
                    >
                      Contact support
                      <span className="inline-block transform group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Dynamic Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.q}
                  className={`group rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? 'border-[#0369A1] dark:border-sky-500/40 bg-white dark:bg-slate-950 shadow-md shadow-[#0369A1]/5 dark:shadow-sky-500/2'
                      : 'border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/30 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-950 hover:shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 sm:px-8 text-left cursor-pointer"
                  >
                    <span className={`text-base font-bold transition-colors duration-200 leading-snug ${
                      isOpen ? 'text-[#0369A1] dark:text-sky-400' : 'text-slate-900 dark:text-slate-100 group-hover:text-slate-950 dark:group-hover:text-white'
                    }`}>
                      {faq.q}
                    </span>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                      isOpen 
                        ? 'bg-sky-50 dark:bg-sky-950/50 text-[#0369A1] dark:text-sky-400 rotate-180' 
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                    }`}>
                      <ChevronDown className="h-4.5 w-4.5" />
                    </span>
                  </button>

                  {/* Dynamic Height, Opacity, and Slide Transition */}
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className={`px-6 pb-6 pt-2 sm:px-8 sm:pb-7 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-900/50 transform transition-transform duration-300 ease-out ${
                      isOpen ? 'translate-y-0' : '-translate-y-2'
                    }`}>
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
