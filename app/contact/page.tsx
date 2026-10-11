'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import { useSettings } from '@/lib/settings-context';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { supabase } from '@/lib/supabase';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SectionHeading } from '@/components/section-heading';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, MessageCircle, Clock, Instagram, Facebook } from 'lucide-react';

export default function ContactPage() {
  const { locale, t } = useLocale();
  const { settings, whatsappNumber } = useSettings();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from('enquiries').insert({
        customer_name: form.name,
        phone: form.phone,
        email: form.email,
        message: form.message,
        source: 'contact_form',
        status: 'new',
      });
      if (error) throw error;
      toast.success(t('form.success'));
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      toast.error(t('common.error'));
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, label: t('contact.address'), value: locale === 'ar' ? settings?.address_ar || settings?.address_en : settings?.address_en },
    { icon: Phone, label: t('contact.phone'), value: settings?.phone },
    { icon: Mail, label: t('contact.email'), value: settings?.email },
    { icon: Clock, label: t('contact.hours'), value: locale === 'ar' ? 'السبت – الخميس: 10:00 – 22:00 | الجمعة: 16:00 – 22:00' : 'Sat – Thu: 10:00 – 22:00 | Fri: 16:00 – 22:00' },
  ];

  const whatsappUrl = getWhatsAppUrl({ type: 'general', locale }, whatsappNumber);

  return (
    <div className="pt-18 lg:pt-22">
      {/* Hero */}
      <section className="relative h-[300px] overflow-hidden sm:h-[400px]">
        <img src="https://images.pexels.com/photos/33257668/pexels-photo-33257668.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Contact" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-soft-black/60" />
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-gold">{t('nav.contact')}</p>
            <h1 className="mt-4 heading-serif text-4xl text-on-dark sm:text-5xl">{t('contact.title')}</h1>
            <p className="mt-3 text-white text-sm text-on-dark/85">{t('contact.subtitle')}</p>
          </div>
        </div>
      </section>

      <div className="container-luxury"><Breadcrumbs items={[{ label: t('nav.home'), href: '/' }, { label: t('nav.contact') }]} /></div>

      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact info */}
          <div>
            <SectionHeading title={t('contact.title')} align="left" />
            <div className="mt-8 space-y-6">
              {contactInfo.filter((c) => c.value).map((info, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-gold/30">
                    <info.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="label-luxury text-secondary-text/70">{info.label}</p>
                    <p className="mt-1 text-sm text-heading">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp + Social */}
            <div className="mt-8 space-y-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-gold w-full sm:w-auto">
                <MessageCircle className="h-4 w-4" />
                {t('contact.whatsapp')}
              </a>
              <div className="flex gap-4">
                {settings?.instagram && <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center border border-border/15 transition-colors hover:border-gold hover:text-gold"><Instagram className="h-4 w-4" /></a>}
                {settings?.facebook && <a href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center border border-border/15 transition-colors hover:border-gold hover:text-gold"><Facebook className="h-4 w-4" /></a>}
              </div>
            </div>
          </div>

          {/* Form */}
     <div className="relative rounded-2xl border border-gold/30 bg-card/40 p-8 sm:p-10 shadow-2xl backdrop-blur-md">
  {/* Elegant Subtle Gold Accent Line on Top */}
  <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

  <div className="mb-8">
    <h2 className="heading-serif text-2xl sm:text-3xl tracking-wide text-heading">
      {t('contact.send')}
    </h2>
    <div className="mt-2 h-[2px] w-12 bg-gradient-to-r from-gold via-gold/60 to-transparent" />
  </div>

  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Full Name */}
    <div>
      <label className="label-luxury mb-2 block text-xs font-medium uppercase tracking-widest text-secondary-text/80">
        {t('form.name')} <span className="text-gold">*</span>
      </label>
      <div className="relative group">
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-lg border border-border/40 bg-background/50 px-4 py-3.5 text-sm text-heading outline-none transition-all duration-300 hover:border-gold/50 focus:border-gold focus:bg-background focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] placeholder:text-muted-foreground/40"
          placeholder="e.g. Alexander Pierce"
        />
      </div>
    </div>

    {/* Email & Phone Grid */}
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <label className="label-luxury mb-2 block text-xs font-medium uppercase tracking-widest text-secondary-text/80">
          {t('form.email')} <span className="text-gold">*</span>
        </label>
        <div className="relative group">
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-border/40 bg-background/50 px-4 py-3.5 text-sm text-heading outline-none transition-all duration-300 hover:border-gold/50 focus:border-gold focus:bg-background focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] placeholder:text-muted-foreground/40"
            placeholder="e.g. alexander@example.com"
          />
        </div>
      </div>

      <div>
        <label className="label-luxury mb-2 block text-xs font-medium uppercase tracking-widest text-secondary-text/80">
          {t('form.phone')}
        </label>
        <div className="relative group">
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-lg border border-border/40 bg-background/50 px-4 py-3.5 text-sm text-heading outline-none transition-all duration-300 hover:border-gold/50 focus:border-gold focus:bg-background focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] placeholder:text-muted-foreground/40"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>
    </div>

    {/* Message Field */}
    <div>
      <label className="label-luxury mb-2 block text-xs font-medium uppercase tracking-widest text-secondary-text/80">
        {t('form.message')} <span className="text-gold">*</span>
      </label>
      <div className="relative group">
        <textarea
          rows={5}
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full resize-none rounded-lg border border-border/40 bg-background/50 px-4 py-3.5 text-sm text-heading outline-none transition-all duration-300 hover:border-gold/50 focus:border-gold focus:bg-background focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] placeholder:text-muted-foreground/40"
          placeholder="Write your message here..."
        />
      </div>
    </div>

    {/* Submit Button with Gold Border Glow */}
    <button
      type="submit"
      disabled={submitting}
      className="btn-gold relative w-full rounded-lg py-4 text-xs font-semibold uppercase tracking-widest border border-gold/40 transition-all duration-300 hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:tracking-[0.2em] disabled:opacity-50"
    >
      {submitting ? t('form.sending') : t('contact.send')}
    </button>
  </form>
</div>
        </div>
      </div>
    </div>
  );
}
