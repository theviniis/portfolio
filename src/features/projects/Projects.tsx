import { useTranslation } from 'react-i18next'
import { RevealSection } from '@/shared/components/RevealSection'
import { SectionHeading } from '@/shared/components/SectionHeading'
import { ExpandableList } from '@/shared/components/ExpandableList'
import { usePortfolioTranslation } from '@/shared/hooks/usePortfolioTranslation'
import { ProjectCard } from './ProjectCard'
import type { Project } from './types'

export function Projects({ hasScrolled }: { hasScrolled: boolean }) {
  const { t } = usePortfolioTranslation()
  const { t: data } = useTranslation()
  const projects = data('projects.list', { returnObjects: true }) as Project[]
  return (
    <RevealSection
      id="projetos"
      enabled={hasScrolled}
      viewportMargin="0px 0px -80px 0px"
      duration={0.6}
    >
      <SectionHeading>{t('projects.heading')}</SectionHeading>
      <ExpandableList
        id="project-list"
        items={projects}
        initialCount={4}
        moreLabel={t('projects.more')}
        lessLabel={t('common.less')}
        overflow="clip"
        className="relative isolate grid gap-12 max-[767px]:gap-8 [@media(max-height:650px)]:gap-8 motion-reduce:gap-8"
        renderItem={(project, index, items) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            total={items.length}
          />
        )}
      />
    </RevealSection>
  )
}
