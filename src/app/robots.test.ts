import { describe, expect, it } from 'vitest';
import robots, { APP_ROUTES, BLOCKED_BOTS, WELCOME_BOTS } from './robots';
import { PUBLIC_PAGES } from '@/config/pages';

type Rule = { userAgent?: string | string[]; allow?: string | string[]; disallow?: string | string[] };

const list = (v?: string | string[]) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

/**
 * RFC 9309 matching, as Google and OpenAI apply it: a crawler uses the group
 * that names it (else '*'); within that group the longest matching rule wins,
 * and Allow wins a tie. '*' matches anything and a trailing '$' anchors the end.
 */
function isAllowed(bot: string, path: string): boolean {
  const rules = robots().rules as Rule[];
  const named = rules.filter((r) => list(r.userAgent).some((ua) => ua.toLowerCase() === bot.toLowerCase()));
  const group = named.length ? named : rules.filter((r) => list(r.userAgent).includes('*'));
  let best: { allow: boolean; length: number } | null = null;
  for (const rule of group) {
    for (const [allow, patterns] of [[true, list(rule.allow)], [false, list(rule.disallow)]] as const) {
      for (const pattern of patterns) {
        const anchored = pattern.endsWith('$');
        const body = (anchored ? pattern.slice(0, -1) : pattern).replace(/[.+?^{}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
        if (!new RegExp(`^${body}${anchored ? '$' : ''}`).test(path)) continue;
        if (!best || pattern.length > best.length || (pattern.length === best.length && allow)) {
          best = { allow, length: pattern.length };
        }
      }
    }
  }
  return best === null || best.allow;
}

// A crawler we have never heard of falls back to the '*' group.
const BOTS = [...WELCOME_BOTS, 'SomeFutureAIBot'];

const PUBLIC_FILES = ['/robots.txt', '/sitemap.xml', '/llms.txt', '/og/features.png', '/og/gr-software.png', '/screenshots/gr-list.avif', '/og-image.jpg'];

describe('robots.txt', () => {
  it('lets every search engine and AI crawler reach every public page', () => {
    for (const bot of BOTS) {
      for (const page of PUBLIC_PAGES) {
        expect(isAllowed(bot, page.path), `${bot} ${page.path}`).toBe(true);
      }
    }
  });

  it('keeps /gr-software and /gr-management open (a bare "/gr" rule would block them)', () => {
    for (const bot of BOTS) {
      expect(isAllowed(bot, '/gr-software'), bot).toBe(true);
      expect(isAllowed(bot, '/gr-management'), bot).toBe(true);
    }
  });

  it('lets crawlers fetch public files: sitemap, llms.txt and images', () => {
    for (const bot of BOTS) {
      for (const file of PUBLIC_FILES) expect(isAllowed(bot, file), `${bot} ${file}`).toBe(true);
    }
  });

  it('keeps every crawler out of the logged-in app and the API', () => {
    for (const bot of BOTS) {
      for (const route of APP_ROUTES) {
        expect(isAllowed(bot, route), `${bot} ${route}`).toBe(false);
        expect(isAllowed(bot, `${route}/123`), `${bot} ${route}/123`).toBe(false);
      }
      expect(isAllowed(bot, '/api/proxy/auth/me'), bot).toBe(false);
    }
  });

  it('blocks SEO scrapers everywhere', () => {
    for (const bot of BLOCKED_BOTS) expect(isAllowed(bot, '/'), bot).toBe(false);
  });
});
