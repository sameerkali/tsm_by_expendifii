import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = [
  '/login',
  '/register',
  '/activate',
  '/forgot-password',
  // Public landing site routes — no auth required
  '/about',
  '/contact',
  '/security',
  '/privacy-policy',
  '/terms-and-conditions',
  '/user-agreement',
  '/cookie-policy',
  '/why-tsm',
  '/live-demo',
];
const COOKIE_NAME = process.env.COOKIE_NAME || 'token';
const GUEST_COOKIE_NAME = 'tms_guest';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static / metadata assets to bypass auth middleware check
  if (
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/favicon.ico' ||
    pathname === '/manifest.webmanifest' ||
    (pathname.startsWith('/google') && pathname.endsWith('.html'))
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const isGuest = request.cookies.get(GUEST_COOKIE_NAME)?.value === '1';

  // Root path is the login page
  if (pathname === '/') {
    // Already authenticated → go to GR
    if (token || isGuest) {
      return NextResponse.redirect(new URL('/gr', request.url));
    }
    return NextResponse.next();
  }

  // Public paths — allow unauthenticated, redirect authenticated users to dashboard
  // (/activate is exempt from redirect so inactive accounts can use it after login)
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    if ((token || isGuest) && !pathname.startsWith('/activate')) {
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

  // All other routes require a token — redirect to login if missing
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
     * - manifest.webmanifest
     * - google verification html files (e.g. googlec380e86b30f31d8b.html)
     * - static image files (webp, png, jpg, jpeg, svg, gif)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|ingest|google.*\\.html|.*\\.(?:webp|png|jpg|jpeg|svg|gif)$).*)',
  ],
};
