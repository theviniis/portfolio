import type { ComponentProps } from 'react'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { cn } from '@/shared/lib/utils'

const Section = ({
  children,
  className,
  reveal = true,
  ...props
}: ComponentProps<'section'> & { reveal?: boolean }) => {
  const reduceMotion = useReducedMotion()
  const shouldReveal = reveal && !reduceMotion

  return (
    <section className={cn('wrapper py-8 lg:py-16', className)} {...props}>
      <m.div
        className="grid md:grid-cols-[0.80fr_1fr] gap-8 lg:gap-16 focus-within:opacity-100! focus-within:transform-none! motion-reduce:opacity-100! motion-reduce:transform-none!"
        initial={shouldReveal ? { opacity: 0, y: 22 } : false}
        whileInView={shouldReveal ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: '0px 0px -56px 0px' }}
        transition={{ duration: 0.56, ease: 'easeOut' }}
      >
        {children}
      </m.div>
    </section>
  )
}

export { Section }
