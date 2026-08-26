import { describe, expect, it } from 'vitest';
import sitemap from './sitemap';

describe('sitemap.xml', () => {
  it('includes the developers page', () => {
    const routes = sitemap();
    const developers = routes.find((r) => r.url === 'https://biltyone.com/developers');
    expect(developers).toBeDefined();
  });
});
