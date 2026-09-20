import type { Metadata } from 'next';
import { FAQContent } from './FAQContent';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers for clients and creators considering Zoplit — how projects work, payments, policies and how to get started.',
};

export default function FAQPage() {
  return (
    <section className="pt-32 pb-20">
      <FAQContent />
    </section>
  );
}
