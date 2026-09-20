'use client';

import { useRef, type MouseEvent } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { RevealOnScroll } from '@/components/site/RevealOnScroll';

const STEPS = [
  {
    number: '01',
    title: 'Tell us what you need',
    description:
      'A 2-minute form or one WhatsApp message. Project, deadline, done.',
  },
  {
    number: '02',
    title: 'We match & manage',
    description:
      'A verified creator is assigned. We handle scheduling and pricing. You approve one clear quote.',
  },
  {
    number: '03',
    title: 'You receive finished work',
    description:
      "Delivered on time, checked by us first. Not happy? We revise until it's right.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 140, damping: 22, mass: 0.4 });
  const glowY = useSpring(mouseY, { stiffness: 140, damping: 22, mass: 0.4 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = sectionRef.current?.getBoundingClientRect();
    if (!bounds) return;
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  };

  return (
    <section className="section-bg py-20 lg:py-28">
      <div
        ref={sectionRef}
        onMouseMove={handleMove}
        className="relative mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8"
      >
        {!reduceMotion && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute z-0 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: glowX,
              top: glowY,
              background:
                'radial-gradient(circle, rgba(91,33,230,0.28) 0%, rgba(91,33,230,0.08) 38%, transparent 68%)',
            }}
          />
        )}

        <RevealOnScroll>
          <h2 className="relative z-10 mb-16 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Getting creative work done shouldn&apos;t be complicated.
          </h2>
        </RevealOnScroll>

        <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          <div className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden h-px md:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="h-full origin-left bg-gradient-to-r from-primary via-primary/50 to-transparent"
            />
            {!reduceMotion && (
              <motion.span
                className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_16px_#5b21e6]"
                animate={{ left: ['6%', '50%', '88%', '6%'] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </div>

          {STEPS.map((step, i) => (
            <RevealOnScroll key={step.number} delay={i * 0.15}>
              <StepCard step={step} index={i} reduceMotion={!!reduceMotion} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
  reduceMotion,
}: {
  step: (typeof STEPS)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 180,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), {
    stiffness: 180,
    damping: 18,
  });
  const spotlightX = useTransform(mx, (value) => `${value * 100}%`);
  const spotlightY = useTransform(my, (value) => `${value * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${spotlightX} ${spotlightY}, rgba(91,33,230,0.28), transparent 55%)`;

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const bounds = cardRef.current.getBoundingClientRect();
    mx.set((event.clientX - bounds.left) / bounds.width);
    my.set((event.clientY - bounds.top) / bounds.height);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 900 }
      }
      className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#111018]/80 p-6 md:p-7"
    >
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      )}

      <div className="relative z-10">
        <motion.div
          className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-subtle bg-card text-sm font-bold text-primary"
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -4, 0], boxShadow: ['0 0 0 rgba(91,33,230,0)', '0 0 18px rgba(91,33,230,0.35)', '0 0 0 rgba(91,33,230,0)'] }
          }
          transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.35 }}
        >
          {step.number}
        </motion.div>
        <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
        <p className="leading-relaxed text-muted-foreground">{step.description}</p>
      </div>
    </motion.div>
  );
}
