interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
}

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="grid grid-cols-1 border-t border-l border-slate-200 md:grid-cols-2 lg:grid-cols-4 dark:border-white/10">
      {steps.map((step) => (
        <div
          key={step.id}
          className="group relative overflow-hidden border-r border-b border-slate-200 bg-transparent px-8 py-10 transition-colors duration-300 hover:bg-slate-900/[0.02] dark:border-white/10 dark:hover:bg-white/[0.02]"
        >
          {/* Animated top accent line: draws left-to-right on hover */}
          <div className="absolute top-0 left-0 h-[2px] w-0 bg-sky-500 transition-all duration-400 ease-out group-hover:w-full" />

          {/* Background number watermark */}
          <span
            aria-hidden="true"
            style={{ fontFamily: 'var(--font-plus-jakarta-sans), "Plus Jakarta Sans", sans-serif' }}
            className="absolute -right-2 -bottom-5 z-0 text-8xl leading-none font-bold text-slate-900/[0.03] transition-all duration-400 ease-out select-none group-hover:-translate-y-2 group-hover:scale-105 group-hover:text-slate-900/[0.05] sm:text-9xl dark:text-white/[0.02] dark:group-hover:text-white/[0.04]"
          >
            {step.id}
          </span>

          <div className="relative z-10">
            <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">{step.title}</h3>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
