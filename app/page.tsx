'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';
import { SectionHeading } from '@/components/section-heading';
import { ProductCard } from '@/components/product-card';
import { QuickView } from '@/components/quick-view';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product, Category, Collection } from '@/lib/types';
import Link from 'next/link';
import { ArrowRight, Calendar, Sparkles, Shield, Globe, Gem, Award, Heart, Instagram, Play, Star } from 'lucide-react';
import { HeroCarousel } from '@/components/hero-carousel';

export default function HomePage() {
  const { locale, t } = useLocale();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [feat, best, newArr, cats, cols] = await Promise.all([
          supabase.from('products').select('*, product_images(*)').eq('status', 'published').eq('is_featured', true).limit(8),
          supabase.from('products').select('*, product_images(*)').eq('status', 'published').eq('is_bestseller', true).limit(4),
          supabase.from('products').select('*, product_images(*)').eq('status', 'published').eq('is_new_arrival', true).limit(3),
          supabase.from('categories').select('*').eq('is_published', true).order('display_order', { ascending: true }),
          supabase.from('collections').select('*').eq('is_published', true).order('display_order', { ascending: true }),
        ]);

        setFeaturedProducts((feat.data as Product[]) || []);
        setBestsellers((best.data as Product[]) || []);
        setNewArrivals((newArr.data as Product[]) || []);
        setCategories((cats.data as Category[]) || []);
        setCollections((cols.data as Collection[]) || []);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const trustItems = [
    { icon: Shield, label: t('trust.secureShopping') },
    { icon: Globe, label: t('trust.worldwide') },
    { icon: Gem, label: t('trust.authentic') },
    { icon: Award, label: t('trust.expertCraft') },
  ];

  // Testimonials Data with English and Arabic support
  const testimonials = [
    {
      name: locale === 'ar' ? 'أنانيا ريدي' : 'Ananya Reddy',
      title: locale === 'ar' ? 'حرفية أنيقة' : 'Elegant Craftsmanship',
      review: locale === 'ar' 
        ? '«المجوهرات جميلة للغاية، مع تفاصيل أنيقة لمسة نهائية خالدة. التجربة العامة تبدو راقية حقًا. خيار رائع للمناسبات الخاصة.»'
        : '“The jewellery is absolutely beautiful, with elegant detailing and a timeless finish. The overall experience feels truly premium. A wonderful choice for special occasions.”',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
      rating: 5,
    },
    {
      name: locale === 'ar' ? 'راهول فارما' : 'Rahul Varma',
      title: locale === 'ar' ? 'هدية لا تُنسى' : 'A Memorable Gift',
      review: locale === 'ar'
        ? '«كنت أبحث عن شيء مميز لأهديه لعائلتي، وقد لفتت التصاميم انتباهي. الطراز الراقي والاهتمام بالتفاصيل جعل المجموعة مميزة حقًا.»'
        : '“I was looking for something special to gift my family, and the designs caught my attention. The sophisticated style and attention to detail make the collection stand out.”',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
      rating: 5,
    },
    {
      name: locale === 'ar' ? 'بريا شارما' : 'Priya Sharma',
      title: locale === 'ar' ? 'جمال خالد' : 'Timeless Beauty',
      review: locale === 'ar'
        ? '«أحب المجوهرات التي تبدو عصرية وخالدة في نفس الوقت. تتمتع دوغارز بجمالية رائعة وتصميمات راقية ورشيقة تناسب الاحتفال بلحظات الحياة المميزة.»'
        : '“I love jewellery that feels both modern and timeless. DUGARS has a beautiful aesthetic, with designs that feel refined, graceful, and perfect for celebrating life\'s special moments.”',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
      rating: 5,
    },
  ];

  const socialPosts = [
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
      link: 'https://www.instagram.com/p/EXAMPLE_1/',
    },
    {
      type: 'video',
      src: 'https://images.pexels.com/photos/4889719/pexels-photo-4889719.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
      link: 'https://www.instagram.com/reel/EXAMPLE_2/',
    },
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/2849743/pexels-photo-2849743.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
      link: 'https://www.instagram.com/p/EXAMPLE_3/',
    },
    {
      type: 'video',
      src: 'https://images.pexels.com/photos/34399059/pexels-photo-34399059.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
      link: 'https://www.instagram.com/reel/EXAMPLE_4/',
    },
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/10215179/pexels-photo-10215179.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
      link: 'https://www.instagram.com/p/EXAMPLE_5/',
    },
    {
      type: 'video',
      src: 'https://images.pexels.com/photos/12427696/pexels-photo-12427696.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
      link: 'https://www.instagram.com/reel/EXAMPLE_6/',
    },
  ];

  return (
    <>
      {/* HERO CAROUSEL */}
      <HeroCarousel />

      {/* TRUST BAR */}
      <section className="border-b border-border/10 bg-card">
        <div className="container-luxury py-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-2 text-center">
                <item.icon className="h-4 w-4 text-[#D4AF69]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-secondary-text/90 sm:text-[11px] sm:tracking-[0.15em]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container-luxury">
          <SectionHeading
            title={t('section.shopByCategory')}
            subtitle={t('section.shopByCategoryDesc')}
            viewAllLink="/jewellery"
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-4">
            {categories.slice(0, 8).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link href={`/jewellery?category=${cat.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted shadow-sm transition-all duration-300 group-hover:shadow-md">
                    <img
                      src={cat.image_url || ''}
                      alt={locale === 'ar' ? cat.name_ar || cat.name_en : cat.name_en}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-soft-black/60 via-soft-black/20 to-transparent transition-opacity group-hover:opacity-90" />
                    <div className="absolute inset-x-0 bottom-0 p-3 text-center">
                      <span className="font-serif text-sm font-medium tracking-wide text-on-dark transition-transform duration-300 group-hover:scale-105 sm:text-base">
                        {locale === 'ar' ? cat.name_ar || cat.name_en : cat.name_en}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
  <section className="container-luxury py-16 lg:py-24">
  <SectionHeading
    title={t('section.featuredCollections')}
    viewAllLink="/collections"
  />
  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
    {collections.slice(0, 6).map((col, i) => {
      const isLargeCard = i < 2;
      return (
        <motion.div
          key={col.id}
          className={isLargeCard ? 'col-span-1 sm:col-span-1 lg:col-span-2' : 'col-span-1'}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <Link
            href={`/collections/${col.slug}`}
            className="group relative block overflow-hidden rounded-2xl md:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500"
          >
            {/* Mobile lo h-56 valla anni images EXACT SAME HEIGHT lo untayi */}
            <div className={`relative overflow-hidden h-56 sm:h-auto ${isLargeCard ? 'sm:aspect-[2.3/1]' : 'sm:aspect-[4/3]'}`}>
              <img
                src={col.hero_image_url || ''}
                alt={locale === 'ar' ? col.name_ar || col.name_en : col.name_en}
                loading="lazy"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 text-white">
                <h3 className="font-serif text-lg sm:text-2xl font-normal tracking-wide text-white drop-shadow-sm">
                  {locale === 'ar' ? col.name_ar || col.name_en : col.name_en}
                </h3>
                <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-light uppercase tracking-widest text-white/90 group-hover:underline">
                  {t('section.discover')} &gt;
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      );
    })}
  </div>
</section>

      {/* NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="container-luxury py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-[4/5] min-h-[400px] lg:min-h-[480px]">
              <img
                src="/NewArrivals.jfif" 
                alt={t('section.newArrivals')}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-8 flex flex-col min-w-0">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-serif font-semibold text-gray-900">
                    {t('section.latestIntroductions')}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 mt-1">
                    {t('section.latestIntroductionsSub')}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link 
                    href="/jewellery?filter=new" 
                    className="text-sm font-medium text-amber-800 hover:underline hidden sm:block mr-2"
                  >
                    {t('common.viewAll')}
                  </Link>

                  <button
                    onClick={() => {
                      const container = document.getElementById('new-arrivals-scroll');
                      if (container) {
                        const card = container.firstElementChild as HTMLElement;
                        const cardWidth = card ? card.offsetWidth + 16 : 300;
                        container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                      }
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-amber-50 hover:border-amber-700 transition-colors"
                    aria-label="Previous"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => {
                      const container = document.getElementById('new-arrivals-scroll');
                      if (container) {
                        const card = container.firstElementChild as HTMLElement;
                        const cardWidth = card ? card.offsetWidth + 16 : 300;
                        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
                      }
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-amber-50 hover:border-amber-700 transition-colors"
                    aria-label="Next"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div 
                id="new-arrivals-scroll"
                className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar snap-x snap-mandatory scroll-smooth"
              >
                {newArrivals.map((product) => (
                  <div 
                    key={product.id} 
                    className="w-[calc(100%-12px)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-11px)] flex-shrink-0 snap-start"
                  >
                    <ProductCard 
                      product={product} 
                      onQuickView={setQuickViewProduct} 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* APPOINTMENT */}
      <section className="container-luxury py-20 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="https://images.pexels.com/photos/33257665/pexels-photo-33257665.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Private Appointment"
              className="aspect-[4/3] w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-px w-12 bg-[#D4AF69]" />
            <h2 className="mt-4 heading-serif text-2xl text-heading sm:text-3xl lg:text-4xl">
              {t('section.appointment')}
            </h2>
            <p className="mt-4 text-sm text-secondary-text/85">
              {t('appointment.subtitle')}
            </p>
            <div className="mt-8 space-y-4">
              {[
                t('appointment.inStore'),
                t('appointment.virtual'),
                t('appointment.whatsapp'),
              ].map((type, i) => (
                <div key={i} className="flex items-center gap-3 border-b border-border/10 pb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF69]/40">
                    <span className="text-xs font-medium text-[#D4AF69]">{i + 1}</span>
                  </div>
                  <span className="text-sm text-heading">{type}</span>
                </div>
              ))}
            </div>
            <Link href="/appointment" className="mt-8 btn-gold">
              <Calendar className="h-4 w-4" />
              {t('nav.appointment')}
            </Link>
          </motion.div>
        </div>
      </section>
 <section className="bg-muted/30 py-20 lg:py-28">
        <div className="container-luxury">
          <SectionHeading title={t('section.social')} />
          <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
            {socialPosts.map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative aspect-square overflow-hidden rounded-md block cursor-pointer"
              >
                <img
                  src={item.src}
                  alt="Social Post"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute top-2 right-2 text-white/90 drop-shadow-md z-10">
                  {item.type === 'video' ? (
                    <Play className="w-4 h-4 fill-white" />
                  ) : (
                    <Instagram className="w-4 h-4" />
                  )}
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {item.type === 'video' ? (
                    <Play className="w-8 h-8 text-white fill-white transition-transform duration-300 group-hover:scale-110" />
                  ) : (
                    <Instagram className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" />
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
      {/* TESTIMONIALS SECTION (LUXURY FINيله) */}
      <section className="bg-card py-20 lg:py-28 border-y border-border/10">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF69] block mb-3">
              {locale === 'ar' ? 'كلمات التقدير' : 'Words of Appreciation'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-heading font-normal tracking-wide">
              {locale === 'ar' ? 'كلمات التقدير' : 'Words of Appreciation'}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-secondary-text/80 font-sans">
              {locale === 'ar' 
                ? 'قصص تحتفل بالأناقة، الحرفية، والجمال الخالد.' 
                : 'Stories that celebrate elegance, craftsmanship, and timeless beauty.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-muted/20 border border-border/10 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 relative group"
              >
                <div>
                  {/* Subtle Gold Stars */}
                  {item.rating && (
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(item.rating)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-[#D4AF69] text-[#D4AF69]" />
                      ))}
                    </div>
                  )}

                  <h3 className="font-serif text-xl font-medium text-heading mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-secondary-text/90 font-sans italic mb-8">
                    {item.review}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-border/10">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#D4AF69]/30"
                  />
                  <div>
                    <h4 className="font-serif text-base font-medium text-heading">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-[#D4AF69] uppercase tracking-wider font-sans">
                      {locale === 'ar' ? 'عميل مقدر' : 'Valued Patron'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL / INSTAGRAM */}
     

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  );
}