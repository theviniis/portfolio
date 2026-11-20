import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

function TypingDot({ index }: { index: number }) {
  const reduceMotion = useReducedMotion()
  return (
    <m.i
      className="size-4 rounded-full bg-[#9a9aa2]"
      animate={
        reduceMotion
          ? { y: 0, backgroundColor: 'var(--chat-dot)' }
          : {
              y: [0, -7, 0, 0],
              backgroundColor: [
                'var(--chat-dot)',
                'var(--chat-dot-active)',
                'var(--chat-dot)',
                'var(--chat-dot)'
              ]
            }
      }
      transition={{
        duration: 1.35,
        times: [0, 0.2, 0.4, 1],
        repeat: Infinity,
        delay: index * 0.16,
        ease: 'easeInOut'
      }}
    />
  )
}
export function TypingIndicator() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[110px] w-[150px] max-[767px]:h-[72px] max-[767px]:origin-bottom max-[767px]:justify-self-center max-[767px]:scale-65"
    >
      <div className="relative mt-2.5 flex h-[72px] w-36 items-center justify-center gap-3 rounded-[42px] bg-secondary [--chat-dot:#b5b5bc] [--chat-dot-active:#64646c] dark:[--chat-dot:#71717a] dark:[--chat-dot-active:#e4e4e7] after:absolute after:-bottom-1.5 after:left-4 after:size-[22px] after:rotate-15 after:rounded-[5px_0_20px_12px] after:bg-secondary after:content-['']">
        {[0, 1, 2].map((dot) => (
          <TypingDot key={dot} index={dot} />
        ))}
        <span className="absolute -bottom-6 left-0 size-2.5 rounded-full bg-secondary" />
      </div>
    </div>
  )
}
