import { useCallback, useEffect, useRef, useState } from 'react'

export function useActiveSection() {
  const [active, setActive] = useState('inicio')
  const destination = useRef<string | null>(null)
  const settleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )
  const select = useCallback((id: string) => {
    destination.current = id
    setActive(id)
    clearTimeout(settleTimer.current)
    // Also release the lock when clicking an anchor already at its destination.
    settleTimer.current = setTimeout(() => {
      destination.current = null
    }, 1500)
  }, [])
  useEffect(() => {
    const update = () => {
      if (destination.current) return
      const sections = [
        ...document.querySelectorAll<HTMLElement>('main section[id]')
      ]
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      setActive(
        atBottom
          ? 'contato'
          : (sections
              .filter((section) => section.getBoundingClientRect().top <= 160)
              .at(-1)?.id ?? 'inicio')
      )
    }
    const finish = () => {
      clearTimeout(settleTimer.current)
      destination.current = null
      update()
    }
    const onScroll = () => {
      if (destination.current) {
        clearTimeout(settleTimer.current)
        settleTimer.current = setTimeout(finish, 180)
        return
      }
      update()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'PageUp',
          'PageDown',
          'Home',
          'End',
          ' '
        ].includes(event.key)
      )
        finish()
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('scrollend', finish)
    window.addEventListener('wheel', finish, { passive: true })
    window.addEventListener('touchstart', finish, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', update)
    return () => {
      clearTimeout(settleTimer.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scrollend', finish)
      window.removeEventListener('wheel', finish)
      window.removeEventListener('touchstart', finish)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', update)
    }
  }, [])
  return { active, select }
}
