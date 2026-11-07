import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '@/features/header'
import { Hero } from '@/features/hero'
import { About } from '@/features/about'
import { SkillsWrapper } from '@/features/skills'
import { Experience } from '@/features/experience'
import { Toaster } from '@/shared/ui/sonner'
import { SectionLoading } from '@/shared/components/SectionLoading'
import { SectionBackdrop } from '@/shared/components/SectionBackdrop'
import { useDocumentMeta } from '@/shared/hooks/useDocumentMeta'
import { useWheelMomentum } from '@/shared/hooks/useWheelMomentum'

const Projects = lazy(() =>
  import('@/features/projects').then((m) => ({ default: m.Projects }))
)
const Contact = lazy(() =>
  import('@/features/contact').then((m) => ({ default: m.Contact }))
)

function App() {
  const { t } = useTranslation()
  useDocumentMeta()
  useWheelMomentum()

  return (
    <>
      <main className="bg-background">
        <Header />
        <Hero />
        <SectionBackdrop>
          <About />
          <SkillsWrapper />
          <Experience />
          <div id={t('header.items.projects.id')}>
            <Suspense fallback={<SectionLoading variant="projects" />}>
              <Projects />
            </Suspense>
          </div>
          <div id={t('header.items.contact.id')}>
            <Suspense fallback={<SectionLoading variant="contact" />}>
              <Contact />
            </Suspense>
          </div>
        </SectionBackdrop>
      </main>
      <Toaster />
    </>
  )
}

export default App
