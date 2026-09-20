import './globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { WhatsAppButton } from '@/components/site/WhatsAppButton';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zoplit.com'),
  title: {
    default: 'Zoplit — Creative Execution, Made Simple',
    template: '%s | Zoplit',
  },
  description:
    'Photography, video editing, reels — Zoplit matches you with verified creators and manages the entire project. No searching. No negotiating.',
  openGraph: {
    title: 'Zoplit — Creative Execution, Made Simple',
    description:
      'Photography, video editing, reels — Zoplit matches you with verified creators and manages the entire project.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans bg-background text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
