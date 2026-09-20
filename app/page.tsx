import { Hero } from '@/components/site/sections/Hero';
import { HowItWorks } from '@/components/site/sections/HowItWorks';
import { ServicesSection } from '@/components/site/sections/ServicesSection';
import { WhyZoplit } from '@/components/site/sections/WhyZoplit';
import { FinalCTA } from '@/components/site/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <ServicesSection />
      <WhyZoplit />
      <FinalCTA />
    </>
  );
}
