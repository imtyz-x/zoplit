import { normalizePhone } from '@/lib/phone';

const WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;

const submissions = new Map<string, number[]>();

export function canSubmitLead(phone: string) {
  const key = normalizePhone(phone);
  if (key.length < 10) {
    return { ok: false as const, error: 'Enter a valid WhatsApp number' };
  }

  const now = Date.now();
  const recent = (submissions.get(key) || []).filter((time) => now - time < WINDOW_MS);
  submissions.set(key, recent);

  if (recent.length >= MAX_PER_WINDOW) {
    return {
      ok: false as const,
      error: "You've already sent a few requests. We'll reach out on WhatsApp shortly!",
    };
  }

  return { ok: true as const, key };
}

export function recordLeadSubmit(phone: string) {
  const key = normalizePhone(phone);
  const now = Date.now();
  const recent = (submissions.get(key) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  submissions.set(key, recent);
}
