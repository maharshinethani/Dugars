import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — DUGARS Jewellery',
  description: 'Get in touch with DUGARS Jewellery. Visit our showroom, send us a message, or connect via WhatsApp for enquiries, appointments, and customer support.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us — DUGARS Jewellery',
    description: 'Visit our showroom, send a message, or connect via WhatsApp.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
