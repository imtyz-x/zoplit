import type { Metadata } from 'next';
import { RevealOnScroll } from '@/components/site/RevealOnScroll';

export const metadata: Metadata = {
  title: 'About',
  description: 'Zoplit is making creative execution simpler, reliable and accessible.',
};

const PRINCIPLES = [
  { title: 'Clarity', description: 'No jargon, no hidden fees, no vague promises. Everything is stated upfront.' },
  { title: 'Quality', description: 'Every creator is verified. Every project is checked before delivery.' },
  { title: 'Reliability', description: 'Deadlines matter. We commit to timelines and we meet them.' },
  { title: 'Human Creativity', description: 'Technology enables — people create. We celebrate the makers.' },
  { title: 'Execution', description: 'We don\'t list profiles. We get work finished and approved.' },
];

export default function AboutPage() {
  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
            We&apos;re making creative execution simpler.
          </h1>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed mb-16">
            <p>
              Every business needs creative work, but getting it done is a mess — searching, DMing, negotiating, chasing.
            </p>
            <p>
              Talented creators exist everywhere. Businesses that need them exist everywhere. The connection is what&apos;s broken.
            </p>
            <p>
              Zoplit fixes that.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="rounded-xl border border-subtle bg-card p-8 mb-16">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Our Mission
            </h2>
            <p className="text-xl font-medium leading-relaxed">
              Make quality creative execution simple, reliable and accessible.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <h2 className="text-xl font-semibold mb-6">Our Principles</h2>
          <div className="space-y-4 mb-16">
            {PRINCIPLES.map((principle) => (
              <div key={principle.title} className="rounded-xl border border-subtle bg-card p-6">
                <h3 className="font-semibold mb-2 text-primary">{principle.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              One city done properly before we say we&apos;re everywhere.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
