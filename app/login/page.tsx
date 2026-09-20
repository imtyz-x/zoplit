'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState<'send' | 'verify' | null>(null);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const sendOtp = async () => {
    setBusy('send');
    setError('');
    setInfo('');
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'Could not send the code');
        return;
      }
      setSent(true);
      setInfo(
        data.delivered
          ? 'We emailed you a 6-digit login code.'
          : 'Code generated. Check the server terminal for the email OTP (add RESEND_API_KEY to send it to your inbox).'
      );
    } catch {
      setError('Could not send the code');
    } finally {
      setBusy(null);
    }
  };

  const verifyOtp = async () => {
    setBusy('verify');
    setError('');
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'Could not verify the code');
        return;
      }
      localStorage.setItem('zoplit_email', data.email);
      router.push('/');
      router.refresh();
    } catch {
      setError('Could not verify the code');
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className="pt-32 pb-20 min-h-screen">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Log in</h1>
        <p className="text-muted-foreground mb-8">
          Enter your email and we&apos;ll send a one-time code. No password needed.
        </p>

        <div className="space-y-5 rounded-xl border border-subtle bg-card p-6">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          {!sent ? (
            <Button
              type="button"
              onClick={sendOtp}
              disabled={busy !== null || !email}
              className="min-h-[44px] w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
            >
              {busy === 'send' ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                'Email me a code'
              )}
            </Button>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="login-otp">6-digit code</Label>
                <Input
                  id="login-otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                />
              </div>
              <Button
                type="button"
                onClick={verifyOtp}
                disabled={otp.length !== 6 || busy !== null}
                className="min-h-[44px] w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
              >
                {busy === 'verify' ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Log in'
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={sendOtp}
                disabled={busy !== null}
                className="min-h-[44px] w-full rounded-md"
              >
                Resend code
              </Button>
            </>
          )}

          {info && <p className="text-sm text-muted-foreground">{info}</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </div>
    </section>
  );
}
