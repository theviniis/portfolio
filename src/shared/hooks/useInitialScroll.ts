import { useLayoutEffect } from 'react'

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
}
