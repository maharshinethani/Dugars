import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book an Appointment — DUGARS Jewellery',
  description: 'Book a private appointment with DUGARS Jewellery. Choose an in-store, virtual, or WhatsApp consultation with our jewellery experts.',
  alternates: { canonical: '/appointment' },
  openGraph: {
    title: 'Book an Appointment — DUGARS Jewellery',
    description: 'Private appointments — in-store, virtual, or WhatsApp consultation.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
