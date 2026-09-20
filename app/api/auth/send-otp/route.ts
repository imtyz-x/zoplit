import { NextResponse } from 'next/server';
import { createEmailOtp } from '@/lib/email-otp';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email : '';
    const result = await createEmailOtp(email);

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      delivered: result.delivered,
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Could not send OTP' }, { status: 500 });
  }
}
