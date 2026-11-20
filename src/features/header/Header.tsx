import { useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { useActiveSection } from '@/shared/hooks/useActiveSection'
import { usePortfolioTranslation } from '@/shared/hooks/usePortfolioTranslation'
import { NavigationLink, type NavigationItem } from './NavigationLink'

export function Header() {
  const { t, i18n } = usePortfolioTranslation()
  const { active, select } = useActiveSection()
  const reduceMotion = useReducedMotion()
  const [hovered, setHovered] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const [highlight, setHighlight] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })
  const items: NavigationItem[] = [
    { id: 'inicio', label: t('nav.home') },
    { id: 'projetos', label: t('nav.projects') },
    { id: 'experiencia', label: t('nav.experience') },
    { id: 'sobre', label: t('nav.about') },
    { id: 'contato', label: t('nav.contact') }
  ]
  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const measure = () => {
      const link = nav.querySelector<HTMLElement>(
        `[href="#${hovered ?? active}"]`
      )
      if (link)
        setHighlight({
          x: link.offsetLeft,
          y: link.offsetTop,
          width: link.offsetWidth,
          height: link.offsetHeight
        })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(nav)
    return () => observer.disconnect()
  }, [active, hovered, i18n.language])
  return (
    <m.header
      data-testid="navigation"
      className="fixed top-3.5 left-1/2 z-50 flex -translate-x-1/2 items-center rounded-[40px] border border-border bg-[color-mix(in_srgb,var(--background)_72%,transparent)] p-1.25 whitespace-nowrap shadow-[0_1px_4px_#00000008] backdrop-blur-[20px] backdrop-saturate-160 max-[767px]:top-auto max-[767px]:bottom-[max(14px,env(safe-area-inset-bottom))] max-[767px]:p-1 md:[&+*]:mt-16"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.12 }}
    >
      <nav
        id="main-navigation"
        ref={navRef}
        onMouseLeave={() => setHovered(null)}
        aria-label={t('nav.label')}
        className="relative isolate flex"
      >
        <m.span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 rounded-[30px] bg-[#f4f4f5]"
          initial={false}
          animate={highlight}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 380, damping: 35, mass: 0.7 }
          }
        />
        {items.map((item) => (
          <NavigationLink
            key={item.id}
            item={item}
            active={active === item.id}
            highlighted={(hovered ?? active) === item.id}
            onHighlight={setHovered}
            onSelect={() => {
              setHovered(null)
              select(item.id)
            }}
          />
        ))}
      </nav>
    </m.header>
  )
}
