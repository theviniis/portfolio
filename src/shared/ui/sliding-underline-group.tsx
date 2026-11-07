import { useState } from 'react'
import type { PointerEvent, ReactNode } from 'react'
import * as m from 'motion/react-m'
import { cn } from '@/shared/lib/utils'

interface UnderlinePosition {
  x: number
  y: number
  width: number
}

export function SlidingUnderlineGroup({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  const [position, setPosition] = useState<UnderlinePosition | null>(null)
  const [visible, setVisible] = useState(false)

  const highlightLink = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || !(event.target instanceof Element)) {
      return
    }

    const link = event.target.closest('a')
    const label = link?.querySelector<HTMLElement>('.sliding-underline')
    if (!label) {
      setVisible(false)
      return
    }

    setPosition({
      x: label.offsetLeft,
      y: label.offsetTop + label.offsetHeight + 3,
      width: label.offsetWidth
    })
    setVisible(true)
  }

  return (
    <div
      className={cn('relative', className)}
      onPointerOver={highlightLink}
      onPointerLeave={(event) => {
        if (event.pointerType !== 'touch') setVisible(false)
      }}
    >
      {children}
      {position && (
        <m.span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-px bg-primary motion-reduce:hidden"
          initial={false}
          animate={{ ...position, opacity: visible ? 1 : 0 }}
          transition={{
            type: 'spring',
            stiffness: 440,
            damping: 36,
            opacity: { duration: 0.14 }
          }}
        />
      )}
    </div>
  )
}
