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
  const [openIndex, setOpenIndex] = useState<number | null>(
    faqs.length > 0 ? faqs.length - 2 : null
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFAQ(index);
    }
  };

  const leftFaqs = faqs.filter((_, i) => i % 2 === 0);
  const rightFaqs = faqs.filter((_, i) => i % 2 !== 0);

  return (
    <section 
      id="faq" 
      className="py-24 sm:py-32 bg-[#F8FAFC] dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800/80 relative overflow-hidden" 
      aria-labelledby="faq-heading"
    >
      {/* Decorative Background Elements */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-400/5 dark:bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-400/5 dark:bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200/50 dark:border-sky-500/10 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-400 mb-4">
            <HelpCircle className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Frequently Asked Questions</span>
          </div>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Clear answers for <span className="text-[#0369A1] dark:text-sky-400">busy transporters.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Have questions about TSM by Expendifii? Here are the detailed answers to help you digitise your transport operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Left Column */}
          <div className="space-y-4">
            {leftFaqs.map((faq, i) => {
              const originalIndex = i * 2;
              const isOpen = openIndex === originalIndex;
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
                    onClick={() => toggleFAQ(originalIndex)}
                    onKeyDown={(e) => handleKeyDown(e, originalIndex)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${originalIndex}`}
                    id={`faq-question-${originalIndex}`}
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

                  {/* Smooth Collapse Container */}
                  <div
                    id={`faq-answer-${originalIndex}`}
                    role="region"
                    aria-labelledby={`faq-question-${originalIndex}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className={`px-6 pb-6 pt-2 sm:px-8 sm:pb-7 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-900/50 transform transition-transform duration-300 ease-out ${
                        isOpen ? 'translate-y-0' : '-translate-y-2'
                      }`}>
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightFaqs.map((faq, i) => {
              const originalIndex = i * 2 + 1;
              const isOpen = openIndex === originalIndex;
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
                    onClick={() => toggleFAQ(originalIndex)}
                    onKeyDown={(e) => handleKeyDown(e, originalIndex)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${originalIndex}`}
                    id={`faq-question-${originalIndex}`}
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

                  {/* Smooth Collapse Container */}
                  <div
                    id={`faq-answer-${originalIndex}`}
                    role="region"
                    aria-labelledby={`faq-question-${originalIndex}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className={`px-6 pb-6 pt-2 sm:px-8 sm:pb-7 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-900/50 transform transition-transform duration-300 ease-out ${
                        isOpen ? 'translate-y-0' : '-translate-y-2'
                      }`}>
                        {faq.a}
                      </div>
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
