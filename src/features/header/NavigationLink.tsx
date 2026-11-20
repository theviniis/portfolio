import * as m from 'motion/react-m'
import { useReducedMotion } from 'motion/react'

export type NavigationItem = { id: string; label: string }
export function NavigationLink({
  item,
  active,
  highlighted,
  onHighlight,
  onSelect
}: {
  item: NavigationItem
  active: boolean
  highlighted: boolean
  onHighlight: (id: string | null) => void
  onSelect: () => void
}) {
  const reduceMotion = useReducedMotion()
  return (
    <m.a
      href={`#${item.id}`}
      className="relative z-10 flex items-center rounded-[30px] px-3 py-[9px] text-[13px] leading-normal max-[767px]:px-[7px] max-[767px]:py-[7px] max-[767px]:text-[11px]"
      aria-current={active ? 'location' : undefined}
      animate={{
        color: highlighted ? 'rgb(10, 10, 11)' : 'rgb(154, 154, 162)'
      }}
      transition={{ duration: reduceMotion ? 0 : 0.22 }}
      onMouseEnter={() => onHighlight(item.id)}
      onFocus={() => onHighlight(item.id)}
      onBlur={() => onHighlight(null)}
      onClick={onSelect}
    >
      <span className="relative">{item.label}</span>
    </m.a>
  )
}
