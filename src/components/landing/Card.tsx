import { cn } from '@/lib/utils/cn';

interface CardProps {
  id: string;
  title: string;
  description: string;
  className?: string;
}

export function Card({ id, title, description, className }: CardProps) {
  return (
    <div className={cn('group relative z-10 py-10', className)}>
      {/* Resting divider, always visible */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-slate-200 dark:bg-white/10" />
      {/* Accent line: draws in left-to-right on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transform-gpu bg-sky-500 transition-transform duration-700 ease-out will-change-transform group-hover:scale-x-100"
      />
      <span
        aria-hidden="true"
        style={{ fontFamily: 'var(--font-plus-jakarta-sans), "Plus Jakarta Sans", sans-serif' }}
        className="absolute top-2 right-0 -z-10 text-8xl leading-none font-bold text-slate-900/5 transition-[translate,scale,color] duration-500 ease-out select-none group-hover:-translate-y-2 group-hover:scale-105 group-hover:text-slate-900/10 sm:text-9xl dark:text-white/5 dark:group-hover:text-white/10"
      >
        {id}
      </span>
      <h3 className="mb-3 max-w-[80%] text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}
