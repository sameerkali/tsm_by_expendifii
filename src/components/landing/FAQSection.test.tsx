// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

// No vitest globals, so Testing Library cannot unmount between tests itself.
afterEach(() => cleanup());
import FAQSection from './FAQSection';

const faqs = [
  { q: 'First question?', a: 'First answer.' },
  { q: 'Second question?', a: 'Second answer.' },
  { q: 'Third question?', a: 'Third answer.' },
];

describe('FAQSection heading structure', () => {
  it('renders every question as a level-3 heading nested under the section h2', () => {
    render(<FAQSection faqs={faqs} />);

    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();

    const h3s = screen.getAllByRole('heading', { level: 3 });
    expect(h3s).toHaveLength(faqs.length);
    faqs.forEach((faq) => {
      expect(h3s.some((h) => h.textContent === faq.q)).toBe(true);
    });
  });

  it('keeps each h3 wrapping an accessible, expandable button (WAI-ARIA accordion pattern)', () => {
    render(<FAQSection faqs={faqs} />);

    const h3s = screen.getAllByRole('heading', { level: 3 });
    h3s.forEach((h3) => {
      const button = h3.querySelector('button');
      expect(button).not.toBeNull();
      expect(button).toHaveAttribute('aria-expanded');
      expect(button).toHaveAttribute('aria-controls');
    });
  });
});

describe('FAQSection collapsed answers', () => {
  const answer = (container: HTMLElement, index: number) =>
    container.querySelector(`[data-faq-answer="${index}"]`) as HTMLElement;

  it('hides collapsed answers with hidden="until-found" (out of tab order, still findable)', () => {
    const { container } = render(<FAQSection faqs={faqs} />);
    // The second-to-last answer starts open.
    expect(answer(container, 1)).not.toHaveAttribute('hidden');
    expect(answer(container, 0)).toHaveAttribute('hidden', 'until-found');
    expect(answer(container, 2)).toHaveAttribute('hidden', 'until-found');
  });

  it('opens the answer that find-in-page matched (beforematch)', () => {
    const { container } = render(<FAQSection faqs={faqs} />);
    fireEvent(answer(container, 0), new Event('beforematch', { bubbles: true }));
    const button = screen.getByRole('button', { name: 'First question?' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(answer(container, 0)).not.toHaveAttribute('hidden');
  });
});

describe('FAQSection as a standalone page', () => {
  it('renders the section heading as the page h1 when headingLevel="h1"', () => {
    render(<FAQSection faqs={faqs} headingLevel="h1" />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(faqs.length);
  });
});
