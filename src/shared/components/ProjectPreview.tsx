import { Skeleton } from '@/shared/ui/skeleton'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { MousePointer2 } from 'lucide-react'

function PreviewSkeleton({ en }: { en: boolean }) {
  return (
    <div
      className="preview-wireframe preview-skeleton"
      role="status"
      aria-label={en ? 'Loading preview' : 'Carregando pré-visualização'}
    >
      <Skeleton className="preview-skeleton-block" aria-hidden="true" />
      <Skeleton className="preview-skeleton-block" aria-hidden="true" />
      <Skeleton className="preview-skeleton-block" aria-hidden="true" />
      <Skeleton className="preview-skeleton-block" aria-hidden="true" />
      <Skeleton className="preview-skeleton-block" aria-hidden="true" />
    </div>
  )
}

function PreviewFrame({
  src,
  name,
  en,
  scale
}: {
  src: string
  name: string
  en: boolean
  scale: number
}) {
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
    <div ref={container} className="preview-content" aria-busy={!loaded}>
      <iframe
        src={src}
        title={`${en ? 'Live preview' : 'Pré-visualização'}: ${name}`}
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
      {!loaded && <PreviewSkeleton en={en} />}
      {loaded && !active && (
        <m.button
          className="preview-overlay"
          onClick={() => setActive(true)}
          whileHover={
            reduceMotion
              ? undefined
              : { backgroundColor: 'var(--preview-hover)' }
          }
          whileTap={reduceMotion ? undefined : { scale: 0.99 }}
          aria-label={`${en ? 'Interact with' : 'Interagir com'} ${name}`}
        >
          <MousePointer2 size={24} />
          <span>{en ? 'Click to interact' : 'Clique para interagir'}</span>
        </m.button>
      )}
      {active && (
        <button className="preview-stop" onClick={() => setActive(false)}>
          {en ? 'Stop interacting' : 'Sair da interação'} ×
        </button>
      )}
    </div>
  )
}
export function ProjectPreview({
  src,
  name,
  en
}: {
  src: string
  name: string
  en: boolean
}) {
  const { ref, inView } = useInView({ rootMargin: '0px', threshold: 0 })
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
    <div ref={ref} className="project-preview">
      <div className="preview-toolbar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{name}</span>
      </div>
      <div ref={viewport} className="preview-viewport">
        {!inView && <PreviewSkeleton en={en} />}
        {inView && (
          <PreviewFrame key={src} src={src} name={name} en={en} scale={scale} />
        )}
      </div>
    </div>
  )
}
