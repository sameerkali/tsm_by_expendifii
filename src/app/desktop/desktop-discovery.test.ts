import { describe, expect, it } from 'vitest';
import sitemap from '../sitemap';
import { GET as llmsTxt } from '../llms.txt/route';
import { getMarkdownForPath, MARKDOWN_NEGOTIATED_PATHS, SITE_URL } from '@/lib/agent-content';

// The /desktop page should be findable by search engines and AI agents,
// while the licence-key page (reached from the download email) stays out of
// the sitemap.
describe('BiltyOne Desktop page discovery', () => {
  it('is in the sitemap; the licence-key page is not', () => {
    const urls = sitemap().map((r) => r.url);
    expect(urls).toContain('https://biltyone.com/desktop');
    expect(urls).not.toContain('https://biltyone.com/desktop/licence-key');
  });

  it('has a markdown rendition for agents', () => {
    expect(MARKDOWN_NEGOTIATED_PATHS.has('/desktop')).toBe(true);
    const markdown = getMarkdownForPath('/desktop');
    expect(markdown).toContain('Desktop App for Windows');
    expect(markdown).toContain(`${SITE_URL}/desktop`);
    expect(getMarkdownForPath('/')).toContain(`${SITE_URL}/desktop`);
  });

  it('is listed in llms.txt', async () => {
    const body = await llmsTxt().text();
    expect(body).toContain(`${SITE_URL}/desktop`);
  });
});
