import { profile } from '@/data/profile'
import { Header } from '@/features/header'
import { Hero } from '@/features/hero'
import { Projects } from '@/features/projects'
import { Experience } from '@/features/experience'
import { About } from '@/features/about'
import { Contact } from '@/features/contact'
import { Footer } from '@/features/footer/Footer'
import { useDocumentMeta } from '@/shared/hooks/useDocumentMeta'
import { useFirstScroll } from '@/shared/hooks/useFirstScroll'
import { useInitialScroll } from '@/shared/hooks/useInitialScroll'

export default function App() {
  useInitialScroll()
  useDocumentMeta()
  const hasScrolled = useFirstScroll()
  return (
    <>
      <Header />
      <main className="mx-auto max-w-260 px-6 md:px-18">
        <Hero hasScrolled={hasScrolled} />
        <Projects hasScrolled={hasScrolled} />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer name={profile.name} year={new Date().getFullYear()} />
    </>
  )
}
