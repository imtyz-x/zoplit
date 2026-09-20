import { createHash, randomInt, timingSafeEqual } from 'crypto';

type OtpRecord = {
  hash: string;
  expiresAt: number;
  attempts: number;
};

const OTP_TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const otpStore = new Map<string, OtpRecord>();

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashCode(email: string, code: string) {
  return createHash('sha256').update(`${email}:${code}`).digest('hex');
}

function hashesMatch(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

async function sendOtpEmail(to: string, code: string) {
  // TODO: swap this for Twilio/MSG91 WhatsApp is not used here — email only.
  // Plug Resend (RESEND_API_KEY) or SMTP later.
  const key = process.env.RESEND_API_KEY;
  const from = process.env.OTP_FROM_EMAIL || 'Zoplit <noreply@zoplit.com>';
  const body = `Your Zoplit one-time login code is ${code}. It expires in 10 minutes.`;

  console.log(`[Email OTP] ${to} → ${code}`);

  if (!key) {
    return { delivered: false as const };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: 'Your Zoplit login code',
      text: body,
    }),
  });

  return { delivered: res.ok as boolean };
}

export async function createEmailOtp(email: string) {
  const normalized = normalizeEmail(email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return { ok: false as const, error: 'Enter a valid email address' };
  }

  const code = String(randomInt(100000, 1000000));
  otpStore.set(normalized, {
    hash: hashCode(normalized, code),
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
  });

  const mail = await sendOtpEmail(normalized, code);
  return { ok: true as const, delivered: mail.delivered };
}

export function verifyEmailOtp(email: string, code: string) {
  const normalized = normalizeEmail(email);
  const cleanedCode = code.replace(/\D/g, '');

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return { ok: false as const, error: 'Enter a valid email address' };
  }
  if (cleanedCode.length !== 6) {
    return { ok: false as const, error: 'Enter the 6-digit code' };
  }

  const record = otpStore.get(normalized);
  if (!record) {
    return { ok: false as const, error: 'Request a new code' };
  }
  if (Date.now() > record.expiresAt) {
    otpStore.delete(normalized);
    return { ok: false as const, error: 'Code expired. Request a new one' };
  }
  if (record.attempts >= MAX_ATTEMPTS) {
    otpStore.delete(normalized);
    return { ok: false as const, error: 'Too many attempts. Request a new code' };
  }

  record.attempts += 1;
  if (!hashesMatch(record.hash, hashCode(normalized, cleanedCode))) {
    return { ok: false as const, error: 'Incorrect code. Try again' };
  }

  otpStore.delete(normalized);
  return { ok: true as const, email: normalized };
}
