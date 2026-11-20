import * as m from 'motion/react-m'

export function OrbitHalo({ active }: { active: boolean }) {
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none absolute -z-10 aspect-square w-[min(90%,460px)] rounded-full border border-[color-mix(in_srgb,var(--foreground)_8%,transparent)] before:absolute before:inset-[12%] before:rounded-full before:border before:border-dashed before:border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] before:transform-[rotate(-25deg)_scaleY(0.7)] before:content-[''] after:absolute after:inset-[-8%] after:rounded-full after:border after:border-dashed after:border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] after:transform-[rotate(25deg)_scaleY(0.65)] after:content-['']"
      animate={{ opacity: active ? 1 : 0, scale: active ? 1.15 : 0.85 }}
      transition={{ duration: 0.7 }}
    />
  )
}
