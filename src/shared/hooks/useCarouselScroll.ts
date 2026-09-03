import { useCallback, useEffect, useState } from 'react'
import type { RefObject } from 'react'

export function useCarouselScroll(ref: RefObject<HTMLDivElement>) {
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateScrollState = useCallback(() => {
    const el = ref.current
    if (!el) return
    setCanScrollPrev(el.scrollLeft > 0)
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }, [ref])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState, ref])

  const scrollPrev = useCallback(() => {
    ref.current?.scrollBy({
      left: -ref.current.clientWidth,
      behavior: 'smooth'
    })
  }, [ref])

  const scrollNext = useCallback(() => {
    ref.current?.scrollBy({
      left: ref.current.clientWidth,
      behavior: 'smooth'
    })
  }, [ref])

  return { canScrollPrev, canScrollNext, scrollPrev, scrollNext }
}
