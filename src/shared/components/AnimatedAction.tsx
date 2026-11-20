import type { HTMLMotionProps } from 'motion/react'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'

type ActionVariant = 'solid' | 'outline' | 'contact' | 'plain'
type ActionProps = { variant?: ActionVariant; className?: string } & (
  | (HTMLMotionProps<'a'> & { href: string })
  | (HTMLMotionProps<'button'> & { href?: never })
)
const variants: Record<ActionVariant, string> = {
  solid:
    'rounded-[30px] bg-foreground px-4.5 py-2.5 text-background hover:bg-foreground hover:text-background dark:hover:bg-foreground',
  outline:
    'rounded-[30px] border border-border px-4.5 py-2.5 text-foreground',
  contact:
    'flex min-h-11 rounded-[30px] border border-foreground px-5 py-2.5 text-foreground',
  plain: 'rounded-none p-0 text-foreground'
}
export function AnimatedAction({
  variant = 'solid',
  className,
  ...props
}: ActionProps) {
  const reduceMotion = useReducedMotion()
  const gesture = {
    whileHover: reduceMotion ? undefined : { scale: 1.035, y: -1 },
    whileTap: reduceMotion ? undefined : { scale: 0.97 },
    transition: { duration: 0.18 }
  }
  const classes = cn(
    'h-auto gap-2 border-0 bg-transparent text-sm font-normal leading-normal transition-none hover:bg-transparent dark:hover:bg-transparent hover:text-inherit hover:opacity-75 aria-expanded:bg-transparent aria-expanded:text-inherit focus-visible:ring-0 active:not-aria-[haspopup]:translate-y-0',
    variants[variant],
    className
  )
  if ('href' in props && props.href !== undefined) {
    return (
      <Button asChild variant="ghost" className={classes}>
        <m.a {...(props as HTMLMotionProps<'a'>)} {...gesture} />
      </Button>
    )
  }
  return (
    <Button asChild variant="ghost" className={classes}>
      <m.button
        type="button"
        {...(props as HTMLMotionProps<'button'>)}
        {...gesture}
      />
    </Button>
  )
}
