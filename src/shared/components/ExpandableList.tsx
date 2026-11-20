import { useState, type ReactNode } from 'react'
import { AnimatedHeight } from './AnimatedHeight'
import { AnimatedAction } from './AnimatedAction'

type ExpandableListProps<T> = {
  id: string
  items: T[]
  initialCount: number
  moreLabel: string
  lessLabel: string
  className?: string
  overflow?: 'hidden' | 'clip'
  renderItem: (item: T, index: number, visibleItems: T[]) => ReactNode
}

export function ExpandableList<T>({
  id,
  items,
  initialCount,
  moreLabel,
  lessLabel,
  className,
  overflow = 'hidden',
  renderItem
}: ExpandableListProps<T>) {
  const [expanded, setExpanded] = useState(false)
  const visibleItems = expanded ? items : items.slice(0, initialCount)
  return (
    <>
      <AnimatedHeight overflow={overflow}>
        <div id={id} className={className}>
          {visibleItems.map((item, index) =>
            renderItem(item, index, visibleItems)
          )}
        </div>
      </AnimatedHeight>
      {items.length > initialCount && (
        <div className="flex justify-end">
          <AnimatedAction
            variant="outline"
            className="mt-7"
            aria-expanded={expanded}
            aria-controls={id}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? lessLabel : moreLabel}
          </AnimatedAction>
        </div>
      )}
    </>
  )
}
