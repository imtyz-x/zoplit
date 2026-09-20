'use client';

import Link from 'next/link';
import { useRef, type MouseEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FinalCTA() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.35 });
  const glowY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.35 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !stageRef.current) return;
    const bounds = stageRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(91,33,230,0.18),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div
          ref={stageRef}
          onMouseMove={handleMove}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0912] px-6 py-16 text-center sm:px-12 lg:px-16 lg:py-24"
        >
          {!reduceMotion && (
            <>
              <motion.div
                aria-hidden
                className="pointer-events-none absolute h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: glowX,
                  top: glowY,
                  background:
                    'radial-gradient(circle, rgba(91,33,230,0.35) 0%, rgba(91,33,230,0.08) 42%, transparent 70%)',
                }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-16 top-8 h-48 w-48 rounded-full bg-primary/25 blur-3xl"
                animate={{ y: [0, 18, 0], x: [0, 12, 0], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-10 bottom-6 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
                animate={{ y: [0, -16, 0], x: [0, -10, 0], opacity: [0.25, 0.5, 0.25] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              />
            </>
          )}

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            }}
          />

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mb-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl lg:leading-[1.08]"
            >
              Have something to{' '}
              <span className="bg-gradient-to-r from-violet-300 via-primary to-fuchsia-400 bg-clip-text italic text-transparent">
                create.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground"
            >
              Tell us what you need. Let&apos;s get it moving.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24, type: 'spring', stiffness: 220, damping: 18 }}
              className="relative inline-flex"
            >
              {!reduceMotion && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -m-1 rounded-md bg-primary/35 blur-lg"
                  animate={{ opacity: [0.35, 0.8, 0.35], scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <Link href="/start-project" className="relative">
                <Button
                  size="lg"
                  className="h-14 rounded-md bg-primary px-10 text-base font-semibold text-primary-foreground shadow-[0_0_40px_rgba(91,33,230,0.55)] transition-transform hover:scale-[1.04] hover:bg-primary/90"
                >
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
