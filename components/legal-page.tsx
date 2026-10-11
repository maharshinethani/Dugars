'use client';

import { useLocale } from '@/lib/locale-context';
import { Breadcrumbs } from '@/components/breadcrumbs';

interface LegalSection {
  heading: string;
  body: string;
}

interface LegalPageProps {
  titleKey: string;
  sectionsEn: LegalSection[];
  sectionsAr: LegalSection[];
}

export function LegalPage({ titleKey, sectionsEn, sectionsAr }: LegalPageProps) {
  const { locale, t } = useLocale();
  const sections = locale === 'ar' ? sectionsAr : sectionsEn;

  return (
    <div className="container-luxury pt-24 lg:pt-28">
      <Breadcrumbs items={[{ label: t('nav.home'), href: '/' }, { label: t(titleKey as any) }]} />
      <div className="mx-auto max-w-3xl py-12">
        <h1 className="heading-serif text-3xl text-heading sm:text-4xl">{t(titleKey as any)}</h1>
        <div className="mt-8 space-y-8">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="font-serif text-xl text-heading">{section.heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-secondary-text/70">{section.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border/10 pt-6">
          <p className="text-xs text-secondary-text/50">
            {locale === 'ar' ? 'هذه الصفحة لأغراض معلوماتية فقط ويجب مراجعة الصياغة القانونية النهائية من قبل مستشار قانوني مرخص في الولايات القضائية التي يعمل فيها العمل.' : 'This page is for informational purposes only. Final legal wording should be reviewed by a licensed legal advisor in the jurisdictions where the business operates.'}
          </p>
        </div>
      </div>
    </div>
  );
}
