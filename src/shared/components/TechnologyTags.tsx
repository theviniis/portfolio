import { SkillList } from './SkillList'
import { cn } from '@/shared/lib/utils'

export function TechnologyTags({
  items,
  className
}: {
  items: string[]
  className?: string
}) {
  return (
    <SkillList
      skills={items}
      primaryCount={0}
      className={cn('mb-4 gap-1.5', className)}
      itemClassName="flex"
      badgeClassName="h-auto rounded-[20px] border-border px-2.25 py-0.75 text-[10px] font-normal leading-[1.3] tracking-[0.035em] text-muted-foreground"
    />
  )
}
