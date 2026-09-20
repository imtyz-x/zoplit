import type { Metadata } from 'next';
import { SITE_NAME } from '@/config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Zoplit.',
};

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: [
      'By using Zoplit, you agree to these Terms of Service. If you do not agree, please do not use our services.',
    ],
  },
  {
    title: '2. Services',
    body: [
      `${SITE_NAME} is a creative execution platform that connects clients with verified creators for photography, videography, video editing, reels and product shoots. We manage the project from brief to delivery, including matching, scheduling, pricing and quality checks.`,
    ],
  },
  {
    title: '3. Client Responsibilities',
    body: [
      'As a client, you agree to:',
      '• Provide accurate and complete project briefs',
      '• Approve quotes within a reasonable timeframe',
      '• Make payments as agreed in the fixed quote',
      '• Provide access to locations and materials needed for the project',
      '• Review deliverables and request revisions within the agreed revision window',
    ],
  },
  {
    title: '4. Creator Responsibilities',
    body: [
      'As a creator, you agree to:',
      '• Provide accurate information during the application process',
      '• Complete assigned projects to the agreed standard and timeline',
      '• Maintain professional conduct with clients and the Zoplit team',
      '• Deliver work that meets the project brief and quality standards',
      '• Not bypass Zoplit to work directly with clients obtained through us',
    ],
  },
  {
    title: '5. Payments',
    body: [
      'Clients pay Zoplit directly. We handle payment collection from clients and payment disbursement to creators. Payment terms and timelines are specified in each project quote.',
      'Creators are paid after the project is delivered and approved by the client.',
    ],
  },
  {
    title: '6. Cancellations and Refunds',
    body: [
      'Cancellation and refund terms are detailed in our Refund Policy. In summary:',
      '• Cancellations before a project begins may be eligible for a full or partial refund',
      '• Cancellations after work has commenced are subject to the Refund Policy terms',
      '• Replacement creators are provided for confirmed bookings where the creator cannot fulfil the project',
    ],
  },
  {
    title: '7. Intellectual Property',
    body: [
      'Upon full payment, all content created for the client is transferred to the client with full usage rights. Creators retain the right to use the work in their portfolio unless otherwise agreed.',
    ],
  },
  {
    title: '8. Limitation of Liability',
    body: [
      `${SITE_NAME} acts as a project management platform. While we verify creators and check deliverables, we are not liable for indirect or consequential damages arising from project outcomes. Our liability is limited to the project value.`,
    ],
  },
  {
    title: '9. Termination',
    body: [
      'We reserve the right to suspend or terminate accounts for violations of these Terms, including but not limited to fraud, harassment, or bypassing our payment system.',
    ],
  },
  {
    title: '10. Changes to Terms',
    body: [
      'We may update these Terms from time to time. Continued use of our services after changes constitutes acceptance of the updated Terms.',
    ],
  },
  {
    title: '11. Contact',
    body: [
      'For questions about these Terms, contact us at:',
      '[COMPANY DETAILS]',
      '[COMPANY EMAIL]',
      '[COMPANY PHONE]',
    ],
  },
];

export default function TermsPage() {
  return (
    <article className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4 mb-12">
          <p className="text-sm text-yellow-500 font-medium">
            ⚠️ LEGAL REVIEW REQUIRED BEFORE PUBLIC LAUNCH.
          </p>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
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
