'use client';

import { motion } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const REASONS = [
  {
    numeral: 'I',
    title: 'Right Talent',
    description:
      'Every creator is ID-verified, portfolio-reviewed and test-project checked.',
  },
  {
    numeral: 'II',
    title: 'Less Searching',
    description:
      'Stop DMing ten people and hoping they show up. One request. We handle the rest.',
  },
  {
    numeral: 'III',
    title: 'One Workflow',
    description:
      'Brief, pricing, files, payment — one place. Nothing lost in chat chaos.',
  },
  {
    numeral: 'IV',
    title: 'Built for Execution',
    description:
      "We're not a directory of profiles. We get work finished and approved.",
  },
];

const HEADING_WORDS = ['Why', 'businesses', 'choose'];

const ease = [0.22, 1, 0.36, 1] as const;

export function WhyZoplit() {
  return (
    <section className="section-bg py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.28em' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease }}
            className="mb-5 text-[11px] font-medium uppercase text-primary"
          >
            The reasons
          </motion.p>

          <h2
            className={cn(
              playfair.className,
              'text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight leading-[1.15] text-balance'
            )}
          >
            {HEADING_WORDS.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.28em] align-bottom">
                <motion.span
                  initial={{ y: '110%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: 0.08 * i, ease }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="inline-block overflow-hidden align-bottom italic text-primary">
              <motion.span
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.28, ease }}
                className="inline-block"
              >
                Zoplit.
              </motion.span>
            </span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="mt-8 h-px origin-left bg-gradient-to-r from-primary via-white/20 to-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {REASONS.map((reason, i) => (
            <motion.article
              key={reason.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.12 * i, ease }}
              className={cn(
                'group relative py-8 md:p-10',
                i % 2 === 0 ? 'md:border-r md:border-white/10 md:pr-12' : 'md:pl-12',
                i < REASONS.length - 1 && 'border-b border-white/10',
                i < 2 && 'md:border-b md:border-white/10',
                i >= 2 && 'md:border-b-0'
              )}
            >
              <div className="flex items-baseline gap-4 mb-4">
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + 0.12 * i }}
                  className={cn(
                    playfair.className,
                    'text-2xl italic text-primary/80 tabular-nums'
                  )}
                >
                  {reason.numeral}
                </motion.span>
                <h3
                  className={cn(
                    playfair.className,
                    'text-2xl font-medium tracking-tight overflow-hidden'
                  )}
                >
                  <motion.span
                    initial={{ y: '100%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.55,
                      delay: 0.22 + i * 0.1,
                      ease,
                    }}
                    className="inline-block"
                  >
                    {reason.title}
                  </motion.span>
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                {reason.description}
              </p>
              <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-24 md:left-10" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
