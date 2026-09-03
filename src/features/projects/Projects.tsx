import { useTranslation } from 'react-i18next'
import { Section } from '@/shared/ui/Section'
import { SectionHeader } from '@/shared/components/SectionHeader'
import { HorizontalCarousel } from '@/shared/components/HorizontalCarousel'
import { ProjectCard } from './ProjectCard'
import type { Project } from './types'

const Projects = () => {
  const { t } = useTranslation()
  const projects = t('projects.list', { returnObjects: true }) as Project[]

  if (!projects.length) return null

  return (
    <Section id={t('projects.id')}>
      <SectionHeader
        title={t('projects.title')}
        description={t('projects.description')}
      />

      <HorizontalCarousel
        itemKeys={projects.map((p) => p.name)}
        renderItem={(key) => {
          const project = projects.find((p) => p.name === key)
          if (!project) return null
          return <ProjectCard {...project} />
        }}
        prevLabel="Previous project"
        nextLabel="Next project"
      />
    </Section>
  )
}

export { Projects }
