import { usePortfolioTranslation } from '@/shared/hooks/usePortfolioTranslation'
import { FullBleedBackground } from '@/shared/components/FullBleedBackground'
import { cn } from '@/shared/lib/utils'

export function Footer({
  name,
  year,
  className
}: {
  name: string
  year: number
  className?: string
}) {
  const { t } = usePortfolioTranslation()
  return (
    <footer
      className={cn(
        'relative isolate mx-auto px-6 py-8 text-xs leading-normal text-muted-foreground max-[767px]:pb-[calc(80px+env(safe-area-inset-bottom))]',
        className
      )}
    >
      <FullBleedBackground />
      {name} © {year}
      <span aria-hidden="true"> · </span>
      <a
        href="https://icons8.com/"
        target="_blank"
        rel="noreferrer"
        className="underline-offset-4 hover:underline"
      >
        {t('footer.iconCredit')}
      </a>
    </footer>
  )
}
