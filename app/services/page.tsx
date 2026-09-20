import type { Metadata } from 'next';
import { ServicesPageContent } from '@/components/site/sections/ServicesPageContent';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Five services. One team managing everything from brief to delivery. Photography, videography, video editing, reels and product shoots.',
};

export default function ServicesPage() {
  return (
    <section className="pt-32 pb-20">
      <ServicesPageContent />
    </section>
  );
}
