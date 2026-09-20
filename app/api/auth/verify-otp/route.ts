import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyEmailOtp } from '@/lib/email-otp';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email : '';
    const code = typeof body?.code === 'string' ? body.code : '';
    const result = verifyEmailOtp(email, code);

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
    }

    cookies().set('zoplit_session', result.email, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({ ok: true, email: result.email });
  } catch {
    return NextResponse.json({ ok: false, error: 'Could not verify OTP' }, { status: 500 });
  }
}
