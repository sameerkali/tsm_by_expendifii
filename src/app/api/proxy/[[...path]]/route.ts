import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tsm-backend-mu.vercel.app';

export async function GET(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  const resolvedParams = await params;
  return handleProxy(request, resolvedParams.path);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  const resolvedParams = await params;
  return handleProxy(request, resolvedParams.path);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  const resolvedParams = await params;
  return handleProxy(request, resolvedParams.path);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  const resolvedParams = await params;
  return handleProxy(request, resolvedParams.path);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  const resolvedParams = await params;
  return handleProxy(request, resolvedParams.path);
}

async function handleProxy(request: NextRequest, pathSegments?: string[]) {
  const path = pathSegments ? pathSegments.join('/') : '';
  const targetUrl = new URL(`/api/${path}`, BACKEND_URL);
  targetUrl.search = request.nextUrl.search;

  const method = request.method;
  const headers = new Headers();

  // Forward existing headers, but strip host/origin to avoid CORS and host mismatch issues
  request.headers.forEach((value, key) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey !== 'host' && lowerKey !== 'origin') {
      headers.set(key, value);
    }
  });

  // Ensure Content-Type is set if it exists on original request
  const contentType = request.headers.get('content-type');
  if (contentType) {
    headers.set('content-type', contentType);
  }

  let body: any = null;
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    try {
      body = await request.arrayBuffer();
    } catch (e) {
      // No body or error reading it
    }
  }

  try {
    const backendResponse = await fetch(targetUrl.toString(), {
      method,
      headers,
      body,
      redirect: 'manual',
    });

    const responseHeaders = new Headers();
    backendResponse.headers.forEach((value, key) => {
      // Avoid transferring content-encoding if it's compressed,
      // since NextJS fetch might decompress it or the server might decompress it.
      if (key.toLowerCase() !== 'content-encoding') {
        responseHeaders.set(key, value);
      }
    });

    // Handle Set-Cookie modifications directly on responseHeaders
    // to bypass NextJS NextResponse cookie serialization bugs
    const setCookie = backendResponse.headers.get('set-cookie');
    console.log(`[Proxy] Response from backend for ${method} ${path}. Set-Cookie:`, setCookie);

    if (setCookie) {
      const cookiesToSet = typeof (backendResponse.headers as any).getSetCookie === 'function'
        ? (backendResponse.headers as any).getSetCookie()
        : [setCookie];

      responseHeaders.delete('set-cookie');

      cookiesToSet.forEach((cookieStr: string) => {
        const parts = cookieStr.split(';').map(p => p.trim());
        if (parts.length === 0 || !parts[0]) return;

        const [nameValue, ...attrs] = parts;
        const eqIdx = nameValue.indexOf('=');
        if (eqIdx === -1) return;

        const name = nameValue.slice(0, eqIdx);
        const value = nameValue.slice(eqIdx + 1);

        const cookieParts = [`${name}=${value}`];
        cookieParts.push('Path=/'); // Default path to root
        cookieParts.push('SameSite=Lax'); // Default SameSite to Lax for redirect support

        attrs.forEach(attr => {
          const attrEqIdx = attr.indexOf('=');
          const key = attrEqIdx === -1 ? attr : attr.slice(0, attrEqIdx);
          const val = attrEqIdx === -1 ? '' : attr.slice(attrEqIdx + 1);
          const lowerKey = key.toLowerCase().trim();

          if (lowerKey === 'path') {
            cookieParts[1] = `Path=${val}`;
          } else if (lowerKey === 'max-age') {
            cookieParts.push(`Max-Age=${val}`);
          } else if (lowerKey === 'expires') {
            cookieParts.push(`Expires=${val}`);
          } else if (lowerKey === 'domain') {
            cookieParts.push(`Domain=${val}`);
          } else if (lowerKey === 'httponly') {
            cookieParts.push('HttpOnly');
          } else if (lowerKey === 'secure') {
            // Only write Secure attribute in production environment
            if (process.env.NODE_ENV === 'production') {
              cookieParts.push('Secure');
            }
          }
        });

        const modifiedCookie = cookieParts.join('; ');
        console.log(`[Proxy] Appending modified Set-Cookie: ${name}=${value?.slice(0, 15)}...`);
        responseHeaders.append('set-cookie', modifiedCookie);
      });
    } else {
      responseHeaders.delete('set-cookie');
    }

    const data = await backendResponse.arrayBuffer();

    const response = new NextResponse(data, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: responseHeaders,
    });

    console.log(`[Proxy] Completed ${method} ${path}. Status: ${backendResponse.status}`);
    return response;
  } catch (error: any) {
    console.error(`[Proxy Error] Failed to proxy ${method} to ${targetUrl.toString()}:`, error);
    return NextResponse.json(
      { success: false, error: 'Proxy connection error to backend' },
      { status: 502 }
    );
  }
}
