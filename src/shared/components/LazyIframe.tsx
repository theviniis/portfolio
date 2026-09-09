import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/shared/lib/utils'

interface LazyIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  src: string
  rootMargin?: string
  threshold?: number
}

const LazyIframe = ({
  src,
  rootMargin = '0% 200%',
  threshold = 0,
  className,
  title,
  sandbox,
  ...props
}: LazyIframeProps) => {
  const [shouldLoad, setShouldLoad] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting) {
        setShouldLoad(true)
      }
    },
    []
  )

  useEffect(() => {
    const node = containerRef.current
    if (!node || shouldLoad) return

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin,
      threshold,
    })

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [rootMargin, threshold, handleIntersect, shouldLoad])

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {!shouldLoad && (
        <div
          className={cn(
            'absolute inset-0 animate-pulse bg-muted rounded-lg',
            className
          )}
          aria-hidden="true"
        />
      )}
      {shouldLoad && (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className={cn(
            'absolute inset-0 h-full w-full min-w-0 min-h-0 border-0',
            className
          )}
          sandbox={sandbox}
          {...props}
        />
      )}
    </div>
  )
}

export { LazyIframe }
export type { LazyIframeProps }
