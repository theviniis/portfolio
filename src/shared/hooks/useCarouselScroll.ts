import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { animate, useMotionValue } from 'motion/react'

function getItemOffsets(el: HTMLDivElement) {
  const limit = el.scrollWidth - el.clientWidth
  return Array.from(el.children, (child) =>
    Math.min(limit, (child as HTMLElement).offsetLeft)
  )
}

function getClosestItem(offsets: number[], left: number) {
  return offsets.reduce(
    (closest, offset, index) =>
      Math.abs(offset - left) < Math.abs(offsets[closest] - left)
        ? index
        : closest,
    0
  )
}

export function useCarouselScroll(ref: RefObject<HTMLDivElement | null>) {
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const position = useMotionValue(0)
  const target = useRef<number | null>(null)

  const updateScrollState = useCallback(() => {
    const el = ref.current
    if (!el) return

    const left = target.current ?? el.scrollLeft
    setCanScrollPrev(left > 1)
    setCanScrollNext(left < el.scrollWidth - el.clientWidth - 1)
  }, [ref])

  const animateTo = useCallback(
    (el: HTMLDivElement, destination: number) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        position.stop()
        target.current = null
        el.scrollLeft = destination
        el.style.removeProperty('scroll-snap-type')
        updateScrollState()
        return
      }

      if (target.current === null) position.jump(el.scrollLeft)
      target.current = destination
      // Let Motion control intermediate positions and restore native swipe snap at rest.
      el.style.scrollSnapType = 'none'
      updateScrollState()

      animate(position, destination, {
        type: 'spring',
        stiffness: 210,
        damping: 26,
        mass: 0.8,
        restDelta: 0.5,
        restSpeed: 5,
        onUpdate: (left) => {
          el.scrollLeft = left
        },
        onComplete: () => {
          el.scrollLeft = destination
          target.current = null
          el.style.removeProperty('scroll-snap-type')
          updateScrollState()
        }
      })
    },
    [position, updateScrollState]
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const listeners = new AbortController()
    const { signal } = listeners
    let width = el.clientWidth
    let drag: {
      id: number
      x: number
      y: number
      left: number
      active: boolean
    } | null = null
    let suppressClick = false

    const stopScroll = () => {
      if (target.current === null) return

      position.stop()
      target.current = null
      el.style.removeProperty('scroll-snap-type')
      updateScrollState()
    }

    const observer = new ResizeObserver(() => {
      if (width !== el.clientWidth) stopScroll()
      width = el.clientWidth
      updateScrollState()
    })
    const onNativeScroll = () => {
      if (target.current === null) updateScrollState()
    }

    const onPointerDown = (event: PointerEvent) => {
      suppressClick = false
      stopScroll()
      if (
        event.pointerType !== 'mouse' ||
        event.button !== 0 ||
        el.children.length < 2
      )
        return

      drag = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        left: el.scrollLeft,
        active: false
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return
      if (!(event.buttons & 1)) {
        endDrag(event)
        return
      }

      const dx = event.clientX - drag.x
      if (!drag.active) {
        if (
          Math.abs(dx) < 6 ||
          Math.abs(dx) <= Math.abs(event.clientY - drag.y)
        )
          return

        drag.active = true
        el.setPointerCapture(event.pointerId)
        el.dataset.dragging = ''
        el.style.scrollSnapType = 'none'
      }

      event.preventDefault()
      el.scrollLeft = drag.left - dx
    }

    const endDrag = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return

      const { active, left } = drag
      drag = null
      if (!active) return

      suppressClick = event.type === 'pointerup'
      delete el.dataset.dragging

      const offsets = getItemOffsets(el)
      const current = el.scrollLeft
      const start = getClosestItem(offsets, left)
      const closest = getClosestItem(offsets, current)
      const distance = current - left
      const advance = Math.abs(distance) > Math.min(72, width * 0.18)
      const next =
        closest === start && advance ? start + Math.sign(distance) : closest
      animateTo(el, offsets[next] ?? offsets[closest] ?? 0)
    }

    updateScrollState()
    observer.observe(el)
    el.addEventListener('scroll', onNativeScroll, { passive: true, signal })
    el.addEventListener('pointerdown', onPointerDown, { passive: true, signal })
    window.addEventListener('pointermove', onPointerMove, { signal })
    window.addEventListener('pointerup', endDrag, { signal })
    window.addEventListener('pointercancel', endDrag, { signal })
    el.addEventListener('lostpointercapture', endDrag, { signal })
    el.addEventListener(
      'dragstart',
      (event) => {
        if (drag) event.preventDefault()
      },
      { signal }
    )
    el.addEventListener(
      'click',
      (event) => {
        if (!suppressClick || event.detail === 0) return
        suppressClick = false
        event.preventDefault()
        event.stopPropagation()
      },
      { capture: true, signal }
    )
    el.addEventListener('wheel', stopScroll, { passive: true, signal })
    el.addEventListener('keydown', stopScroll, { signal })
    el.addEventListener('focusin', stopScroll, { signal })

    return () => {
      listeners.abort()
      observer.disconnect()
      position.stop()
      target.current = null
      delete el.dataset.dragging
      el.style.removeProperty('scroll-snap-type')
    }
  }, [animateTo, position, ref, updateScrollState])

  const scrollByItem = (direction: -1 | 1) => {
    const el = ref.current
    if (!el || el.children.length < 2) return

    const offsets = getItemOffsets(el)
    const index = getClosestItem(offsets, target.current ?? el.scrollLeft)
    const destination = offsets[index + direction]
    if (destination === undefined) return

    animateTo(el, destination)
  }

  return {
    canScrollPrev,
    canScrollNext,
    scrollPrev: () => scrollByItem(-1),
    scrollNext: () => scrollByItem(1)
  }
}
