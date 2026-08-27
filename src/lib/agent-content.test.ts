import { describe, expect, it } from 'vitest';
import { getMarkdownForPath, MARKDOWN_NEGOTIATED_PATHS, SITE_URL } from './agent-content';

describe('developer resources page markdown negotiation', () => {
  it('is registered as a negotiated path', () => {
    expect(MARKDOWN_NEGOTIATED_PATHS.has('/developers')).toBe(true);
  });

  it('renders a markdown summary carrying the brand name', () => {
    const markdown = getMarkdownForPath('/developers');
    expect(markdown).not.toBeNull();
    expect(markdown).toContain('Developer Resources | BiltyOne');
    expect(markdown).toContain(`${SITE_URL}/developers`);
  });

  it('lists developer resources in the homepage markdown rendition', () => {
    const markdown = getMarkdownForPath('/');
    expect(markdown).toContain(`${SITE_URL}/developers`);
  });
});
