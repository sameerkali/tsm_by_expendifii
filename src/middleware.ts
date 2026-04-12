import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/auth/jwt';

const PUBLIC_PATHS = ['/activate', '/register']; // / is handled manually below
const COOKIE_NAME = process.env.COOKIE_NAME || 'tms_session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check existing token
  // BYPASSED FOR UI TESTING
  /*
  const token = request.cookies.get(COOKIE_NAME)?.value;
  
  // If hitting root (login)
  if (pathname === '/') {
    if (token) {
      // Validate token, if valid push to dashboard
      const payload = await verifyJWT(token);
      if (payload) {
         return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
    // No token or invalid, let them see the login page
    return NextResponse.next();
  }

  // 2. Allow public paths without auth
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Verify JWT for protected routes
  const payload = await verifyJWT(token);

  if (!payload) {
    // Invalid token, clear cookie and redirect to login
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  // 4. Handle INACTIVE status
  if (payload.status === 'INACTIVE' && pathname !== '/activate') {
    return NextResponse.redirect(new URL('/activate', request.url));
  }

  // 5. Success: Forward companyId as header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-company-id', payload.companyId);
  requestHeaders.set('x-user-id', payload.userId);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  */

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
