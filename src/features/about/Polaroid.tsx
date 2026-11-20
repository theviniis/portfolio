import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

export function Polaroid({
  src,
  alt,
  caption
}: {
  src: string
  alt: string
  caption: string
}) {
  const reduceMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 767px)')
  return (
    <div
      className="relative isolate w-full max-w-[320px] justify-self-center max-[767px]:max-w-[260px]"
      data-testid="polaroid-slot"
    >
      <m.figure
        data-testid="polaroid"
        className="relative z-1 mt-2.5 mr-2 mb-5 ml-2 max-w-[320px] cursor-grab touch-none justify-self-center overflow-visible rounded-lg border border-border bg-background px-3 pt-3 pb-4 shadow-[0_2px_3px_#00000008] select-none max-[767px]:w-[min(100%_-_24px,240px)] max-[767px]:cursor-auto max-[767px]:touch-pan-y"
        drag={!isMobile}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={1}
        dragMomentum={false}
        dragSnapToOrigin
        dragTransition={{
          bounceStiffness: reduceMotion ? 600 : 180,
          bounceDamping: reduceMotion ? 60 : 22
        }}
        whileDrag={{
          scale: reduceMotion ? 1 : 1.035,
          rotate: reduceMotion ? -4 : 2,
          cursor: 'grabbing',
          zIndex: 5
        }}
        initial={false}
        animate={{ rotate: -4, scale: 1 }}
        whileHover={
          reduceMotion || isMobile
            ? undefined
            : {
                rotate: 0,
                scale: 1.035,
                boxShadow: '0 12px 28px rgba(0,0,0,0.10)'
              }
        }
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
      >
        <span
          aria-hidden="true"
          className="absolute -top-[14px] left-1/2 z-1 h-[26px] w-[82px] -translate-x-1/2 rotate-3 rounded-[7px] bg-[#ead2bc99]"
        />
        <img
          src={src}
          alt={alt}
          loading="lazy"
          draggable={false}
          className="aspect-[4/5] w-full rounded-[5px] bg-[#d8dfd2] object-cover object-top [-webkit-user-drag:none]"
        />
        <figcaption className="mx-2 mt-[14px] text-center text-sm leading-[1.45] text-balance">
          {caption}
        </figcaption>
      </m.figure>

    </div>
  )
}
