import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'

export function SectionHeading({ className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      {...props}
      className={cn(
        'mb-9 font-sans text-[36px] font-semibold normal-case leading-[1.2] tracking-[-0.035em] max-[767px]:text-[29px]',
        className
      )}
    />
  )
}
