import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import { useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { profile } from '@/data/profile'
import { RevealSection } from '@/shared/components/RevealSection'
import { usePortfolioTranslation } from '@/shared/hooks/usePortfolioTranslation'
import { FlipPortrait } from './FlipPortrait'
import { HeroSticker } from './HeroSticker'
import { OrbitHalo } from './OrbitHalo'
import { heroStickers } from './stickers'

export function Hero({ hasScrolled }: { hasScrolled: boolean }) {
  const { t } = usePortfolioTranslation()
  const reduceMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [universe, setUniverse] = useState(true)
  const interacted = useRef(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const [orbitRadius, setOrbitRadius] = useState(230)
  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const measure = () =>
      setOrbitRadius(Math.min(stage.clientWidth * 0.45, 230))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])
  const orbiting = (isMobile || universe) && !reduceMotion
  const stageHeight = orbitRadius * 2.3 + 48
  const stageScale = isMobile ? 0.78 : 1
  const enter = (delay: number) => ({
    initial: reduceMotion ? (false as const) : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.65,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const
    }
  })
  return (
    <RevealSection
      id="inicio"
      reveal={false}
      className="min-h-[760px] text-center [overflow-anchor:none] max-[767px]:min-h-0"
    >
      <m.h1
        {...enter(0.3)}
        className="font-sans text-5xl font-normal normal-case leading-[1.2] tracking-[-0.035em] max-[767px]:text-4xl"
      >
        {t('hero.greeting')} <strong>{profile.firstName}</strong>
      </m.h1>
      <m.p
        {...enter(0.44)}
        className="my-3 text-[17px] leading-[1.7] text-muted-foreground"
      >
        {t('hero.role')}
        <br />
        React · TypeScript · Next.js
      </m.p>
      <div
        ref={stageRef}
        className="relative isolate mx-auto grid w-full max-w-[720px] place-items-center [container-type:inline-size] [--orbit-radius:min(45cqw,230px)]"
        style={{ height: stageHeight * stageScale }}
        onPointerLeave={() => {
          if (!isMobile && interacted.current) setUniverse(false)
        }}
      >
        <div
          className="absolute inset-x-0 top-0 grid origin-top place-items-center"
          style={{
            height: stageHeight,
            transform: `translateY(${-orbitRadius * 0.025}px) scale(${stageScale})`
          }}
        >
          <OrbitHalo active={Boolean(orbiting)} />
          <FlipPortrait
            src={profile.image}
            alt={profile.name}
            circleLabel={t('hero.circleLabel')}
            flipLabel={t('hero.flipLabel')}
            scrollLabel={t('hero.scrollLabel')}
            hasScrolled={hasScrolled}
            orbiting={Boolean(orbiting)}
            onPointerEnter={(event) => {
              if (event.pointerType !== 'touch') {
                interacted.current = true
                setUniverse(true)
              }
            }}
          />
          {heroStickers.map((config, index) => (
            <HeroSticker
              key={config.id}
              config={config}
              orbitRadius={orbitRadius}
              index={index}
              orbiting={Boolean(orbiting)}
            />
          ))}
        </div>
      </div>
    </RevealSection>
  )
}
