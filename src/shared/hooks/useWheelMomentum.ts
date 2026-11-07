import { useEffect } from 'react'

const MIN_WHEEL_DELTA = 64
const DAMPING_MS = 84
const COAST_RATIO = 0.4
const MAX_COAST_PX = 40

function hasInnerScroller(event: WheelEvent) {
  return event.composedPath().some((node) => {
    if (
      !(node instanceof Element) ||
      node === document.body ||
      node === document.documentElement
    ) {
      return false
    }

    return (
      node.matches('input, select, textarea') ||
      (node.scrollHeight > node.clientHeight &&
        /^(auto|scroll)$/.test(getComputedStyle(node).overflowY))
    )
  })
}

export function useWheelMomentum() {
  useEffect(() => {
    const canAnimate = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    )
    const listeners = new AbortController()
    const { signal } = listeners
    let frame = 0
    let target = 0
    let position = 0
    let lastTime = 0
    let lastScroll = 0

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const step = (time: number) => {
      if (window.scrollY !== lastScroll) {
        stop()
        return
      }

      const remaining = target - position
      const finished = Math.abs(remaining) < 1
      const elapsed = Math.max(0, time - lastTime)
      position = finished
        ? target
        : position + remaining * (1 - Math.exp(-elapsed / DAMPING_MS))
      lastTime = time
      window.scrollTo({ top: position, behavior: 'instant' })
      lastScroll = window.scrollY
      frame = finished ? 0 : requestAnimationFrame(step)
    }

    const handleWheel = (event: WheelEvent) => {
      const mode = event.deltaMode
      const { deltaX, deltaY } = event
      const isWheelStep =
        mode === WheelEvent.DOM_DELTA_LINE ||
        (mode === WheelEvent.DOM_DELTA_PIXEL &&
          Number.isInteger(deltaY) &&
          Math.abs(deltaY) >= MIN_WHEEL_DELTA)

      if (
        !canAnimate.matches ||
        !event.cancelable ||
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        deltaX !== 0 ||
        deltaY === 0 ||
        !isWheelStep ||
        document.body.style.overflow === 'hidden' ||
        hasInnerScroller(event)
      ) {
        stop()
        return
      }

      const root = document.scrollingElement
      if (!root) return

      const current = window.scrollY
      const delta = mode === WheelEvent.DOM_DELTA_LINE ? deltaY * 16 : deltaY
      const direction = Math.sign(delta)
      const continues =
        frame &&
        lastScroll === current &&
        Math.sign(target - current) === direction
      const start = continues ? target : current
      const coast =
        direction * Math.min(MAX_COAST_PX, Math.abs(delta) * COAST_RATIO)
      const maxScroll = root.scrollHeight - root.clientHeight
      const next = Math.max(0, Math.min(maxScroll, start + delta + coast))

      if (next === current) {
        stop()
        return
      }

      event.preventDefault()
      if (!continues) {
        stop()
        position = current
        lastScroll = current
        lastTime = performance.now()
      }
      target = next
      if (!frame) frame = requestAnimationFrame(step)
    }

    window.addEventListener('wheel', handleWheel, { passive: false, signal })
    window.addEventListener('pointerdown', stop, { passive: true, signal })
    window.addEventListener('keydown', stop, { signal })
    canAnimate.addEventListener('change', stop, { signal })

    return () => {
      listeners.abort()
      stop()
    }
  }, [])
}
