import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import {
  AnimatePresence,
  scroll,
  useMotionValue,
  useReducedMotion
} from 'motion/react'
import * as m from 'motion/react-m'
import { Section } from '@/shared/ui/Section'
import { Button } from '@/shared/ui/button'
import { ExperienceItem } from './ExperienceItem'
import type { ExperienceType } from './types'

const ITEMS_PER_PAGE = 3

const Experience = () => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const reduceMotion = useReducedMotion()
  const scrollYProgress = useMotionValue(0)
  const experiences = t('experience.experiences', {
    returnObjects: true
  }) as ExperienceType[]
  const visibleExperiences = expanded
    ? experiences
    : experiences.slice(0, ITEMS_PER_PAGE)

  useEffect(() => {
    const list = listRef.current
    if (!list || reduceMotion) return

    const updateProgress = () => {
      const { top, height } = list.getBoundingClientRect()
      const progress = height ? (window.innerHeight / 2 - top) / height : 0
      scrollYProgress.set(Math.max(0, Math.min(1, progress)))
    }

    const stopScroll = scroll(updateProgress)
    const observer = new ResizeObserver(updateProgress)
    observer.observe(list)
    updateProgress()

    return () => {
      observer.disconnect()
      stopScroll()
    }
  }, [reduceMotion, scrollYProgress])

  return (
    <Section id={t('header.items.experience.id')}>
      <h2>{t('experience.title')}</h2>
      <div>
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[15px] bottom-0 left-1 w-0.5 overflow-hidden rounded-full bg-border"
          >
            <m.div
              className="h-full origin-top bg-primary motion-reduce:transform-none!"
              style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
            />
          </div>
          <ul id="experience-list" ref={listRef}>
            <AnimatePresence initial={false}>
              {visibleExperiences.map((item) => (
                <m.li
                  key={item.company}
                  className="overflow-hidden [&:not(:first-child)>div]:pt-10"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <ExperienceItem {...item} />
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
        {experiences.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center mt-6">
            <Button
              variant="ghost"
              size="sm"
              aria-expanded={expanded}
              aria-controls="experience-list"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? t('experience.showLess') : t('experience.showMore')}
              <ChevronDown
                className={`transition-transform motion-reduce:transition-none ${expanded ? 'rotate-180' : ''}`}
              />
            </Button>
          </div>
        )}
      </div>
    </Section>
  )
}

export { Experience }
