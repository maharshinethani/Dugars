'use client';

import { useLocale } from '@/lib/locale-context';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = {
  en: [
    { q: 'How do I know my ring size?', a: 'You can visit our store for a professional sizing, or use our printable ring size guide available on the product page. We also offer complimentary resizing on most pieces.' },
    { q: 'What materials do you use?', a: 'We use only the finest natural materials including 18k gold, platinum, and ethically sourced diamonds and gemstones. Every piece comes with a certificate of authenticity.' },
    { q: 'Do you offer custom jewellery?', a: 'Yes, our bespoke service allows you to create a one-of-a-kind piece. Book a consultation with our design team to begin your bespoke journey.' },
    { q: 'How long does a bespoke piece take?', a: 'Bespoke pieces typically take 4-8 weeks from design approval to completion, depending on complexity.' },
    { q: 'Do you ship internationally?', a: 'Yes, we ship worldwide with insured delivery. Shipping times vary by destination. Please see our Shipping Policy page for details.' },
    { q: 'What is your return policy?', a: 'We offer a return window for unworn items in original packaging. Custom and bespoke pieces are non-returnable except in cases of manufacturing defects. Please see our Returns and Refunds Policy page for full details.' },
    { q: 'How should I care for my jewellery?', a: 'Store pieces separately, avoid contact with chemicals, and clean gently with a soft cloth. We recommend professional cleaning annually. See our Jewellery Care Guide for detailed instructions.' },
    { q: 'Do you offer jewellery repair?', a: 'Yes, we offer repair services for all DUGARS pieces and other fine jewellery. Contact us for a consultation.' },
    { q: 'Can I change my order after placing it?', a: 'Orders can be cancelled or modified within 24 hours of placement, provided the item has not yet been dispatched. Contact us immediately via WhatsApp or email.' },
    { q: 'Do you offer gift wrapping?', a: 'Yes, all orders are packaged in our signature luxury boxes. Additional gift wrapping options may be available — contact us for details.' },
  ],
  ar: [
    { q: 'كيف أعرف مقاس خاتمي؟', a: 'يمكنك زيارة متجرنا لتحديد المقاس بشكل احترافي، أو استخدام دليل مقاسات الخواتم القابل للطباعة المتوفر في صفحة المنتج. نقدم أيضاً تعديل المقاس مجاناً لمعظم القطع.' },
    { q: 'ما المواد التي تستخدمونها؟', a: 'نستخدم فقط أجود المواد الطبيعية بما في ذلك الذهب عيار 18، البلاتين، والألماس والأحجار الكريمة المصدر بأخلاقية. كل قطعة تأتي مع شهادة أصالة.' },
    { q: 'هل تقدمون مجوهرات مخصصة؟', a: 'نعم، خدمتنا المخصصة تتيح لك إنشاء قطعة فريدة. احجز استشارة مع فريق التصميم لدينا لبدء رحلتك المخصصة.' },
    { q: 'كم تستغرق القطعة المخصصة؟', a: 'تستغرق القطع المخصصة عادةً 4-8 أسابيع من الموافقة على التصميم إلى الاكتمال، حسب التعقيد.' },
    { q: 'هل تشحنون دولياً؟', a: 'نعم، نشحن عالمياً مع توصيل مؤمّن. تختلف أوقات الشحن حسب الوجهة. يرجى الاطلاع على صفحة سياسة الشحن للتفاصيل.' },
    { q: 'ما هي سياسة الإرجاع لديكم؟', a: 'نقدم فترة إرجاع للقطع غير المستعملة في التغليف الأصلي. القطع المخصصة غير قابلة للإرجاع إلا في حالة عيوب التصنيع. يرجى الاطلاع على صفحة سياسة الإرجاع والاسترداد للتفاصيل الكاملة.' },
    { q: 'كيف أعتني بمجوهراتي؟', a: 'خزن القطع بشكل منفصل، تجنب الاتصال بالمواد الكيميائية، ونظف بلطف بقطعة قماش ناعمة. نوصي بتنظيف احترافي سنوياً. راجع دليل رعاية المجوهرات للتعليمات التفصيلية.' },
    { q: 'هل تقدمون إصلاح المجوهرات؟', a: 'نعم، نقدم خدمات الإصلاح لجميع قطع دوغارس والمجوهرات الفاخرة الأخرى. تواصل معنا للاستشارة.' },
    { q: 'هل يمكنني تغيير طلبي بعد تقديمه؟', a: 'يمكن إلغاء أو تعديل الطلبات خلال 24 ساعة من تقديمها، بشرط عدم إرسال المنتج بعد. تواصل معنا فوراً عبر واتساب أو البريد الإلكتروني.' },
    { q: 'هل تقدمون تغليف هدايا؟', a: 'نعم، جميع الطلبات يتم تغليفها في علب فاخرة بتوقيعنا. قد تكون خيارات تغليف هدايا إضافية متاحة — تواصل معنا للتفاصيل.' },
  ],
};

export function FAQContent() {
  const { locale, t } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = faqs[locale];

  return (
    <div className="container-luxury pt-24 lg:pt-28">
      <Breadcrumbs items={[{ label: t('nav.home'), href: '/' }, { label: t('footer.faq') }]} />
      <div className="mx-auto max-w-3xl py-12">
        <h1 className="heading-serif text-3xl text-heading sm:text-4xl">{t('footer.faq')}</h1>
        <div className="mt-8 space-y-3">
          {items.map((item, i) => (
            <div key={i} className="border border-border/10">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-start"
              >
                <span className="text-sm font-medium text-heading">{item.q}</span>
                <ChevronDown className={`h-4 w-4 flex-shrink-0 text-gold transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-secondary-text/70">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
