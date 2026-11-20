import { cn } from '@/shared/lib/utils'

export function FullBleedBackground({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 bg-secondary shadow-[0_0_0_100vmax_var(--secondary)] [clip-path:inset(0_-100vmax)]',
        className
      )}
    />
  )
}
