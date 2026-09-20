import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { RevealOnScroll } from '@/components/site/RevealOnScroll';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'How Zoplit works for clients and creators — from brief to finished work.',
};

const CLIENT_STEPS = [
  {
    title: 'Tell us what you need',
    description:
      'Fill out a 2-minute form or send us a WhatsApp message. Tell us the project type, deadline and location. That\'s all we need to get started.',
  },
  {
    title: 'We match you with a creator',
    description:
      'Based on your brief, we assign a verified creator whose portfolio and skills match your project. You don\'t have to search or negotiate.',
  },
  {
    title: 'You approve a fixed quote',
    description:
      'We send you one clear quote with deliverables, timeline and price. No back-and-forth. You approve or request changes — once.',
  },
  {
    title: 'The work is done and delivered',
    description:
      'The creator executes the project on schedule. We check the work before handing it over. Not happy? We revise until it\'s right.',
  },
];

const CREATOR_STEPS = [
  { title: 'Apply', description: 'Submit your portfolio, skills and details through our application form.' },
  { title: 'Get Verified', description: 'ID check, portfolio review and a paid test project to confirm quality.' },
  { title: 'Receive Projects', description: 'Get briefs that match your skills, location and availability.' },
  { title: 'Deliver & Get Paid', description: 'Complete the work, get it approved, and receive payment — no chasing.' },
];

const INCLUDED = [
  'Detailed brief from the client',
  'Fixed quote with clear deliverables',
  'Scheduling handled by us',
  'Managed delivery and quality check',
  'One revision round included',
  'Replacement guarantee on confirmed bookings',
];

const FAQS = [
  {
    question: 'How long does the whole process take?',
    answer:
      'From submitting your brief to receiving a quote, typically within a few working hours. The project timeline itself depends on scope — your quote will include a delivery date.',
  },
  {
    question: 'What if I need to change something after the project starts?',
    answer:
      'Small changes within the original scope are fine. Major scope changes may require a revised quote. We will always communicate this upfront before proceeding.',
  },
  {
    question: 'Do I communicate directly with the creator?',
    answer:
      'We handle the project management side. If direct communication is needed during the shoot or project, we will set that up. Otherwise, we are your single point of contact.',
  },
  {
    question: 'What is the replacement guarantee?',
    answer:
      'If a confirmed booking falls through due to the creator, we assign a replacement at no extra cost. If the issue is on our end, we make it right — no extra charge to you.',
  },
];

export default function HowItWorksPage() {
  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            How Zoplit works.
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Simple on both sides. Here&apos;s what happens from brief to finished work.
          </p>
        </RevealOnScroll>

        {/* Client workflow */}
        <RevealOnScroll delay={0.1}>
          <h2 className="text-xl font-semibold mb-6">For clients</h2>
          <ol className="space-y-6 mb-16">
            {CLIENT_STEPS.map((step, i) => (
              <li key={step.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-subtle bg-card text-primary font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </RevealOnScroll>

        {/* Creator workflow */}
        <RevealOnScroll delay={0.15}>
          <h2 className="text-xl font-semibold mb-6">For creators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {CREATOR_STEPS.map((step, i) => (
              <div key={step.title}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-subtle bg-card text-primary font-bold text-sm mb-3">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* What's included */}
        <RevealOnScroll delay={0.2}>
          <h2 className="text-xl font-semibold mb-6">What&apos;s included</h2>
          <ul className="space-y-3 mb-16">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 mt-0.5 flex-shrink-0">
                  <Check size={12} className="text-primary" />
                </div>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        {/* FAQ */}
        <RevealOnScroll delay={0.25}>
          <h2 className="text-xl font-semibold mb-4">FAQ</h2>
          <Accordion type="single" collapsible className="mb-16">
            {FAQS.map((faq, i) => (
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

        {/* CTA */}
        <RevealOnScroll delay={0.3}>
          <div className="rounded-xl border border-subtle bg-card p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to start?</h2>
            <p className="text-muted-foreground mb-6">Tell us what you need. We take it from here.</p>
            <Link href="/start-project">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-base px-8 h-12">
                Start a Project
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
