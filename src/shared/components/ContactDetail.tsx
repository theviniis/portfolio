import type { ComponentProps } from 'react'
import type { LucideIcon } from 'lucide-react'

export function ContactDetail({
  icon: Icon,
  label,
  description,
  ...props
}: ComponentProps<'a'> & {
  icon: LucideIcon
  label: string
  description: string
}) {
  return (
    <li className="flex items-start gap-3">
      <Icon size={19} aria-hidden="true" className="mt-0.75 shrink-0" />
      <a
        {...props}
        className="grid gap-0.75 text-sm leading-[1.4] wrap-anywhere hover:opacity-75"
      >
        <strong className="font-semibold">{label}</strong>
        <span className="text-muted-foreground">{description}</span>
      </a>
    </li>
  )
}
