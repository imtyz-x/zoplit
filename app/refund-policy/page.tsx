import type { Metadata } from 'next';
import { SITE_NAME } from '@/config';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Refund policy for Zoplit projects and services.',
};

const SECTIONS = [
  {
    title: '1. Before the Project Begins',
    body: [
      'If you cancel before the project has commenced (no work has started, no creator has been assigned), you are eligible for a full refund of any advance payment made.',
    ],
  },
  {
    title: '2. After the Project Has Commenced',
    body: [
      'If the project has commenced and work has begun, refunds are assessed on a case-by-case basis:',
      '• If the creator cannot fulfil the project, we will assign a replacement at no extra cost',
      '• If you cancel mid-project for reasons within your control, a partial refund may be issued based on work completed',
      '• If the delivered work does not meet the agreed brief and cannot be fixed through the included revision round, a partial or full refund may be issued',
    ],
  },
  {
    title: '3. Quality Issues',
    body: [
      'If the delivered work does not meet the standards described in your brief:',
      '• One revision round is included at no cost',
      '• If the revision does not resolve the issue, we will assign a replacement creator to redo the work',
      '• If the issue remains unresolved, a refund will be assessed based on the specific circumstances',
    ],
  },
  {
    title: '4. Non-Refundable Situations',
    body: [
      'Refunds will not be issued in the following cases:',
      '• The client changes the project scope after work has begun without agreeing to a revised quote',
      '• The client fails to provide necessary access, materials or information needed to complete the project',
      '• The client does not respond to delivery or revision requests within 14 days',
      '• The work was delivered as agreed but the client changes their mind about the project',
    ],
  },
  {
    title: '5. Refund Processing',
    body: [
      'Approved refunds are processed back to the original payment method within 7–10 working days. The exact timeline depends on your payment provider.',
    ],
  },
  {
    title: '6. How to Request a Refund',
    body: [
      'To request a refund, contact us via WhatsApp or email with your project details and the reason for the request. We will review and respond within 3 working days.',
    ],
  },
  {
    title: '7. Contact',
    body: [
      'For refund requests or questions about this policy, contact us at:',
      '[COMPANY DETAILS]',
      '[COMPANY EMAIL]',
      '[COMPANY PHONE]',
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <article className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4 mb-12">
          <p className="text-sm text-yellow-500 font-medium">
            ⚠️ LEGAL REVIEW REQUIRED BEFORE PUBLIC LAUNCH.
          </p>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Refund Policy</h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: January 2025</p>

        <div className="space-y-10">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
              <div className="space-y-2">
                {section.body.map((para, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mt-12 pt-8 border-t border-subtle">
          &copy; 2025 {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </article>
  );
}
