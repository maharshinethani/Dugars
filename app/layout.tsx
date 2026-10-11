
import './globals.css';
import type { Metadata } from 'next';
import {
  Inter,
  Cormorant_Garamond,
  Noto_Kufi_Arabic,
  Bodoni_Moda,
} from 'next/font/google';

import { Providers } from '@/components/providers';
import { Navbar } from '@/components/navbar';
import { AnnouncementMarquee } from '@/components/announcement-marquee';
import { Footer } from '@/components/footer';
import { Preloader } from '@/components/preloader';
import { WhatsAppButton } from '@/components/whatsapp-button';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bodoni',
  display: 'swap',
});

const notoKufi = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dugars - The Art of Timeless Jewellery',
  description:
    'Premium international luxury jewellery. Discover rings, necklaces, earrings, and bespoke creations crafted for moments that deserve to become memories.',
  keywords: [
    'luxury jewellery',
    'diamond rings',
    'gold necklaces',
    'bespoke jewellery',
    'bridal jewellery',
    'DUGARS',
  ],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Dugars — The Art of Timeless Jewellery',
    description:
      'Premium international luxury jewellery crafted for moments that deserve to become memories.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DUGARS Jewellery',
    description: 'The Art of Timeless Jewellery',
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      ar: '/',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

const noFlashScript = `
(function() {
  try {
    var stored = localStorage.getItem('dugars-theme');
    var theme = 'ocean-midnight';

    if (stored === 'ocean-pearl') {
      theme = 'ocean-pearl';
    } else if (
      !stored &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      theme = 'ocean-pearl';
    }

    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme =
      theme === 'ocean-midnight' ? 'dark' : 'light';
  } catch (e) {
    document.documentElement.setAttribute(
      'data-theme',
      'ocean-midnight'
    );
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-theme="ocean-midnight"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>

      <body
        className={`${inter.variable} ${cormorant.variable} ${bodoni.variable} ${notoKufi.variable} font-sans antialiased`}
      >
        <Providers>
          <Preloader />
          <AnnouncementMarquee />

          <Navbar />

          <main className="min-h-screen">{children}</main>

          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}