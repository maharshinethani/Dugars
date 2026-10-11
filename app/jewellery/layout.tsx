import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jewellery Collection — DUGARS Jewellery',
  description: 'Browse our complete collection of luxury jewellery including rings, necklaces, earrings, bracelets, pendants, and bridal pieces. Filter by category, metal, and stone.',
  alternates: { canonical: '/jewellery' },
  openGraph: {
    title: 'Jewellery Collection — DUGARS Jewellery',
    description: 'Browse our complete collection of luxury jewellery. Rings, necklaces, earrings, bracelets, and more.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function JewelleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
