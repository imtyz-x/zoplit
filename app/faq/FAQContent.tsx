'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FAQ_SECTIONS } from './faq-data';

export function FAQContent() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <header className="mb-14">
        <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Frequently asked questions.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Everything you might want to know about Zoplit.
        </p>
      </header>

      {FAQ_SECTIONS.map((section) => (
        <section key={section.category} className="mb-14 last:mb-0">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {section.category}
          </h2>
          <AccordionPrimitive.Root type="single" collapsible className="border-t border-subtle">
            {section.items.map((item, i) => (
              <AccordionPrimitive.Item
                key={item.question}
                value={`${section.category}-${i}`}
                className="border-b border-subtle"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger
                    className={cn(
                      'group flex min-h-[48px] w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-medium text-foreground sm:text-base',
                      'outline-none transition-colors hover:text-primary',
                      'focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                    )}
                  >
                    <span className="pr-2">{item.question}</span>
                    <span
                      aria-hidden
                      className="relative h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary group-data-[state=open]:text-primary"
                    >
                      <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-current" />
                      <span
                        className={cn(
                          'absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-current',
                          'group-data-[state=open]:scale-y-0',
                          !reduceMotion && 'transition-transform duration-200'
                        )}
                      />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content
                  className={cn(
                    'overflow-hidden',
                    !reduceMotion &&
                      'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
                  )}
                >
                  <div
                    className={cn(
                      'space-y-3 pb-5 text-[15px] leading-relaxed text-muted-foreground',
                      '[&_ul]:mt-1 [&_ul]:space-y-1.5 [&_ul]:pl-0',
                      '[&_li]:relative [&_li]:pl-4',
                      '[&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.55em] [&_li]:before:h-1 [&_li]:before:w-1 [&_li]:before:rounded-full [&_li]:before:bg-primary/70'
                    )}
                  >
                    {item.answer}
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </section>
      ))}
    </div>
  );
}
