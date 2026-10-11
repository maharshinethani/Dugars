import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: product } = await supabase
    .from('products')
    .select('name_en, name_ar, slug, short_description_en, seo_title_en, seo_description_en, thumbnail_url, price, sale_price, status')
    .eq('slug', params.slug)
    .maybeSingle();

  if (!product) {
    return {
      title: 'Product Not Found — DUGARS Jewellery',
      robots: { index: false, follow: true },
    };
  }

  const title = product.seo_title_en || `${product.name_en} — DUGARS Jewellery`;
  const description = product.seo_description_en || product.short_description_en || `Discover the ${product.name_en} at DUGARS Jewellery.`;
  const image = product.thumbnail_url || undefined;

  return {
    title,
    description,
    alternates: { canonical: `/jewellery/${product.slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      ...(image && { images: [{ url: image, alt: product.name_en }] }),
    },
    robots: {
      index: product.status === 'published',
      follow: true,
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
