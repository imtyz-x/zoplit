'use client';

import { useState, useRef, type MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import { Users, Wallet, MessageSquare, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RevealOnScroll } from '@/components/site/RevealOnScroll';
import { CreatorForm, CreatorSuccess } from './CreatorForm';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const WHY_TITLE = ['Why', 'join'] as const;
const ease = [0.22, 1, 0.36, 1] as const;

const WHY_JOIN = [
  {
    icon: Users,
    title: 'Clients Handled',
    description: 'We bring you clients — no marketing, no DMs, no cold outreach.',
  },
  {
    icon: Wallet,
    title: 'No Chasing Payments',
    description: 'We collect from clients and pay you. No awkward follow-ups.',
  },
  {
    icon: MessageSquare,
    title: 'No Awkward Negotiations',
    description: 'We handle pricing and quotes. You just focus on the work.',
  },
  {
    icon: Award,
    title: 'Keep Your Credit',
    description: 'Your work, your name. We credit you in everything you create.',
  },
];

const STEPS = [
  { title: 'Apply', description: 'Submit your portfolio and details.' },
  { title: 'Get Verified', description: 'ID check, portfolio review and a paid test project.' },
  { title: 'Receive Projects', description: 'Get briefs that match your skills and location.' },
  { title: 'Deliver & Get Paid', description: 'Complete the work and get paid without chasing.' },
];

export default function BecomeACreatorPage() {
  const [success, setSuccess] = useState<{ firstName: string; warning: string } | null>(null);
  const reduceMotion = useReducedMotion();

  if (success) {
    return (
      <section className="pt-32 pb-20">
        <CreatorSuccess
          firstName={success.firstName}
          warning={success.warning}
          reduceMotion={!!reduceMotion}
        />
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            Turn your creative skill into consistent work.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-2xl">
            We bring you clients, handle negotiation, scheduling and payments — you focus on the work.
          </p>
        </RevealOnScroll>

        <WhyJoinSection />

        {/* How it works */}
        <RevealOnScroll delay={0.15}>
          <h2 className="text-xl font-semibold mb-6">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-subtle bg-card text-primary font-bold text-sm mb-3">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Application Form */}
        <RevealOnScroll delay={0.2}>
          <CreatorForm
            onSuccess={(firstName, warning) => setSuccess({ firstName, warning })}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}

function WhyJoinSection() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !stageRef.current) return;
    const bounds = stageRef.current.getBoundingClientRect();
    stageRef.current.style.setProperty('--sx', `${event.clientX - bounds.left}px`);
    stageRef.current.style.setProperty('--sy', `${event.clientY - bounds.top}px`);
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMove}
      className="relative mb-16 overflow-hidden"
    >
      {!reduceMotion && (
        <div
          aria-hidden
          className="pointer-events-none absolute z-0 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80"
          style={{
            left: 'var(--sx, 40%)',
            top: 'var(--sy, 20%)',
            background:
              'radial-gradient(circle, rgba(91,33,230,0.22) 0%, rgba(232,121,249,0.08) 42%, transparent 68%)',
          }}
        />
      )}

      <h2
        className={cn(
          playfair.className,
          'relative z-10 mb-8 text-3xl font-semibold tracking-tight sm:text-4xl'
        )}
      >
        {WHY_TITLE.map((word, i) => (
          <span key={word} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
            <motion.span
              initial={reduceMotion ? false : { y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 * i, ease }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
        <span className="inline-block overflow-hidden align-bottom italic">
            <motion.span
              initial={reduceMotion ? false : { y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.65, delay: 0.16, ease }}
              className="inline-block bg-gradient-to-r from-violet-300 via-primary to-fuchsia-400 bg-clip-text text-transparent"
            >
            Zoplit?
          </motion.span>
        </span>
      </h2>

      <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {WHY_JOIN.map((item, i) => (
          <WhyJoinCard key={item.title} item={item} index={i} reduceMotion={!!reduceMotion} />
        ))}
      </div>
    </div>
  );
}

function WhyJoinCard({
  item,
  index,
  reduceMotion,
}: {
  item: (typeof WHY_JOIN)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const Icon = item.icon;
  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - bounds.top}px`);
  };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: 0.12 + index * 0.1, ease }}
      onMouseMove={onMove}
      className="group relative overflow-hidden rounded-xl border border-subtle bg-card p-6 transition-colors duration-300 hover:border-primary/40"
    >
      {!reduceMotion && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(200px circle at var(--mx, 50%) var(--my, 40%), rgba(91,33,230,0.22), transparent 55%)',
          }}
        />
      )}
      <div className="relative z-10">
        <motion.div
          className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"
          animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.2 }}
          whileHover={reduceMotion ? undefined : { scale: 1.12, rotate: -6 }}
        >
          <Icon size={20} className="text-primary" />
        </motion.div>
        <h3 className="mb-2 font-semibold">{item.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      </div>
    </motion.div>
  );
}
