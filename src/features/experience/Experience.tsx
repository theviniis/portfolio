import { useTranslation } from 'react-i18next'
import { RevealSection } from '@/shared/components/RevealSection'
import { SectionHeading } from '@/shared/components/SectionHeading'
import { ExpandableList } from '@/shared/components/ExpandableList'
import { usePortfolioTranslation } from '@/shared/hooks/usePortfolioTranslation'
import { ExperienceItem } from './ExperienceItem'
import type { ExperienceType } from './types'

export function Experience() {
  const { t } = usePortfolioTranslation()
  const { t: data } = useTranslation()
  const experiences = data('experience.experiences', {
    returnObjects: true
  }) as ExperienceType[]
  return (
    <RevealSection id="experiencia">
      <SectionHeading>{t('experience.heading')}</SectionHeading>
      <ExpandableList
        id="career-timeline"
        items={experiences}
        initialCount={3}
        moreLabel={t('experience.more')}
        lessLabel={t('common.less')}
        className="relative grid gap-6 before:absolute before:inset-y-0 before:left-61 before:border-l before:border-dashed before:border-border max-[767px]:before:left-1"
        renderItem={(item) => <ExperienceItem key={item.company} {...item} />}
      />
    </RevealSection>
  )
}
