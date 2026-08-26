import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from './middleware';

describe('middleware INFO_PATHS', () => {
  it('lets unauthenticated requests through to /developers without redirecting', async () => {
    const req = new NextRequest('https://biltyone.com/developers');
    const res = await middleware(req);

    expect(res.headers.get('location')).toBeNull();
  });
});
