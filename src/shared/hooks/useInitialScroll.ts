import { useEffect, useLayoutEffect } from 'react'

export function useInitialScroll() {
  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    if (!window.location.hash)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])
  useEffect(() => {
    if (!window.location.hash) return
    let cancelled = false
    let frame = 0
    // Fragment targets only exist after React mounts. Wait for font layout too.
    void document.fonts.ready.then(() => {
      if (cancelled) return
      frame = requestAnimationFrame(() => {
        const id = decodeURIComponent(window.location.hash.slice(1))
        document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
      })
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [])
}
