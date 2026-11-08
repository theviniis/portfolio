import { useRef } from 'react'
import { Pointer } from 'lucide-react'
import { useReducedMotion, useScroll, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { useTranslation } from 'react-i18next'
import { Section } from '@/shared/ui/Section'
import { SocialLinks } from '@/shared/ui/social-links'
import { CtaButton } from '@/shared/components/CtaButton'

import profile from '../../assets/profile.webp'

const Hero = () => {
  const { t } = useTranslation()
  const heroRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start 84px', 'end 84px']
  })
  const portraitY = useTransform(() => {
    // Ease the portrait back into its original framing before the Hero exits.
    const phase = Math.min(scrollYProgress.get() / 0.8, 1)
    const distance = 18 * Math.sin(Math.PI * phase) ** 2
    return `calc(${distance}px * var(--portrait-travel))`
  })

  return (
    <Section
      ref={heroRef}
      reveal={false}
      className="min-h-[calc(100dvh-var(--header-height))] items-center py-6 lg:py-8"
    >
      <div className="grid md:place-content-center gap-y-8 lg:gap-y-16">
        <div className="space-y-2 lg:space-y-4">
          <div>
            <span className="text-h3">{t('hero.greeting')}</span>
            <h1>{t('hero.name')}</h1>
          </div>
          <p>
            {t('hero.descriptionPrefix')}
            <strong>{t('hero.location')}</strong>.
            <br />
            {t('hero.descriptionSuffix')}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <CtaButton
            label={t('hero.cta')}
            icon={<Pointer className="text-primary" />}
            href={`#${t('header.items.contact.id')}`}
          />
          <SocialLinks />
        </div>
      </div>
      <div className="relative isolate mx-auto aspect-square w-full max-w-[min(20rem,43dvh)] self-center overflow-hidden rounded-4xl bg-secondary transform-gpu [-webkit-mask-image:-webkit-radial-gradient(white,black)] [--portrait-travel:0.5] md:max-w-[clamp(10rem,calc((100dvh-var(--header-height)-4rem)*0.75),32rem)] md:[--portrait-travel:1] lg:aspect-3/4">
        <m.img
          src={profile}
          alt={t('hero.alt')}
          className="drop-shadow absolute bottom-0 motion-reduce:transform-none!"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          style={{ y: reduceMotion ? 0 : portraitY }}
        />
      </div>
    </Section>
  )
}

export { Hero }
