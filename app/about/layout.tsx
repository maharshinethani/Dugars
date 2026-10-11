import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — DUGARS Jewellery',
  description: 'Discover the DUGARS story — our heritage, philosophy, and commitment to crafting timeless jewellery with the finest materials and master craftsmanship.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us — DUGARS Jewellery',
    description: 'The DUGARS story — heritage, philosophy, and the art of timeless jewellery.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
