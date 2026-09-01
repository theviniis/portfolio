import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Header } from "./components/Header";
import { SkillsWrapper } from "./components/SkillsWrapper";
import { Separator } from "./components/ui/separator";
import { Hero } from "@/components/Hero";
import { Toaster } from "./components/ui/sonner";
import { useDocumentLang } from "./hooks/useDocumentLang";

function App() {
  useDocumentLang();

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
        <Projects />
        <Separator />
        <Contact />
      </main>
      <Toaster />
    </>
  );
}

export default App;
