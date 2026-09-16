'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="hero-section relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-[#0a0a12] px-4 pb-16 pt-28 sm:px-8 lg:px-12 lg:pb-24 lg:pt-32">
      <div
        aria-hidden
        className="hero-background pointer-events-none absolute inset-0 opacity-80"
      />
      <div
        aria-hidden
        className="hero-grid pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(to bottom, black, transparent 80%)',
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <div className="max-w-xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            <Sparkles size={14} className="text-[#a78bfa]" />
            Your creative team, on demand
          </div>
          <h1 className="max-w-xl text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Great work,
            <span className="block text-[#a78bfa]">without the chase.</span>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-white/65 sm:text-lg">
            Tell us what you need. Zoplit matches you with the right creator, manages the details, and gets the final work over the line.
          </p>
          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="h-12 rounded-md bg-[#5B21E6] px-7 text-base text-white hover:bg-[#5B21E6]/90">
              <Link href="/start-project">
                Start a Project
                <ArrowUpRight size={18} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-md border-white/15 px-7 text-base hover:bg-white/5">
              <Link href="/become-a-creator">Join as a Creator</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/55">
            {['Verified creators', 'Fixed quotes', '48h delivery'].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-[#a78bfa]" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[26rem] w-full max-w-2xl items-center justify-center lg:min-h-[34rem] lg:translate-y-3">
          <div className="absolute inset-8 rounded-full bg-[#5B21E6]/20 blur-3xl" />
          <Image
            src="/zopi.png"
            alt="Zopi mascot"
            width={700}
            height={700}
            priority
            className="zopi-mascot relative h-auto w-full max-w-[34rem] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
