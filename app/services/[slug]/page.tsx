import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Camera, Video, Film, Smartphone, Package, Check, ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RevealOnScroll } from '@/components/site/RevealOnScroll';
import { Button } from '@/components/ui/button';
import { SERVICES, ServiceSlug } from '@/config';
import { SetWhatsAppContext } from '@/components/site/SetWhatsAppContext';

const ICONS: Record<string, React.ElementType> = {
  Camera,
  Video,
  Film,
  Smartphone,
  Package,
};

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: service.name,
    description: service.shortDesc,
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const Icon = ICONS[service.icon] || Camera;

  return (
    <article className="pt-32 pb-20">
      <SetWhatsAppContext service={service.name} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-6">
            <Icon size={28} className="text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            {service.name}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            {service.intro}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <h2 className="text-xl font-semibold mb-4">What you can get</h2>
          <ul className="space-y-3 mb-12">
            {service.offerings.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 mt-0.5 flex-shrink-0">
                  <Check size={12} className="text-primary" />
                </div>
                <span className="text-muted-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <h2 className="text-xl font-semibold mb-4">Who it&apos;s for</h2>
          <ul className="space-y-3 mb-12">
            {service.audience.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 mt-0.5 flex-shrink-0">
                  <Check size={12} className="text-primary" />
                </div>
                <span className="text-muted-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <h2 className="text-xl font-semibold mb-6">How it works</h2>
          <ol className="space-y-4 mb-12">
            {service.process.map((step, i) => (
              <li key={step} className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-subtle bg-card text-sm font-bold text-primary flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </RevealOnScroll>

        <RevealOnScroll delay={0.25}>
          <h2 className="text-xl font-semibold mb-4">FAQ</h2>
          <Accordion type="single" collapsible className="mb-12">
            {service.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <div className="rounded-xl border border-subtle bg-card p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
            <Link href="/start-project">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-base px-8 h-12">
                Start a {service.name} Project
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </article>
  );
}
