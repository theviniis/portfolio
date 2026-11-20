import { useLayoutEffect, useRef, type ReactNode } from 'react'
import {
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform
} from 'motion/react'
import * as m from 'motion/react-m'

const stackTop = (index: number) => 84 + index * 8

export function ProjectStackCard({
  children,
  index,
  total
}: {
  children: ReactNode
  index: number
  total: number
}) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const top = stackTop(index)
  const { scrollY } = useScroll()
  const stops = useMotionValue<number[]>([])
  const exitOffset = useMotionValue(0)
  useLayoutEffect(() => {
    const list = ref.current?.parentElement
    if (!list) return
    const measure = () => {
      const gap = Number.parseFloat(getComputedStyle(list).rowGap) || 0
      const lastCard = list.lastElementChild as HTMLElement | null
      let nextExitOffset = 0
      if (lastCard && ref.current) {
        // Keep each layer's top edge visible when the whole stack leaves its container.
        const layerOffset = stackTop(total - 1) - top
        nextExitOffset = reduceMotion
          ? 0
          : lastCard.offsetHeight - ref.current.offsetHeight + layerOffset
      }
      let position = list.getBoundingClientRect().top + window.scrollY
      const positions = [...list.children].map((card, cardIndex) => {
        const start = position - stackTop(cardIndex)
        position +=
          (card as HTMLElement).offsetHeight +
          (Number.parseFloat(getComputedStyle(card).marginBottom) || 0) +
          gap
        return start
      })
      stops.set(positions.slice(index))
      exitOffset.set(nextExitOffset)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    for (const card of list.children) observer.observe(card)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [index, total, top, stops, exitOffset, reduceMotion])
  const depth = useTransform(() => {
    const positions = stops.get()
    const scroll = scrollY.get()
    let layers = 0
    for (let step = 1; step < positions.length; step++) {
      const distance = positions[step] - positions[step - 1]
      if (distance > 0)
        layers += Math.max(
          0,
          Math.min(1, (scroll - positions[step - 1]) / distance)
        )
    }
    return layers
  })
  const scale = useTransform(depth, (layers) => 1 - Math.min(layers, 3) * 0.055)
  const opacity = useTransform(depth, [3, 4], [1, 0])
  return (
    <m.article
      ref={ref}
      data-testid="project-card"
      className="sticky grid grid-cols-2 items-start gap-10 rounded-[26px] bg-secondary p-8 shadow-[0_-4px_16px_-12px_#0002] max-[767px]:grid-cols-1 max-[767px]:gap-6 max-[767px]:p-6 motion-reduce:relative motion-reduce:top-auto! motion-reduce:transform-none! motion-reduce:shadow-none"
      style={{
        top,
        marginBottom: exitOffset,
        zIndex: index + 1,
        scale: reduceMotion || index === total - 1 ? 1 : scale,
        opacity: reduceMotion ? 1 : opacity,
        transformOrigin: 'center top'
      }}
    >
      {children}
    </m.article>
  )
}
