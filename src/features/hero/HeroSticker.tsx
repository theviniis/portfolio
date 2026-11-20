import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { cn } from '@/shared/lib/utils'
import type { HeroStickerConfig } from './stickers'

export function HeroSticker({
  config,
  index,
  orbiting,
  orbitRadius
}: {
  config: HeroStickerConfig
  index: number
  orbitRadius: number
  orbiting: boolean
}) {
  const reduceMotion = useReducedMotion()
  const { image, position, rotation, entryOrder, compact } = config
  const offset = position.map((value) => value * orbitRadius * 0.25)
  const hoverOffset = offset
  return (
    <m.span
      className="pointer-events-none absolute inset-0"
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: -offset[0] * 1.4,
              y: -offset[1],
              rotate: index % 2 ? -10 : 10,
              filter: 'blur(5px)'
            }
      }
      animate={{ opacity: 1, x: 0, y: 0, rotate: 0, filter: 'blur(0px)' }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : 0.68 + entryOrder * 0.14,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <m.span
        aria-hidden="true"
        initial={false}
        className="pointer-events-none absolute -translate-1/2 bg-transparent p-0"
        animate={{
          x: orbiting ? hoverOffset[0] : 0,
          y: orbiting ? hoverOffset[1] : 0,
          scale: orbiting ? 1.1 : 1,
          rotate: rotation
        }}
        transition={{ type: 'spring', stiffness: 70, damping: 20, mass: 1 }}
        style={{
          left: `calc(50% + var(--orbit-radius) * ${position[0] * 0.9})`,
          top: `calc(50% + var(--orbit-radius) * ${position[1] * 0.9})`
        }}
      >
        <m.span
          className="relative block drop-shadow-[3px_5px_0_#00000015]"
          animate={
            orbiting ? { y: 0, rotate: [null, 5, -4, 0] } : { y: 0, rotate: 0 }
          }
          transition={
            orbiting
              ? {
                  duration: 6 + index * 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              : { duration: 0.6, ease: 'easeOut' }
          }
        >
          <img
            src={image}
            alt=""
            draggable={false}
            decoding="async"
            className={cn(
              'object-contain max-[767px]:size-12',
              compact ? 'size-[61px]' : 'size-[73px]'
            )}
          />
        </m.span>
      </m.span>
    </m.span>
  )
}
