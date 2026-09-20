import Link from 'next/link';
import Image from 'next/image';
import { SITE_NAME, TAGLINE, FOOTER_EXPLORE, FOOTER_GET_STARTED, FOOTER_LEGAL } from '@/config';
import { FooterSocial } from '@/components/site/FooterSocial';

export function Footer() {
  return (
    <footer className="section-bg border-t border-subtle mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-3"
              aria-label={`${SITE_NAME} home`}
            >
              <span
                className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-black"
                style={{
                  filter: 'drop-shadow(0 2px 6px rgba(91, 33, 230, 0.45))',
                }}
              >
                <Image
                  src="/logo.png"
                  alt=""
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="text-xl font-bold tracking-tight">
                {SITE_NAME.toUpperCase()}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">
              {TAGLINE}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Get creative work done without the search, negotiation and chaos.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Explore</h3>
            <ul className="space-y-3">
              {FOOTER_EXPLORE.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Get Started</h3>
            <ul className="space-y-3">
              {FOOTER_GET_STARTED.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <FooterSocial />
        </div>

        <div className="mt-12 pt-8 border-t border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            {FOOTER_LEGAL.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; 2026 {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
