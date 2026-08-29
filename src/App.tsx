import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Header } from "./components/Header";
import { SkillsWrapper } from "./components/SkillsWrapper";
import { Separator } from "./components/ui/separator";
import { Hero } from "@/components/Hero";
import { Toaster } from "./components/ui/sonner";

function App() {
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
        <Contact />
      </main>
      <Toaster />
    </>
  );
}

export default App;
