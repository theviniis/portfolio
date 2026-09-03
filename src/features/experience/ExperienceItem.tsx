import { Separator } from '@/shared/ui/separator'
import { SkillList } from '@/shared/components/SkillList'
import type { ExperienceType } from './types'

interface ExperienceItemProps extends ExperienceType {
  isLast: boolean
}

export function ExperienceItem({
  company,
  responsibilities,
  period,
  role,
  skills,
  isLast
}: ExperienceItemProps) {
  return (
    <li className="space-y-4">
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
      {!isLast && <Separator />}
    </li>
  )
}
