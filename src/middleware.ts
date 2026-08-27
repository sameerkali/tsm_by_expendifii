import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getMarkdownForPath, MARKDOWN_NEGOTIATED_PATHS, NOT_FOUND_MARKDOWN, prefersMarkdown } from '@/lib/agent-content';

// Auth-flow pages: if already authenticated, redirect to dashboard
const AUTH_PATHS = [
  '/login',
  '/register',
  '/forgot-password',
];

// Always-accessible pages: no redirect regardless of auth state
const INFO_PATHS = [
  '/about',
  '/contact',
  '/security',
  '/privacy-policy',
  '/terms-and-conditions',
  '/user-agreement',
  '/cookie-policy',
  '/why-biltypro',
  '/live-demo',
  '/features',
  '/product',
  '/transport-management-system',
  '/logistics-glossary',
  '/digital-transport-management',
  '/transport-business-automation',
  '/gr-management',
  '/lorry-receipt-software',
  '/developers',
];

// The authenticated app shell — the only paths where "no token" should mean
// "redirect to /login". Mirrors the route groups under src/app/(dashboard).
const PROTECTED_PATHS = [
  '/dashboard',
  '/gr',
  '/customers',
  '/printing',
  '/settings',
  '/demo',
];

const COOKIE_NAME = process.env.COOKIE_NAME || 'token';
const GUEST_COOKIE_NAME = 'bp_guest';

const MARKDOWN_HEADERS = {
  'Content-Type': 'text/markdown; charset=utf-8',
  Vary: 'Accept, Accept-Encoding',
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static / metadata assets to bypass auth middleware check
  if (
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/llms.txt' ||
    pathname === '/favicon.ico' ||
    pathname === '/manifest.webmanifest' ||
    (pathname.startsWith('/google') && pathname.endsWith('.html'))
  ) {
    return NextResponse.next();
  }

  const wantsMarkdown = prefersMarkdown(request.headers.get('accept'));

  // Serve the Markdown rendition directly for public pages that have one,
  // ahead of any auth logic — these are public regardless of login state.
  // Returning a fresh NextResponse here (rather than letting the request
  // continue to the page) is what makes `Vary: Accept` stick: Next's App
  // Router sets its own Vary header on every rendered page response
  // (rsc, next-router-state-tree, ...) and overwrites anything middleware
  // or next.config's headers() add to that key, so a Markdown request has
  // to be answered here, before Next's renderer ever sees it.
  if (wantsMarkdown && MARKDOWN_NEGOTIATED_PATHS.has(pathname)) {
    const markdown = getMarkdownForPath(pathname);
    if (markdown) {
      return new NextResponse(markdown, { status: 200, headers: MARKDOWN_HEADERS });
    }
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const isGuest = request.cookies.get(GUEST_COOKIE_NAME)?.value === '1';

  // Root path is the public marketing homepage
  if (pathname === '/') {
    // Already authenticated → go to GR
    if (token || isGuest) {
      return NextResponse.redirect(new URL('/gr', request.url));
    }
    return NextResponse.next();
  }

  // Info pages — always accessible regardless of auth state
  if (INFO_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Auth-flow pages — redirect authenticated users to dashboard
  if (AUTH_PATHS.some((path) => pathname.startsWith(path))) {
    if (token || isGuest) {
      // Account was deactivated — clear the httpOnly cookie and let the user
      // through to /login instead of redirecting back to the dashboard loop.
      if (pathname === '/login' && request.nextUrl.searchParams.get('reason') === 'deactivated') {
        const response = NextResponse.next();
        response.cookies.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
        return response;
      }
      return NextResponse.redirect(new URL('/gr', request.url));
    }
    return NextResponse.next();
  }

  // Anything that isn't part of the authenticated app shell is not a route
  // this middleware owns. Previously every unmatched path fell into the
  // auth gate below and was redirected to /login — a 200 "soft 404" that
  // told crawlers/agents every URL exists. Let Next.js's own router resolve
  // these instead, which returns a real 404 (via not-found.tsx) for paths
  // that don't exist.
  const isProtectedAppPath = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
  if (!isProtectedAppPath) {
    if (wantsMarkdown) {
      return new NextResponse(NOT_FOUND_MARKDOWN, { status: 404, headers: MARKDOWN_HEADERS });
    }
    return NextResponse.next();
  }

  // Protected app routes require a token — redirect to login if missing
  if (!token && !isGuest) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Token present: let the request through.
  // JWT validity + account status are enforced by the backend on every API call.
  // The axios 401 interceptor in client.ts handles expired tokens globally.
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (Next.js API routes)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - robots.txt
     * - sitemap.xml
     * - llms.txt
     * - manifest.webmanifest
     * - google verification html files (e.g. googlec380e86b30f31d8b.html)
     * - static image files (webp, png, jpg, jpeg, svg, gif)
     * - markdown files (auth.md, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots\\.txt|sitemap\\.xml|llms\\.txt|manifest\\.webmanifest|ingest|google.*\\.html|.*\\.(?:webp|png|jpg|jpeg|svg|gif|md)$).*)',
  ],
};
