import Link from 'next/link';
import type { ReactNode } from 'react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const linkClass =
  'text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline';

function Internal({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

function WhatsAppLink({ children }: { children: ReactNode }) {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        event.preventDefault();
        window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer');
      }}
      className={linkClass}
    >
      {children}
    </a>
  );
}

export type FaqItem = {
  question: string;
  answer: ReactNode;
};

export type FaqSection = {
  category: string;
  items: FaqItem[];
};

export const FAQ_SECTIONS: FaqSection[] = [
  {
    category: 'CLIENTS',
    items: [
      {
        question: 'What is Zoplit?',
        answer: (
          <>
            <p>
              Zoplit is a creative execution platform that helps businesses and individuals get
              creative work done through creative professionals.
            </p>
            <p>
              Instead of searching across multiple platforms, chats and referrals, you can tell us
              what you need and we help move the project toward execution.
            </p>
          </>
        ),
      },
      {
        question: 'What services can I get through Zoplit?',
        answer: (
          <>
            <p>Zoplit initially focuses on:</p>
            <ul>
              <li>Photography</li>
              <li>Videography</li>
              <li>Video Editing</li>
              <li>Reels &amp; Short-form Content</li>
              <li>Product Shoots</li>
            </ul>
            <p>More creative services may be introduced as the Zoplit creator network grows.</p>
          </>
        ),
      },
      {
        question: 'How does booking work?',
        answer: (
          <>
            <p>
              Tell us what you need through the{' '}
              <Internal href="/start-project">Start a Project</Internal> form.
            </p>
            <p>Share your requirements, deadline and other relevant details.</p>
            <p>
              We&apos;ll review the request, understand what the project needs and connect you with
              the appropriate creative professional or next step.
            </p>
          </>
        ),
      },
      {
        question: 'What happens after I submit a project?',
        answer: (
          <>
            <p>Your project request is reviewed by the Zoplit team.</p>
            <p>
              We may contact you through WhatsApp, phone or email to clarify requirements, discuss
              the project and confirm the next step.
            </p>
          </>
        ),
      },
      {
        question: 'How quickly will someone contact me?',
        answer: (
          <>
            <p>We aim to review project requests as soon as possible.</p>
            <p>Response times may vary depending on the project, service and availability.</p>
          </>
        ),
      },
      {
        question: 'Can I request a specific creator?',
        answer: (
          <>
            <p>
              If you already have a creator in mind, tell us in your project request.
            </p>
            <p>We&apos;ll check their availability and whether they&apos;re suitable for the project.</p>
            <p>A specific creator cannot be guaranteed until the project is confirmed.</p>
          </>
        ),
      },
      {
        question: 'Can I choose the creator myself?',
        answer: (
          <>
            <p>For some projects, you may be able to request a specific creator.</p>
            <p>
              For other projects, Zoplit may recommend a suitable creative professional based on the
              project&apos;s requirements, skills and availability.
            </p>
          </>
        ),
      },
      {
        question: 'What information should I provide when starting a project?',
        answer: (
          <>
            <p>The more context you provide, the better we can understand the project.</p>
            <p>Useful information includes:</p>
            <ul>
              <li>Type of creative work</li>
              <li>Objective</li>
              <li>Reference examples</li>
              <li>Required deliverables</li>
              <li>Deadline</li>
              <li>Location, if relevant</li>
              <li>Budget range</li>
              <li>Files or existing assets</li>
            </ul>
          </>
        ),
      },
      {
        question: 'Can I upload reference files or examples?',
        answer: (
          <>
            <p>Yes, when the project form supports file uploads.</p>
            <p>
              You can also share relevant references, links or examples that help explain the style
              or outcome you&apos;re looking for.
            </p>
          </>
        ),
      },
      {
        question: 'Can I change my requirements after submitting a project?',
        answer: (
          <>
            <p>You can contact Zoplit if your requirements change.</p>
            <p>
              Changes may affect the scope, timeline or project cost, so they should be confirmed
              before additional work begins.
            </p>
          </>
        ),
      },
      {
        question: 'Can I request revisions?',
        answer: (
          <>
            <p>Revision terms depend on the service and project scope.</p>
            <p>The agreed revision process should be confirmed before the project begins.</p>
          </>
        ),
      },
      {
        question: "What if I don't like the work?",
        answer: (
          <>
            <p>Tell us as soon as possible.</p>
            <p>
              We&apos;ll review the issue with you and the creator and determine the appropriate
              next step based on the agreed project scope and revision terms.
            </p>
          </>
        ),
      },
      {
        question: 'How do payments work?',
        answer: (
          <>
            <p>Payment terms depend on the project and Zoplit&apos;s current payment process.</p>
            <p>
              Before a project is confirmed, the applicable price, payment requirements and project
              terms should be clearly communicated.
            </p>
          </>
        ),
      },
      {
        question: 'Is there a minimum project budget?',
        answer: (
          <>
            <p>Zoplit may introduce minimum project requirements depending on the service.</p>
            <p>If a minimum applies, it will be communicated before the project is confirmed.</p>
          </>
        ),
      },
      {
        question: 'Can I cancel a project?',
        answer: (
          <>
            <p>
              Cancellation depends on the project&apos;s stage, agreed terms and work already
              completed.
            </p>
            <p>Contact Zoplit as soon as possible if you need to cancel.</p>
            <p>
              See the{' '}
              <Internal href="/refund-policy">Refund &amp; Cancellation Policy</Internal> for the
              applicable terms.
            </p>
          </>
        ),
      },
      {
        question: 'Who owns the final content?',
        answer: (
          <>
            <p>Ownership and usage rights depend on the agreed project terms.</p>
            <p>
              The ownership or licensing arrangement should be clarified before the project is
              confirmed.
            </p>
          </>
        ),
      },
      {
        question: 'Can I use the content commercially?',
        answer: (
          <>
            <p>
              Commercial usage depends on the agreed project terms and the type of content created.
            </p>
            <p>
              If commercial usage is important to your project, mention it when submitting your
              requirements.
            </p>
          </>
        ),
      },
      {
        question: 'Can Zoplit or the creator use my project in their portfolio?',
        answer: (
          <>
            <p>Portfolio usage should be agreed upon according to the project terms.</p>
            <p>
              If your project or content is confidential, tell Zoplit before the project begins.
            </p>
          </>
        ),
      },
    ],
  },
  {
    category: 'CREATORS',
    items: [
      {
        question: 'Who can join Zoplit?',
        answer: (
          <>
            <p>
              Zoplit is looking for skilled creative professionals who can deliver quality work
              reliably.
            </p>
            <p>
              Depending on the service, this may include photographers, videographers, video editors
              and other creative specialists.
            </p>
          </>
        ),
      },
      {
        question: 'How do I join?',
        answer: (
          <>
            <p>
              Submit the creator application through the{' '}
              <Internal href="/become-a-creator">Become a Creator</Internal> page.
            </p>
            <p>
              We&apos;ll review your information, skills and portfolio before determining the next
              step.
            </p>
          </>
        ),
      },
      {
        question: 'What do I need to apply?',
        answer: (
          <>
            <p>You should provide:</p>
            <ul>
              <li>Basic information</li>
              <li>Location</li>
              <li>Primary skill</li>
              <li>Experience</li>
              <li>Portfolio</li>
              <li>Relevant social links, if available</li>
              <li>Availability</li>
              <li>Short introduction</li>
            </ul>
            <p>A strong portfolio is important.</p>
          </>
        ),
      },
      {
        question: 'How do I get projects?',
        answer: (
          <>
            <p>
              Project opportunities depend on client demand, your skills, availability, location and
              project requirements.
            </p>
            <p>Joining Zoplit does not guarantee a specific number of projects.</p>
          </>
        ),
      },
      {
        question: 'Can I choose which projects I accept?',
        answer: (
          <>
            <p>Project acceptance depends on Zoplit&apos;s workflow and the specific project.</p>
            <p>
              The applicable expectations will be communicated to creators as the platform develops.
            </p>
          </>
        ),
      },
      {
        question: 'When am I paid?',
        answer: (
          <>
            <p>Payment timing depends on the project&apos;s payment and completion process.</p>
            <p>
              The exact creator payout terms will be communicated before a creator accepts a
              project.
            </p>
          </>
        ),
      },
      {
        question: 'Can I work with my own clients outside Zoplit?',
        answer: (
          <>
            <p>Yes, unless a specific agreement with Zoplit states otherwise.</p>
            <p>
              Zoplit is designed to create additional project opportunities rather than replace your
              independent creative career.
            </p>
          </>
        ),
      },
      {
        question: 'What happens if I cannot complete a project?',
        answer: (
          <>
            <p>Inform Zoplit as early as possible.</p>
            <p>
              Reliability is important because delays can affect the client and the project.
            </p>
          </>
        ),
      },
      {
        question: 'Does Zoplit guarantee work or income?',
        answer: (
          <>
            <p>No.</p>
            <p>
              Joining Zoplit does not guarantee projects, income or a specific number of bookings.
            </p>
            <p>
              Opportunities depend on client demand, availability, skills and project requirements.
            </p>
          </>
        ),
      },
    ],
  },
  {
    category: 'PROJECTS',
    items: [
      {
        question: 'How are projects managed?',
        answer: (
          <>
            <p>Zoplit aims to keep the project process simple:</p>
            <ul>
              <li>Request</li>
              <li>Match / Plan</li>
              <li>Create</li>
              <li>Review</li>
              <li>Deliver</li>
            </ul>
            <p>The exact workflow may vary depending on the service.</p>
          </>
        ),
      },
      {
        question: 'How long does a project take?',
        answer: (
          <>
            <p>
              Project timelines depend on the type of service, scope, complexity, creator
              availability and client requirements.
            </p>
            <p>A timeline should be discussed and confirmed before the project begins.</p>
          </>
        ),
      },
      {
        question: 'Can I provide my own creative direction?',
        answer: (
          <>
            <p>Absolutely.</p>
            <p>
              Clients should provide references, examples, brand guidelines and specific
              requirements whenever possible.
            </p>
            <p>The clearer the brief, the easier it is to execute the project accurately.</p>
          </>
        ),
      },
      {
        question: 'What if my project is urgent?',
        answer: (
          <>
            <p>Tell us your required deadline when submitting the project.</p>
            <p>
              We&apos;ll check whether the required timeline is realistic based on the service and
              creator availability.
            </p>
          </>
        ),
      },
      {
        question: 'Can I request changes during the project?',
        answer: (
          <>
            <p>You can communicate changes to Zoplit.</p>
            <p>
              However, major changes to the original brief may affect the timeline, scope or cost.
            </p>
          </>
        ),
      },
      {
        question: 'How do I receive the final files?',
        answer: (
          <>
            <p>Final delivery depends on the project and agreed delivery method.</p>
            <p>The delivery format and method should be confirmed before completion.</p>
          </>
        ),
      },
    ],
  },
  {
    category: 'PAYMENTS & POLICIES',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer: (
          <p>
            Available payment methods will be shown or communicated during the project confirmation
            process.
          </p>
        ),
      },
      {
        question: 'Are payments secure?',
        answer: (
          <p>
            Zoplit will use established payment infrastructure when online payments are enabled.
          </p>
        ),
      },
      {
        question: 'What is your refund policy?',
        answer: (
          <>
            <p>
              Refund eligibility depends on the project&apos;s status, agreed terms and the
              circumstances of the request.
            </p>
            <p>
              See the{' '}
              <Internal href="/refund-policy">Refund &amp; Cancellation Policy</Internal> for the
              current rules.
            </p>
          </>
        ),
      },
      {
        question: 'What happens if a creator cancels?',
        answer: (
          <>
            <p>If a creator becomes unavailable, contact Zoplit.</p>
            <p>
              We&apos;ll review the situation and determine the appropriate next step, which may
              include finding another suitable creative professional where possible.
            </p>
          </>
        ),
      },
      {
        question: 'What happens if the project scope changes?',
        answer: (
          <>
            <p>A significant change in scope may affect the project timeline or cost.</p>
            <p>Any major change should be agreed upon before additional work begins.</p>
          </>
        ),
      },
    ],
  },
  {
    category: 'GENERAL',
    items: [
      {
        question: 'Where is Zoplit available?',
        answer: (
          <>
            <p>
              Zoplit is initially focused on serving clients and building its creator network in
              selected locations in India.
            </p>
            <p>Availability depends on the service and creator network.</p>
          </>
        ),
      },
      {
        question: 'Can people outside our launch city use Zoplit?',
        answer: (
          <>
            <p>
              Some creative services can be delivered remotely, while photography and videography
              may depend on local creator availability.
            </p>
            <p>Tell us what you need and we&apos;ll determine whether we can support the project.</p>
          </>
        ),
      },
      {
        question: 'Is Zoplit only for businesses?',
        answer: (
          <>
            <p>No.</p>
            <p>
              Zoplit can serve businesses, individuals and other clients who need professional
              creative work.
            </p>
          </>
        ),
      },
      {
        question: 'Is Zoplit only for large companies?',
        answer: (
          <>
            <p>No.</p>
            <p>
              Zoplit is designed to help anyone who needs professional creative execution, from
              individuals and small businesses to growing brands and larger teams.
            </p>
          </>
        ),
      },
      {
        question: 'Do I need to hire a creator full-time?',
        answer: (
          <>
            <p>No.</p>
            <p>
              Zoplit is designed around project-based creative execution, allowing clients to access
              creative skills without necessarily hiring someone full-time.
            </p>
          </>
        ),
      },
      {
        question: 'How does Zoplit select creators?',
        answer: (
          <p>
            Creator applications can be reviewed based on factors such as skills, portfolio,
            experience, reliability and project suitability.
          </p>
        ),
      },
      {
        question: 'How do I contact Zoplit?',
        answer: (
          <>
            <p>
              You can contact Zoplit through the <Internal href="/contact">Contact</Internal> page
              or{' '}
              <WhatsAppLink>WhatsApp</WhatsAppLink>.
            </p>
            <p>
              For project requests, using{' '}
              <Internal href="/start-project">Start a Project</Internal> is recommended because it
              gives us the information needed to understand your requirements.
            </p>
          </>
        ),
      },
      {
        question: 'What happens to my information?',
        answer: (
          <>
            <p>
              Zoplit may collect information needed to respond to enquiries, manage projects and
              provide its services.
            </p>
            <p>
              See the <Internal href="/privacy">Privacy Policy</Internal> for details about how
              information is handled.
            </p>
          </>
        ),
      },
      {
        question: 'Is my project information confidential?',
        answer: (
          <>
            <p>We take project information seriously.</p>
            <p>
              If your project contains confidential or sensitive material, mention this when
              submitting your project and review the applicable terms before sharing confidential
              information.
            </p>
          </>
        ),
      },
      {
        question: 'I still have a question. What should I do?',
        answer: (
          <>
            <p>
              You can contact Zoplit through{' '}
              <WhatsAppLink>WhatsApp</WhatsAppLink> or the{' '}
              <Internal href="/contact">Contact</Internal> page.
            </p>
            <p>
              For project-related questions, include as much relevant information as possible so we
              can help you faster.
            </p>
          </>
        ),
      },
    ],
  },
];
