import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

export function AnimatedHeight({
  children,
  overflow = 'hidden'
}: {
  children: ReactNode
  overflow?: 'hidden' | 'clip'
}) {
  const content = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | 'auto'>('auto')
  const reduceMotion = useReducedMotion()
  useLayoutEffect(() => {
    const node = content.current
    if (!node) return
    const observer = new ResizeObserver(() =>
      setHeight(node.getBoundingClientRect().height)
    )
    setHeight(node.getBoundingClientRect().height)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return (
    <m.div
      initial={false}
      animate={{ height }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1]
      }}
      style={{ overflow }}
    >
      <div ref={content}>{children}</div>
    </m.div>
  )
}
