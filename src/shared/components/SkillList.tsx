import type { ReactNode } from 'react'
import { Badge } from '@/shared/ui/badge'
import { cn } from '@/shared/lib/utils'

interface SkillListProps {
  skills: string[]
  primaryCount?: number
  renderItem?: (skill: string, variant: 'default' | 'outline') => ReactNode
  className?: string
  badgeClassName?: string
  itemClassName?: string
}

export function SkillList({
  skills,
  primaryCount = 3,
  renderItem,
  className,
  badgeClassName,
  itemClassName
}: SkillListProps) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {skills.map((skill, index) => {
        const variant = index > primaryCount - 1 ? 'outline' : 'default'
        return (
          <li key={skill} className={itemClassName}>
            {renderItem ? (
              renderItem(skill, variant)
            ) : (
              <Badge variant={variant} className={badgeClassName}>
                {skill}
              </Badge>
            )}
          </li>
        )
      })}
    </ul>
  )
}
