import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Logo } from './Logo'
import { Button } from '@/shared/ui/button'
import { HamburgerButton } from '@/shared/ui/hamburger-button'
import { SlidingUnderlineGroup } from '@/shared/ui/sliding-underline-group'
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock'

const Header = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const headerItems = t('header.items', { returnObjects: true }) as Record<
    string,
    { id: string; name: string }
  >
  const projects = t('projects.list', { returnObjects: true }) as unknown[]
  const hasProjects = projects.length > 0

  const toggleMenu = () => setIsOpen((prev) => !prev)

  const filteredItems = Object.entries(headerItems).filter(
    ([section]) => section !== 'projects' || hasProjects
  )

  useEffect(() => {
    const updateHeight = () => setIsCompact(window.scrollY >= 48)

    updateHeight()
    window.addEventListener('scroll', updateHeight, { passive: true })
    return () => window.removeEventListener('scroll', updateHeight)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        if (window.innerWidth >= 768) {
          setIsOpen(false)
        }
      }, 500)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useBodyScrollLock(isOpen)

  return (
    <>
      <header className="pointer-events-none sticky top-0 z-50 h-(--header-height) w-full">
        <div
          className={`wrapper pointer-events-auto bg-background/80 shadow-md ring-1 ring-border backdrop-blur-xl transition-[height] duration-200 ease-out motion-reduce:transition-none ${
            isCompact ? 'h-(--header-height-compact)' : 'h-(--header-height)'
          }`}
        >
          <nav className="flex justify-between items-center">
            <Logo />

            <SlidingUnderlineGroup className="hidden md:flex items-center">
              {filteredItems.map(([section, { id, name }]) => (
                <Button
                  key={section}
                  asChild
                  variant="link"
                  className="text-md transition-all motion-reduce:transition-none"
                >
                  <a href={`#${id}`}>
                    <span className="sliding-underline">{name}</span>
                  </a>
                </Button>
              ))}
            </SlidingUnderlineGroup>

            <HamburgerButton isOpen={isOpen} onClick={toggleMenu} />
          </nav>
        </div>
      </header>

      <div
        className={`
          fixed inset-0 z-40 bg-background/95 backdrop-blur-xl
          flex items-center justify-center p-6 md:hidden
          transition-all duration-300 ease-in-out
          motion-reduce:transition-none
          ${
            isOpen
              ? 'opacity-100 visible pointer-events-auto scale-100'
              : 'opacity-0 invisible pointer-events-none scale-95'
          }
        `}
      >
        <SlidingUnderlineGroup className="flex w-full flex-col gap-6">
          {filteredItems.map(([section, { id, name }]) => (
            <Button
              key={section}
              asChild
              variant="link"
              className="text-2xl w-full"
              onClick={() => setIsOpen(false)}
              size="lg"
            >
              <a href={`#${id}`}>
                <span className="sliding-underline">{name}</span>
              </a>
            </Button>
          ))}
        </SlidingUnderlineGroup>
      </div>
    </>
  )
}

export { Header }
