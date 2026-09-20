import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'zoplit_admin';
const SESSION_PAYLOAD = 'zoplit-admin-session';

export function getAdminPassword() {
  const configured = process.env.ADMIN_PASSWORD?.trim();
  if (configured) return configured;
  // Local-only fallback so /admin works before .env.local is filled in.
  if (process.env.NODE_ENV !== 'production') return 'zoplit';
  return '';
}

export function createAdminToken(password = getAdminPassword()) {
  if (!password) return '';
  return createHmac('sha256', password).update(SESSION_PAYLOAD).digest('hex');
}

export function isValidAdminToken(token?: string | null) {
  const expected = createAdminToken();
  if (!expected || !token) return false;
  try {
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function isAdminAuthenticated() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return isValidAdminToken(token);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  };
}
