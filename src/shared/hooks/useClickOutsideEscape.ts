import { useEffect } from 'react'

interface UseClickOutsideEscapeOptions {
  active: boolean
  ignoreInside?: string
  onDismiss: () => void
}

export function useClickOutsideEscape({
  active,
  ignoreInside,
  onDismiss
}: UseClickOutsideEscapeOptions) {
  useEffect(() => {
    if (!active) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    }

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (ignoreInside && target.closest(ignoreInside)) return
      onDismiss()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown, true)
    }
  }, [active, ignoreInside, onDismiss])
}
