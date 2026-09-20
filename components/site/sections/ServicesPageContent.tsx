'use client';

import Link from 'next/link';
import { useRef, type ElementType, type MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Camera, Video, Film, Smartphone, Package, ArrowRight, Check } from 'lucide-react';
import { SERVICES, type ServiceSlug } from '@/config';
import { buildWhatsAppUrl, setWhatsAppContext } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';

const ICONS: Record<string, ElementType> = {
  Camera,
  Video,
  Film,
  Smartphone,
  Package,
};

const TITLE_WORDS = ['Creative', 'services,', 'done'] as const;
const TITLE_ACCENT = 'end to end.';

const CARD_COPY: Record<ServiceSlug, string> = {
  photography:
    'Event, brand and product shoots at your location — edited photos delivered, ready to use.',
  videography: 'Reels, event films and brand videos — shot, edited and delivered to end.',
  'video-editing': 'Send your raw footage. Get back clean, ready-to-post edits.',
  'reels-shortform': 'Short videos built to stop the scroll on Instagram and YouTube.',
  'product-shoots': 'Catalogue, e-commerce and social-ready product photography that sells.',
};

const TRUST_ITEMS = [
  'Verified creators',
  'Fixed quotes',
  'Managed delivery',
  'One revision included',
];

export function ServicesPageContent() {
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
      className="relative mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {!reduceMotion && (
        <div
          aria-hidden
          className="pointer-events-none absolute z-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80"
          style={{
            left: 'var(--sx, 50%)',
            top: 'var(--sy, 20%)',
            background:
              'radial-gradient(circle, rgba(91,33,230,0.22) 0%, rgba(91,33,230,0.06) 40%, transparent 68%)',
          }}
        />
      )}

      <div className="relative z-10">
        <h1 className="mb-4 max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {TITLE_WORDS.map((word, i) => (
            <span key={word} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
              <motion.span
                initial={reduceMotion ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.65, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              initial={reduceMotion ? false : { y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-primary"
            >
              {TITLE_ACCENT}
            </motion.span>
          </span>
        </h1>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12 max-w-2xl text-lg text-muted-foreground"
        >
          Five services. One team managing everything from brief to delivery.
        </motion.p>

        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] || Camera;
            return (
              <motion.div
                key={service.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <ServiceCard
                  href={`/services/${service.slug}`}
                  name={service.name}
                  description={CARD_COPY[service.slug]}
                  Icon={Icon}
                  reduceMotion={!!reduceMotion}
                  index={i}
                />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-y border-subtle py-5 text-sm text-muted-foreground"
        >
          {TRUST_ITEMS.map((item) => (
            <span key={item} className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-primary" strokeWidth={2.5} aria-hidden />
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.82 }}
          className="mx-auto mt-16 max-w-2xl text-center"
        >
          <h2 className="mb-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Not sure which service you need?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Tell us what you&apos;re trying to achieve. We&apos;ll suggest the right one — no
            pressure.
          </p>
          <Button
            asChild
            className="h-12 rounded-md bg-primary px-8 text-sm font-semibold tracking-wide text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/start-project">START A PROJECT</Link>
          </Button>
          <p className="mt-4">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                event.preventDefault();
                window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer');
              }}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Or ask us directly on WhatsApp →
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function ServiceCard({
  href,
  name,
  description,
  Icon,
  reduceMotion,
  index,
}: {
  href: string;
  name: string;
  description: string;
  Icon: ElementType;
  reduceMotion: boolean;
  index: number;
}) {
  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - bounds.top}px`);
  };

  return (
    <Link
      href={href}
      onMouseMove={onMove}
      onClick={() => setWhatsAppContext({ service: name })}
      className="group relative block overflow-hidden rounded-xl border border-subtle bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary"
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
        <h2 className="mb-2 text-lg font-semibold">{name}</h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
          Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
