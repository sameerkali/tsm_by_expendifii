import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/auth/jwt';

const PUBLIC_PATHS = ['/login', '/activate', '/register'];

const COOKIE_NAME = process.env.COOKIE_NAME || 'tms_session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow public paths without auth
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 2. Get token from cookies - BYPASSED FOR UI TESTING
  /*
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Verify JWT
  const payload = await verifyJWT(token);

  if (!payload) {
    // Invalid token, clear cookie and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete(COOKIE_NAME);
    return response;
  }
  */

  return NextResponse.next();


  // 4. Handle INACTIVE status - BYPASSED
  /*
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
