import { useEffect, useId, useState, type PointerEventHandler } from 'react'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { Button } from '@/shared/ui/button'

type FlipPortraitProps = {
  src: string
  srcSet: string
  alt: string
  circleLabel: string
  flipLabel: string
  scrollLabel: string
  hasScrolled: boolean
  orbiting: boolean
  onPointerEnter: PointerEventHandler<HTMLDivElement>
}

export function FlipPortrait({
  src,
  srcSet,
  alt,
  circleLabel,
  flipLabel,
  scrollLabel,
  hasScrolled,
  orbiting,
  onPointerEnter
}: FlipPortraitProps) {
  const reduceMotion = useReducedMotion()
  const [automaticFlipped, setAutomaticFlipped] = useState(false)
  const [manualFlipped, setManualFlipped] = useState(false)
  const flipped = hasScrolled ? manualFlipped : automaticFlipped
  const circleId = useId()
  useEffect(() => {
    if (reduceMotion || hasScrolled) return
    const timer = window.setTimeout(
      () => {
        if (!document.hidden && window.scrollY <= 4)
          setAutomaticFlipped((value) => !value)
      },
      flipped ? 3000 : 6000
    )
    return () => window.clearTimeout(timer)
  }, [flipped, reduceMotion, hasScrolled])
  const faceClass =
    'absolute inset-0 overflow-hidden rounded-full backface-hidden [-webkit-backface-visibility:hidden]'
  return (
    <m.div
      data-testid="hero-portrait"
      className="relative size-75 p-8 max-[767px]:size-60 max-[767px]:p-6.75"
      onPointerEnter={onPointerEnter}
      initial={reduceMotion ? false : { scale: 0.94 }}
      animate={{ opacity: 1, scale: orbiting ? 1.025 : 1 }}
      transition={{ type: 'spring', stiffness: 150, damping: 22 }}
    >
      <div className="relative z-1 size-full perspective-[900px]">
        <Button
          asChild
          variant="ghost"
          className="relative block size-full cursor-pointer rounded-full border-0 p-0 font-normal whitespace-normal transform-3d hover:bg-transparent hover:opacity-100 dark:hover:bg-transparent active:not-aria-[haspopup]:translate-y-0"
        >
          <m.button
            type="button"
            aria-label={`${flipLabel} — ${scrollLabel}`}
            aria-pressed={flipped}
            onClick={() => {
              if (hasScrolled) setManualFlipped((value) => !value)
              else setAutomaticFlipped((value) => !value)
            }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 100, damping: 17 }
            }
          >
            <span className={faceClass} aria-hidden={flipped}>
              <img
                src={src}
                srcSet={srcSet}
                sizes="(max-width: 767px) 150px, 240px"
                alt={alt}
                fetchPriority="high"
                width={480}
                height={499}
                className="size-full rounded-full border-2 border-foreground bg-[#d8dfd2] object-cover object-top"
              />
            </span>
            <span
              className={`${faceClass} flex rotate-y-180 flex-col items-center justify-center gap-5 border-2 border-foreground bg-background p-[30px] text-foreground`}
              aria-hidden={!flipped}
            >
              <m.span
                className="grid size-8 place-items-center rounded-full bg-foreground text-xl leading-none text-background"
                animate={flipped && !reduceMotion ? { y: [0, 6, 0] } : { y: 0 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                ↓
              </m.span>
              <span className="max-w-35 text-center text-[11px] leading-[1.6] tracking-[1px]">
                {scrollLabel}
              </span>
            </span>
          </m.button>
        </Button>
      </div>
      <svg
        viewBox="0 0 300 300"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full fill-foreground text-base tracking-[3px]"
      >
        <defs>
          <path
            id={circleId}
            d="M150,150 m-136,0 a136,136 0 1,1 272,0 a136,136 0 1,1 -272,0"
          />
        </defs>
        <text>
          <textPath href={`#${circleId}`}>{circleLabel}</textPath>
        </text>
      </svg>
    </m.div>
  )
}
