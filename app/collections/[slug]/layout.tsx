import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: collection } = await supabase
    .from('collections')
    .select('name_en, name_ar, slug, description_en, hero_image_url, is_published')
    .eq('slug', params.slug)
    .maybeSingle();

  if (!collection) {
    return {
      title: 'Collection Not Found — DUGARS Jewellery',
      robots: { index: false, follow: true },
    };
  }

  const title = `${collection.name_en} Collection — DUGARS Jewellery`;
  const description = collection.description_en || `Explore the ${collection.name_en} collection at DUGARS Jewellery.`;
  const image = collection.hero_image_url || undefined;

  return {
    title,
    description,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      ...(image && { images: [{ url: image, alt: collection.name_en }] }),
    },
    robots: {
      index: collection.is_published,
      follow: true,
    },
  };
}

export default function CollectionDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
