import type { ExperienceType } from './types'

export function ExperienceItem({
  company,
  role,
  period,
  responsibilities
}: ExperienceType) {
  return (
    <article className="grid grid-cols-[190px_minmax(0,1fr)] gap-16 max-[767px]:grid-cols-[minmax(0,1fr)] max-[767px]:gap-2.5 max-[767px]:pl-5">
      <div className="pt-6.5 text-right text-sm font-semibold leading-normal max-[767px]:pt-0 max-[767px]:text-left max-[767px]:text-xs">
        {period.start} — {period.end}
      </div>
      <div className="relative rounded-3xl bg-secondary px-6 py-6.5 max-[767px]:px-5 max-[767px]:py-5.5">
        <span
          aria-hidden="true"
          className="absolute top-7.75 -left-3.5 size-2 rounded-full bg-foreground shadow-[0_0_0_4px_var(--background)] max-[767px]:top-7 max-[767px]:-left-5"
        />
        <h3 className="mb-1.5 font-sans text-[22px] font-semibold normal-case leading-tight tracking-[-0.035em] max-[767px]:text-xl">
          {company}
        </h3>
        <h4 className="m-0 font-sans text-sm font-medium leading-normal">
          {role}
        </h4>
        <p className="mt-3.5 border-l-2 border-[#bc6329] pl-3 text-sm leading-[1.65] text-muted-foreground">
          {responsibilities[0]}
        </p>
      </div>
    </article>
  )
}
