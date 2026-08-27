import { cn } from '@/lib/utils/cn';

interface CardProps {
  id: string;
  title: string;
  description: string;
  className?: string;
}

export function Card({ id, title, description, className }: CardProps) {
  return (
    <div
      className={cn(
        'group relative z-10 border-t border-slate-200 py-10 transition-colors duration-300 hover:border-sky-500 dark:border-white/10 dark:hover:border-sky-500',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute top-2 right-0 -z-10 text-8xl leading-none font-bold text-slate-900/5 transition-all duration-300 ease-out select-none group-hover:-translate-y-2 group-hover:scale-105 group-hover:text-slate-900/10 sm:text-9xl dark:text-white/5 dark:group-hover:text-white/10"
      >
        {id}
      </span>
      <h3 className="mb-3 max-w-[80%] text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}
