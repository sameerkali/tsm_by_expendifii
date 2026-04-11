import { jwtVerify } from 'jose';
import { SessionPayload } from '@/types/session';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-at-least-32-chars-long'
);

export async function verifyJWT(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}
