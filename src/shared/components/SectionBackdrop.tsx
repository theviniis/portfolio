import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useScroll, useTransform } from 'motion/react'
import * as m from 'motion/react-m'

export function SectionBackdrop({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end']
  })
  const y = useTransform(
    () => `calc(${scrollYProgress.get()} * var(--section-parallax-travel))`
  )

  return (
    <div ref={ref} className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [--section-parallax-travel:80px] md:[--section-parallax-travel:144px]"
      >
        <m.div
          className="section-parallax-pattern absolute -top-36 right-0 bottom-0 left-0 motion-reduce:transform-none!"
          style={{ y }}
        />
      </div>
      {children}
    </div>
  )
}
