// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
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
