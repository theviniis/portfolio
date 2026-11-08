import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { Button, type ButtonProps } from '@/shared/ui/button'
import { ButtonShine } from '@/shared/ui/button-shine'
import { cn } from '@/shared/lib/utils'

interface CtaButtonProps extends Omit<ButtonProps, 'size' | 'asChild'> {
  label: string
  icon: React.ReactNode
  href?: string
  download?: string
  size?: 'default' | 'lg'
}

export function CtaButton({
  label,
  icon,
  href,
  download,
  size = 'lg',
  className,
  ...props
}: CtaButtonProps) {
  const reduceMotion = useReducedMotion()

  return (
    <Button
      asChild
      size={size}
      className={cn(
        'relative isolate overflow-hidden pe-1 transition-colors active:not-aria-[haspopup]:translate-y-0 motion-reduce:transform-none!',
        className
      )}
      {...props}
    >
      <m.a
        href={href}
        download={download}
        initial={false}
        animate="rest"
        whileHover={reduceMotion ? undefined : 'hover'}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
      >
        <ButtonShine />
        <span>{label}</span>
        <Button asChild variant="secondary" size="icon-sm">
          <span aria-hidden="true">{icon}</span>
        </Button>
      </m.a>
    </Button>
  )
}
