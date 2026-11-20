import { useEffect, useState } from 'react'

export function useFirstScroll() {
  const [hasScrolled, setHasScrolled] = useState(false)
  useEffect(() => {
    const reveal = () => {
      if (window.scrollY > 4) {
        setHasScrolled(true)
        window.removeEventListener('scroll', reveal)
      }
    }
    window.addEventListener('scroll', reveal, { passive: true })
    reveal()
    return () => window.removeEventListener('scroll', reveal)
  }, [])
  return hasScrolled
}
