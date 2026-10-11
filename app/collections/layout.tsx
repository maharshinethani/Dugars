import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collections — DUGARS Jewellery',
  description: 'Explore our curated jewellery collections — signature, bridal, bespoke, and limited edition pieces designed for every occasion and taste.',
  alternates: { canonical: '/collections' },
  openGraph: {
    title: 'Collections — DUGARS Jewellery',
    description: 'Curated jewellery collections designed for every occasion and taste.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
