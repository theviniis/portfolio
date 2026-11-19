import { useRef, type ReactNode } from 'react'
import { useReducedMotion, useScroll, useTransform } from 'motion/react'
import * as m from 'motion/react-m'

export function ProjectStackCard({
  children,
  index,
  last
}: {
  children: ReactNode
  index: number
  last: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const top = 84 + Math.min(index, 5) * 10
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${top}px`, `end ${top}px`]
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])
  return (
    <m.article
      ref={ref}
      className="project project-stack-card"
      style={{
        top,
        zIndex: index + 1,
        scale: reduceMotion || last ? 1 : scale,
        transformOrigin: 'center top'
      }}
    >
      {children}
    </m.article>
  )
}
