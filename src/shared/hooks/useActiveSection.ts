import { useEffect, useState } from 'react'

export function useActiveSection() {
  const [active, setActive] = useState('inicio')
  useEffect(() => {
    const update = () => {
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
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return active
}
