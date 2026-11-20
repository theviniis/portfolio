import type { HTMLMotionProps } from 'motion/react'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/shared/lib/utils'

type RevealSectionProps = HTMLMotionProps<'section'> & {
  enabled?: boolean
  reveal?: boolean
  viewportMargin?: string
  duration?: number
}

export function RevealSection({
  children,
  className,
  enabled = true,
  reveal = true,
  viewportMargin = '0px 0px -64px 0px',
  duration = 0.65,
  ...props
}: RevealSectionProps) {
  const reduceMotion = useReducedMotion()
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: viewportMargin
  })
  const visible = !reveal || reduceMotion || (enabled && inView)
  return (
    <m.section
      {...props}
      ref={ref}
      className={cn('px-8 max-[767px]:px-0', className)}
      initial={reveal && !reduceMotion ? { opacity: 0, y: 24 } : false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
      transition={{
        duration: reduceMotion ? 0 : duration,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </m.section>
  )
}
