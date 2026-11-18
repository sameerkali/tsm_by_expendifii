'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

/** Matches the collapse transition (duration-300) on each answer. */
const COLLAPSE_MS = 300;

interface FAQ {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  /** 'h1' when this section is the whole page (/faq); 'h2' when embedded. */
  headingLevel?: 'h1' | 'h2';
}

export default function FAQSection({ faqs, headingLevel = 'h2' }: FAQSectionProps) {
  const Heading = headingLevel;
  const [openIndex, setOpenIndex] = useState<number | null>(
    faqs.length > 0 ? faqs.length - 2 : null
  );

  const sectionRef = useRef<HTMLElement>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Collapsed answers get hidden="until-found": out of the tab order and the
  // accessibility tree, yet Ctrl+F still finds them, and the browser opens
  // the match (see beforematch below). React renders `hidden` only as a
  // boolean, so the value is set here. Opening is immediate; closing waits
  // for the collapse transition so the answer doesn't vanish mid-animation.
  const hasCollapsedOnce = useRef(false);
  useLayoutEffect(() => {
    const answers = sectionRef.current?.querySelectorAll<HTMLElement>('[data-faq-answer]') ?? [];
    const animate = hasCollapsedOnce.current;
    hasCollapsedOnce.current = true;
    const timers: number[] = [];
    answers.forEach((answer) => {
      if (Number(answer.dataset.faqAnswer) === openIndex) {
        answer.removeAttribute('hidden');
      } else if (!answer.hasAttribute('hidden')) {
        const hide = () => answer.setAttribute('hidden', 'until-found');
        if (animate) timers.push(window.setTimeout(hide, COLLAPSE_MS));
        else hide();
      }
    });
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [openIndex, faqs]);

  // Find-in-page matched text inside a collapsed answer: open that one.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleBeforeMatch = (event: Event) => {
      const answer = (event.target as HTMLElement).closest<HTMLElement>('[data-faq-answer]');
      if (answer) setOpenIndex(Number(answer.dataset.faqAnswer));
    };
    section.addEventListener('beforematch', handleBeforeMatch);
    return () => section.removeEventListener('beforematch', handleBeforeMatch);
  }, []);

  const leftFaqs = faqs.filter((_, i) => i % 2 === 0);
  const rightFaqs = faqs.filter((_, i) => i % 2 !== 0);

  return (
    <section
      ref={sectionRef}
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
          <Heading id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            {headingLevel === 'h1' ? 'BiltyOne FAQ: ' : ''}Clear answers for <span className="text-[#0369A1] dark:text-sky-400">busy transporters.</span>
          </Heading>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Have questions about BiltyOne? Here are the detailed answers to help you digitise your transport operations.
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
                  <h3 className="m-0">
                    <button
                      type="button"
                      onClick={() => toggleFAQ(originalIndex)}
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
                  </h3>

                  {/* Smooth Collapse Container */}
                  <div
                    id={`faq-answer-${originalIndex}`}
                    role="region"
                    aria-labelledby={`faq-question-${originalIndex}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div data-faq-answer={originalIndex} className="overflow-hidden">
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
                  <h3 className="m-0">
                    <button
                      type="button"
                      onClick={() => toggleFAQ(originalIndex)}
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
                  </h3>

                  {/* Smooth Collapse Container */}
                  <div
                    id={`faq-answer-${originalIndex}`}
                    role="region"
                    aria-labelledby={`faq-question-${originalIndex}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div data-faq-answer={originalIndex} className="overflow-hidden">
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
