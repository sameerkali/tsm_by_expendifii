import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/register', '/activate'];
const COOKIE_NAME = process.env.COOKIE_NAME || 'token';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(COOKIE_NAME)?.value;

  // Root path is the login page
  if (pathname === '/') {
    // Already authenticated → go to dashboard
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Public auth pages (register, activate) don't need a token
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Since we are now communicating directly with the backend (railway) from the browser,
  // cookies are set on the railway domain and Next.js middleware cannot see them.
  // We disable the middleware token check and rely on client-side protection.
  
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
