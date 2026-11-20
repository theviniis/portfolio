import type { Project } from './types'
import { ProjectStackCard } from '@/shared/components/ProjectStackCard'
import { ProjectPreview } from '@/shared/components/ProjectPreview'
import { TechnologyTags } from '@/shared/components/TechnologyTags'
import { AnimatedAction } from '@/shared/components/AnimatedAction'
import { usePortfolioTranslation } from '@/shared/hooks/usePortfolioTranslation'

export function ProjectCard({
  project,
  index,
  total,
  previewsEnabled
}: {
  project: Project
  index: number
  total: number
  previewsEnabled: boolean
}) {
  const { t } = usePortfolioTranslation()
  return (
    <ProjectStackCard index={index} total={total}>
      <div>
        <TechnologyTags items={project.skills} />
        <h3 className="mb-3.5 font-sans text-2xl font-semibold normal-case leading-tight tracking-[-0.035em]">
          {project.name}
        </h3>
        <p className="text-base leading-[1.65] text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
          <AnimatedAction
            href={project.deployUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.25"
          >
            {t('projects.view')} ↗
          </AnimatedAction>
          <AnimatedAction
            variant="plain"
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </AnimatedAction>
        </div>
      </div>
      <ProjectPreview
        src={project.deployUrl}
        name={project.name}
        enabled={previewsEnabled}
      />
    </ProjectStackCard>
  )
}
