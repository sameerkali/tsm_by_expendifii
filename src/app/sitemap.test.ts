import { describe, expect, it } from 'vitest';
import sitemap from './sitemap';
import { PUBLIC_PAGES } from '@/config/pages';

describe('sitemap.xml', () => {
  const routes = sitemap();
  const urls = routes.map((r) => r.url);

  it('includes the developers page', () => {
    expect(urls).toContain('https://biltyone.com/developers');
  });

  it('includes every keyword landing page', () => {
    for (const path of [
      '/transport-management-system',
      '/online-transport-management-software',
      '/transport-company-software',
      '/transport-management-system-for-small-business',
      '/transport-billing-software',
      '/transport-erp-software',
    ]) {
      expect(urls).toContain(`https://biltyone.com${path}`);
    }
  });

  it('leaves out noindex pages (auth, demo, licence key)', () => {
    for (const path of ['/login', '/register', '/forgot-password', '/live-demo', '/desktop/licence-key']) {
      expect(urls).not.toContain(`https://biltyone.com${path}`);
    }
  });

  it('uses the new /why-biltyone URL, not the old BiltyPro slug', () => {
    expect(urls).toContain('https://biltyone.com/why-biltyone');
    expect(urls.some((u) => u.includes('biltypro'))).toBe(false);
  });

  it('uses each page content date as lastmod, not the build time', () => {
    const dates = new Set(routes.map((r) => (r.lastModified as Date).toISOString()));
    expect(dates.size).toBeGreaterThan(1);
  });

  it('has no duplicate URLs', () => {
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe('page registry', () => {
  it('keeps titles within 60 and descriptions within 160 characters', () => {
    for (const page of PUBLIC_PAGES) {
      expect(page.title.length, page.path).toBeLessThanOrEqual(60);
      expect(page.description.length, page.path).toBeLessThanOrEqual(160);
    }
  });

  it('has unique titles and descriptions', () => {
    expect(new Set(PUBLIC_PAGES.map((p) => p.title)).size).toBe(PUBLIC_PAGES.length);
    expect(new Set(PUBLIC_PAGES.map((p) => p.description)).size).toBe(PUBLIC_PAGES.length);
  });
});
