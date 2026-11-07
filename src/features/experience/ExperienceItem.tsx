import { SkillList } from '@/shared/components/SkillList'
import type { ExperienceType } from './types'

export function ExperienceItem({
  company,
  responsibilities,
  period,
  role,
  skills
}: ExperienceType) {
  return (
    <div className="pl-6">
      <div className="relative space-y-4">
        <span
          aria-hidden="true"
          className="absolute top-2.5 -left-6 size-2.5 rounded-full border-2 border-primary bg-background"
        />
        <div>
          <h3 className="text-h4">{company}</h3>
          <h4 className="text-h5">{role}</h4>
          <p>
            {period.start} — {period.end}
          </p>
          <SkillList skills={skills} className="mt-2" />
        </div>

        <ul className="space-y-1">
          {responsibilities.map((resp) => (
            <li
              key={resp}
              className="text-muted-foreground text-justify hyphens-auto"
            >
              • {resp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
