import type { Metadata } from 'next';
import { SITE_NAME } from '@/config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Zoplit.',
};

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: [
      'We collect information you provide directly to us when you fill out forms on our website, including:',
      '• Name, email address, phone number and WhatsApp number',
      '• Project details including service type, deadline, location and budget',
      '• Business name (if provided)',
      '• Portfolio links, Instagram handle and other details provided by creators',
      '• Messages and communications you send to us',
      'We also collect basic usage data such as pages visited and device information through standard analytics tools.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    body: [
      'We use the information you provide to:',
      '• Match you with a suitable creator for your project',
      '• Contact you about your project or application',
      '• Send you quotes, project updates and deliverables',
      '• Process payments and manage project workflows',
      '• Improve our services and user experience',
    ],
  },
  {
    title: '3. Information Sharing',
    body: [
      'We do not sell your personal information. We share information only as necessary to deliver our services:',
      '• With the creator assigned to your project (project details, location and contact information)',
      '• With payment processing providers to handle transactions',
      '• When required by law or legal process',
    ],
  },
  {
    title: '4. Data Storage and Security',
    body: [
      'Your data is stored securely using industry-standard encryption and access controls. We retain your information for as long as necessary to provide our services and comply with legal obligations.',
    ],
  },
  {
    title: '5. Your Rights',
    body: [
      'You have the right to:',
      '• Access the personal information we hold about you',
      '• Request correction of inaccurate information',
      '• Request deletion of your personal information (subject to legal requirements)',
      '• Opt out of marketing communications at any time',
      'To exercise these rights, contact us at [COMPANY EMAIL].',
    ],
  },
  {
    title: '6. Cookies',
    body: [
      'We use essential cookies to ensure our website functions properly. We do not use tracking cookies for advertising purposes without your consent.',
    ],
  },
  {
    title: '7. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy on this page.',
    ],
  },
  {
    title: '8. Contact Us',
    body: [
      'For any questions about this Privacy Policy, please contact us at:',
      '[COMPANY DETAILS]',
      '[COMPANY EMAIL]',
      '[COMPANY PHONE]',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <article className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4 mb-12">
          <p className="text-sm text-yellow-500 font-medium">
            ⚠️ LEGAL REVIEW REQUIRED BEFORE PUBLIC LAUNCH.
          </p>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
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
