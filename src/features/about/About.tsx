import { Mail, Briefcase, Download } from 'lucide-react'
import { profile } from '@/data/profile'
import { RevealSection } from '@/shared/components/RevealSection'
import { FullBleedBackground } from '@/shared/components/FullBleedBackground'
import { SectionHeading } from '@/shared/components/SectionHeading'
import { AnimatedAction } from '@/shared/components/AnimatedAction'
import { ContactDetail } from '@/shared/components/ContactDetail'
import { getCvForLang } from '@/shared/lib/cv'
import { usePortfolioTranslation } from '@/shared/hooks/usePortfolioTranslation'
import { Polaroid } from './Polaroid'

export function About() {
  const { t, i18n } = usePortfolioTranslation()
  const cv = getCvForLang(i18n.language)
  return (
    <RevealSection
      id="sobre"
      className="relative isolate grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-center gap-18 max-[767px]:grid-cols-1 max-[767px]:gap-11"
    >
      <FullBleedBackground />
      <div>
        <SectionHeading className="mb-4.5">
          {t('about.heading')}
        </SectionHeading>
        <p className="text-base leading-[1.65] text-pretty text-muted-foreground">
          {t('about.intro')}
        </p>
        <p className="mt-4 text-base leading-[1.65] text-pretty text-muted-foreground">
          {t('about.description')}
        </p>
        <ul className="my-7.5 grid list-none gap-5.5 p-0">
          <ContactDetail
            icon={Mail}
            label={`${t('contact.emailLabel')}:`}
            description={profile.email}
            href={`mailto:${profile.email}`}
          />
          <ContactDetail
            icon={Briefcase}
            label="LinkedIn:"
            description="in/viniis"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          />
        </ul>
        <AnimatedAction href={cv.url} download={cv.filename}>
          {t('about.cvDownload')} <Download aria-hidden="true" className="size-4" />
        </AnimatedAction>
      </div>
      <Polaroid
        src={profile.image}
        alt={profile.name}
        caption={t('about.caption')}
      />
    </RevealSection>
  )
}
