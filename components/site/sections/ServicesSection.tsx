'use client';

import Link from 'next/link';
import { Camera, Video, Film, Smartphone, Package, ArrowRight } from 'lucide-react';
import { RevealOnScroll } from '@/components/site/RevealOnScroll';
import { SERVICES } from '@/config';
import { setWhatsAppContext } from '@/lib/whatsapp';

const ICONS: Record<string, React.ElementType> = {
  Camera,
  Video,
  Film,
  Smartphone,
  Package,
};

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-balance">
            What we can execute for you.
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Five services we do properly. Not fifty we can&apos;t.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] || Camera;
            return (
              <RevealOnScroll key={service.slug} delay={i * 0.1}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full"
                  onClick={() => setWhatsAppContext({ service: service.name })}
                >
                  <div className="h-full rounded-xl border border-subtle bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card/80">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-5 transition-transform group-hover:scale-110">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
