import { lazy, Suspense } from 'react'
import { Header } from '@/features/header'
import { Hero } from '@/features/hero'
import { About } from '@/features/about'
import { SkillsWrapper } from '@/features/skills'
import { Experience } from '@/features/experience'
import { Separator } from '@/shared/ui/separator'
import { Toaster } from '@/shared/ui/sonner'
import { SectionLoading } from '@/shared/components/SectionLoading'
import { useDocumentMeta } from '@/shared/hooks/useDocumentMeta'

const Projects = lazy(() =>
  import('@/features/projects').then((m) => ({ default: m.Projects }))
)
const Contact = lazy(() =>
  import('@/features/contact').then((m) => ({ default: m.Contact }))
)

function App() {
  useDocumentMeta()

  return (
    <>
      <main className="bg-background">
        <Header />
        <Hero />
        <Separator />
        <About />
        <Separator />
        <SkillsWrapper />
        <Separator />
        <Experience />
        <Separator />
        <Suspense fallback={<SectionLoading variant="projects" />}>
          <Projects />
        </Suspense>
        <Separator />
        <Suspense fallback={<SectionLoading variant="contact" />}>
          <Contact />
        </Suspense>
      </main>
      <Toaster />
    </>
  )
}

export default App
