'use client';

import { motion } from 'framer-motion';

const SOCIALS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/zoplit.co?igsi=MWYzcDZhZ2VkY2V3aQ==',
    icon: InstagramIcon,
  },
  {
    name: 'Threads',
    href: 'https://www.threads.com/@zoplit.co?igshid=NTc4MTIwNjQ2YQ==',
    icon: ThreadsIcon,
  },
  {
    name: 'X',
    href: 'https://x.com/zoplit?s=11',
    icon: XIcon,
  },
  {
    name: 'Pinterest',
    href: 'https://pin.it/3UpfhbT9D',
    icon: PinterestIcon,
  },
] as const;

export function FooterSocial() {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground mb-4">Let&apos;s get social</h3>
      <div className="flex flex-wrap items-center gap-3">
        {SOCIALS.map((social) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Zoplit on ${social.name}`}
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.86, rotate: -6 }}
              transition={{ type: 'spring', stiffness: 520, damping: 18 }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black text-foreground hover:border-primary hover:text-primary hover:bg-primary/10 focus-visible:outline-none"
            >
              <Icon />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19.35 8.4C17.7 5.35 14.85 3.9 11.55 3.9 6.4 3.9 3.6 7.45 3.6 12s2.8 8.1 7.95 8.1c2.7 0 5.05-.9 6.55-2.6"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <path
        d="M15.55 11.85c0 2.05-1.5 3.35-3.35 3.35s-3.35-1.3-3.35-3.35 1.5-3.35 3.35-3.35c.9 0 1.7.3 2.3.85"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <path
        d="M15.55 11.85c.45-2.2 2-3.3 3.7-2.95"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M18.24 3.5h2.98l-6.52 7.45 7.67 10.05h-6.01l-4.7-6.14-5.38 6.14H3.3l6.97-7.97L1.9 3.5h6.16l4.24 5.6 5.94-5.6Zm-1.05 15.8h1.65L6.9 5.2H5.13l12.06 14.1Z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 3.2A8.8 8.8 0 0 0 7.7 20c.1-.7.3-1.8.7-2.6.3-.8 2-7.6 2-7.6s-.5-1-.5-2.5c0-2.3 1.4-4.1 3.1-4.1 1.4 0 2.1 1.1 2.1 2.4 0 1.5-1 3.7-1.5 5.7-.4 1.7.9 3.1 2.6 3.1 3.1 0 5.2-4 5.2-8.7 0-3.6-2.4-6.3-6.8-6.3-5 0-8.1 3.7-8.1 7.8 0 1.4.4 2.4 1.1 3.2.3.3.3.4.2.8l-.4 1.5c-.1.5-.4.6-.9.4-2.5-1-3.7-3.8-3.7-6.9 0-5.1 4.3-11.3 12.9-11.3 6.9 0 11.4 5 11.4 10.3 0 7-3.9 12.3-9.6 12.3-1.9 0-3.7-1-4.3-2.2l-1.2 4.5c-.4 1.5-1.6 3.4-2.4 4.6A8.8 8.8 0 1 0 12 3.2Z" />
    </svg>
  );
}
