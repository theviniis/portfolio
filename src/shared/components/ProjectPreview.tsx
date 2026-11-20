import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { MousePointer2 } from 'lucide-react'
import { Skeleton } from '@/shared/ui/skeleton'
import { Button } from '@/shared/ui/button'
import { AnimatedAction } from './AnimatedAction'
import { usePortfolioTranslation } from '@/shared/hooks/usePortfolioTranslation'

function PreviewSkeleton({ label }: { label: string }) {
  return (
    <div
      role="status"
      aria-label={label}
      className="absolute inset-0 grid content-start grid-cols-2 gap-3 overflow-hidden bg-background p-5"
    >
      {[true, false, false, false, false].map((wide, index) => (
        <Skeleton
          key={index}
          aria-hidden="true"
          className={
            wide
              ? 'col-span-full h-[65px] rounded-[5px] border border-border motion-reduce:animate-none'
              : 'h-[18px] rounded-[5px] border border-border motion-reduce:animate-none'
          }
        />
      ))}
    </div>
  )
}
function PreviewFrame({
  src,
  name,
  scale
}: {
  src: string
  name: string
  scale: number
}) {
  const { t } = usePortfolioTranslation()
  const [loaded, setLoaded] = useState(false)
  const [active, setActive] = useState(false)
  const container = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    if (!active) return
    const dismiss = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setActive(false)
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(false)
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', escape)
    }
  }, [active])
  return (
    <div
      ref={container}
      className="absolute inset-0 bg-background"
      aria-busy={!loaded}
    >
      <iframe
        src={src}
        title={t('preview.title', { name })}
        className="absolute inset-0 h-[562.5px] w-[1000px] origin-top-left border-0 bg-white"
        style={{
          transform: `scale(${scale})`,
          pointerEvents: active ? 'auto' : 'none',
          opacity: loaded ? 1 : 0
        }}
        tabIndex={active ? 0 : -1}
        onLoad={() => setLoaded(true)}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        loading="eager"
      />
      {!loaded && <PreviewSkeleton label={t('preview.loading')} />}
      {loaded && !active && (
        <Button
          asChild
          variant="ghost"
          className="absolute inset-0 h-full w-full flex-col gap-2.5 rounded-none border-0 bg-[color-mix(in_srgb,var(--background)_45%,transparent)] p-0 text-xs font-normal text-foreground transition-none hover:bg-[color-mix(in_srgb,var(--background)_65%,transparent)] hover:opacity-100"
        >
          <m.button
            type="button"
            onClick={() => setActive(true)}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    backgroundColor:
                      'color-mix(in srgb, var(--background) 65%, transparent)'
                  }
            }
            whileTap={reduceMotion ? undefined : { scale: 0.99 }}
            aria-label={t('preview.interact', { name })}
          >
            <MousePointer2 className="size-6!" />
            <span>{t('preview.activate')}</span>
          </m.button>
        </Button>
      )}
      {active && (
        <AnimatedAction
          className="absolute top-2 right-2 rounded-[20px] px-3 py-1.5 text-[11px]"
          onClick={() => setActive(false)}
        >
          {t('preview.stop')} ×
        </AnimatedAction>
      )}
    </div>
  )
}
export function ProjectPreview({ src, name }: { src: string; name: string }) {
  const { t } = usePortfolioTranslation()
  const { ref, inView: hasBeenVisible } = useInView({
    rootMargin: '0px',
    threshold: 0,
    triggerOnce: true
  })
  const viewport = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.4)
  useEffect(() => {
    const node = viewport.current
    if (!node) return
    const observer = new ResizeObserver(() => setScale(node.clientWidth / 1000))
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      data-testid="project-preview"
      className="min-w-0 overflow-hidden rounded-[14px] bg-background max-[767px]:row-start-1 min-[768px]:self-center"
    >
      <div aria-hidden="true" className="flex items-center gap-[5px] p-2.5">
        {[0, 1, 2].map((dot) => (
          <i key={dot} className="size-[7px] rounded-full bg-border" />
        ))}
        <span className="m-auto text-[10px] leading-normal text-muted-foreground">
          {name}
        </span>
      </div>
      <div
        ref={viewport}
        className="relative aspect-video overflow-hidden bg-background"
      >
        {hasBeenVisible ? (
          <PreviewFrame key={src} src={src} name={name} scale={scale} />
        ) : (
          <PreviewSkeleton label={t('preview.loading')} />
        )}
      </div>
    </div>
  )
}
