'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/lib/locale-context';
import { useSettings } from '@/lib/settings-context';
import { siteConfig } from '@/lib/site-config';
import { supabase } from '@/lib/supabase';
import { Instagram, Facebook, Mail, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export function Footer() {
  const { locale, t } = useLocale();
  const { settings } = useSettings();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  if (pathname.startsWith('/admin')) return null;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: email.trim(), locale });
      if (error) {
        if (error.code === '23505') {
          toast.error(t('newsletter.duplicate'));
        } else {
          toast.error(t('common.error'));
        }
      } else {
        toast.success(t('newsletter.success'));
        setEmail('');
      }
    } catch {
      toast.error(t('common.error'));
    } finally {
      setSubmitting(false);
    }
  };

  const shopLinks = [
    { label: t('nav.jewellery'), href: '/jewellery' },
    { label: t('nav.collections'), href: '/collections' },
    { label: t('footer.newArrivals'), href: '/jewellery?filter=new' },
    { label: t('footer.bestsellers'), href: '/jewellery?filter=bestseller' },
  ];

  const aboutLinks = [
    { label: t('footer.ourStory'), href: '/about' },
    { label: t('footer.bespoke'), href: '/about#bespoke' },
    { label: t('nav.appointment'), href: '/appointment' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const careLinks = [
    { label: t('footer.faq'), href: '/faq' },
    { label: t('footer.shipping'), href: '/shipping' },
    { label: t('footer.returns'), href: '/returns' },
    { label: t('footer.careGuide'), href: '/care-guide' },
  ];

  return (
    <footer className="water-texture-section bg-[#0A111E] text-slate-200">
      {/* Newsletter */}
      <div className="border-b border-blue-900/40">
        <div className="container-luxury py-16 text-center">
          <h2 className="heading-serif text-3xl text-slate-100 sm:text-4xl">
            {t('newsletter.title')}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
            {t('newsletter.subtitle')}
          </p>
          <form onSubmit={handleSubscribe} className="mx-auto mt-8 flex max-w-md flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.placeholder')}
              required
              className="h-12 flex-1 border border-slate-700/50 bg-[#060B14]/60 px-4 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-gold"
            />
            <button
              type="submit"
              disabled={submitting}
              className="flex h-12 items-center justify-center gap-2 bg-gold px-6 text-xs font-medium uppercase tracking-[0.15em] text-[#0A111E] transition-colors hover:bg-gold-light disabled:opacity-50"
            >
              {submitting ? '...' : t('newsletter.subscribe')}
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-luxury py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="DUGARS Logo"
                width={36} 
                height={36}
                className="h-9 w-auto object-contain"
              />
              
<h3
  className="text-2xl font-semibold tracking-[0.12em] text-slate-100"
  style={{ fontFamily: "'Bodoni Moda', serif" }}
>
  DUGARS
</h3>

            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              {locale === 'ar'
                ? 'فن المجوهرات الخالدة. مصنوعة بأيدٍ ماهرة للحظات التي تستحق التذكر.'
                : 'The art of timeless jewellery. Crafted by master hands for moments worth remembering.'}
            </p>
            <div className="mt-6 flex gap-4">
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 transition-colors hover:text-gold">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {settings?.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-400 transition-colors hover:text-gold">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {settings?.email && (
                <a href={`mailto:${settings.email}`} aria-label="Email" className="text-slate-400 transition-colors hover:text-gold">
                  <Mail className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="label-luxury text-gold">{t('footer.shop')}</h4>
            <ul className="mt-4 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-slate-400 transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="label-luxury text-gold">{t('footer.about')}</h4>
            <ul className="mt-4 space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-slate-400 transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="label-luxury text-gold">{t('footer.customerCare')}</h4>
            <ul className="mt-4 space-y-3">
              {careLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-slate-400 transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="label-luxury text-gold">{t('footer.connect')}</h4>
            <ul className="mt-4 space-y-3">
              {settings?.phone && (
                <li className="text-xs text-slate-400">{settings.phone}</li>
              )}
              {settings?.email && (
                <li className="text-xs text-slate-400">{settings.email}</li>
              )}
              {settings?.address_en && (
                <li className="text-xs text-slate-400">
                  {locale === 'ar' ? settings.address_ar || settings.address_en : settings.address_en}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-blue-900/40">
        <div className="container-luxury py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
            <p className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} DUGARS Jewellery. {t('footer.rights')}
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-[11px] text-slate-500 transition-colors hover:text-gold">
                {t('footer.privacy')}
              </Link>
              <Link href="/terms" className="text-[11px] text-slate-500 transition-colors hover:text-gold">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}