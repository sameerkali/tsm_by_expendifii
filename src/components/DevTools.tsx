'use client';

import dynamic from 'next/dynamic';

// `agentation` is a development-only annotation overlay. A static import in
// the root layout put the whole package (~450 KB unminified) in every
// production page's client bundle even though it never rendered there.
// Loading it through next/dynamic splits it into its own chunk, and that
// chunk is only requested when this component actually renders it, which
// the NODE_ENV check below limits to `next dev`.
const Agentation = dynamic(() => import('agentation').then((m) => m.Agentation), {
  ssr: false,
});

export default function DevTools() {
  if (process.env.NODE_ENV !== 'development') return null;
  return <Agentation />;
}
