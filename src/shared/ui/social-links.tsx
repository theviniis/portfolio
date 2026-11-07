import { useState } from 'react'
import type { PointerEvent } from 'react'
import { useTranslation } from 'react-i18next'
import * as m from 'motion/react-m'
import { ButtonGroup } from './button-group'
import { SocialLinkButton } from './social-link-button'
import type { SocialLinkItem } from '@/shared/types'

const SocialLinks = () => {
  const { t } = useTranslation()
  const links = t('links', { returnObjects: true }) as SocialLinkItem[]
  const [highlight, setHighlight] = useState({
    x: 0,
    width: 0,
    visible: false,
    slide: false
  })

  const highlightLink = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === 'touch') return

    const { offsetLeft: x, offsetWidth: width } = event.currentTarget
    setHighlight((previous) => ({
      x,
      width,
      visible: true,
      slide: previous.visible
    }))
  }

  return (
    <div
      className="relative isolate w-fit rounded-4xl bg-secondary [--social-highlight:color-mix(in_oklch,var(--color-secondary),var(--color-foreground)_12%)]"
      onPointerLeave={(event) => {
        if (event.pointerType !== 'touch') {
          setHighlight((previous) => ({ ...previous, visible: false }))
        }
      }}
    >
      <m.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 rounded-4xl bg-(--social-highlight) motion-reduce:hidden"
        initial={false}
        animate={{
          x: highlight.x,
          width: highlight.width,
          opacity: highlight.visible ? 1 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 440,
          damping: 36,
          ...(!highlight.slide && {
            x: { duration: 0 },
            width: { duration: 0 }
          }),
          opacity: { duration: 0.14 }
        }}
      />
      <ButtonGroup>
        {links.map((link) => (
          <SocialLinkButton
            key={link.iconName}
            {...link}
            onPointerEnter={highlightLink}
          />
        ))}
      </ButtonGroup>
    </div>
  )
}

export { SocialLinks }
