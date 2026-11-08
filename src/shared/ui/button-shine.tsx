import * as m from 'motion/react-m'

export function ButtonShine() {
  return (
    <m.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/2 bg-linear-[105deg,transparent,white_50%,transparent] motion-reduce:hidden"
      variants={{
        rest: { x: '-100%', opacity: 0, transition: { duration: 0 } },
        hover: {
          x: '200%',
          opacity: [0, 0.4, 0.4, 0],
          transition: { duration: 0.55, ease: 'easeOut' }
        }
      }}
    />
  )
}
