import { useTranslation } from 'react-i18next'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { cn } from '@/shared/lib/utils'
import { Button, type ButtonProps } from '@/shared/ui/button'
import { ButtonShine } from '@/shared/ui/button-shine'
import { Spinner } from '@/shared/ui/spinner'

export function LoadingButton({
  isLoading,
  children,
  className,
  disabled,
  ...props
}: Omit<ButtonProps, 'asChild'> & { isLoading?: boolean }) {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const isDisabled = disabled || isLoading
  const animate = !reduceMotion && !isDisabled

  return (
    <Button
      {...props}
      asChild
      className={cn(
        'relative isolate overflow-hidden transition-colors active:not-aria-[haspopup]:translate-y-0 motion-reduce:transform-none!',
        className
      )}
    >
      <m.button
        disabled={isDisabled}
        aria-busy={isLoading}
        initial={false}
        animate="rest"
        whileHover={animate ? 'hover' : undefined}
        whileTap={animate ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.16, ease: 'easeOut' }}
      >
        {isLoading ? (
          <>
            <Spinner data-icon="inline-start" />
            {t('common.sending')}
          </>
        ) : (
          <>
            {!isDisabled && <ButtonShine />}
            {children}
          </>
        )}
      </m.button>
    </Button>
  )
}
