import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';

/**
 * Logged-in app routes (mirrors PROTECTED_PATHS in middleware.ts).
 *
 * robots.txt rules match by PREFIX, so a bare "/gr" would also block public
 * pages such as /gr-software and /gr-management. Each route is therefore
 * blocked as the exact path ("/gr$") plus its sub-paths ("/gr/"), never as a
 * bare prefix. robots.test.ts checks that every public page stays allowed.
 */
export const APP_ROUTES = ['/dashboard', '/gr', '/customers', '/printing', '/settings', '/demo'];

export const DISALLOW = ['/api/', ...APP_ROUTES.flatMap((route) => [`${route}$`, `${route}/`])];

/**
 * Search engines and AI crawlers, welcome on every public page. A crawler
 * named in a group ignores the '*' group entirely, so this group repeats the
 * same DISALLOW list. Crawlers not listed here fall back to '*', which has the
 * same rules, so new AI crawlers are allowed by default too.
 */
export const WELCOME_BOTS = [
  // Search engines
  'Googlebot',
  'Bingbot',
  'Applebot',
  'DuckDuckBot',
  // OpenAI (ChatGPT search, user-initiated visits, training)
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  // Anthropic (Claude)
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google Gemini / AI Overviews, Apple Intelligence, Amazon, Meta, DuckDuckGo AI
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'Meta-ExternalAgent',
  'DuckAssistBot',
  // Common Crawl (used by many AI models)
  'CCBot',
];

/** SEO scrapers: they don't send visitors and only load the server. */
export const BLOCKED_BOTS = ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DataForSeoBot', 'BLEXBot'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      { userAgent: WELCOME_BOTS, allow: '/', disallow: DISALLOW },
      { userAgent: BLOCKED_BOTS, disallow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
