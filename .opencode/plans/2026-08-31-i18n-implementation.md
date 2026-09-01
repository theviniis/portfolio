# Internationalization (i18n) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add English internationalization to the portfolio application using react-i18next with automatic browser language detection.

**Architecture:** Install react-i18next with browser language detection, create merged translation files for PT and EN, update all components to use the `useTranslation` hook, and handle hardcoded strings in UI components and service files.

**Tech Stack:** React, TypeScript, Vite, react-i18next, i18next, i18next-browser-languagedetector

---

## File Structure

### Files to Create
- `src/i18n.ts` - i18next configuration with language detection
- `src/hooks/useDocumentLang.ts` - Hook for dynamic HTML lang attribute updates
- `src/data/pt/translation.json` - Portuguese translations (merged from individual JSONs)
- `src/data/en/translation.json` - English translations (new)

### Files to Modify
- `src/main.tsx` - Import i18n initialization
- `src/App.tsx` - Use useDocumentLang hook
- `src/components/Header.tsx` - Use useTranslation hook
- `src/components/Hero.tsx` - Use useTranslation hook
- `src/components/About.tsx` - Use useTranslation hook
- `src/components/SkillsWrapper.tsx` - Use useTranslation hook
- `src/components/Experience.tsx` - Use useTranslation hook
- `src/components/Contact.tsx` - Use useTranslation hook
- `src/components/ui/loading-button.tsx` - Translate "Enviando..."
- `src/components/ui/hamburger-button.tsx` - Translate aria-labels
- `src/lib/schemas.ts` - Translate validation messages (accept t function)
- `src/lib/service.ts` - Translate toast messages (accept t function)
- `index.html` - Add hreflang links

### Files to Delete (after migration)
- `src/data/header.json` - Moved to pt/translation.json
- `src/data/hero.json` - Moved to pt/translation.json
- `src/data/about.json` - Moved to pt/translation.json
- `src/data/skills.json` - Moved to pt/translation.json
- `src/data/experience.json` - Moved to pt/translation.json
- `src/data/contact.json` - Moved to pt/translation.json

---

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install i18next packages**

Run: `npm install i18next react-i18next i18next-browser-languagedetector`

Expected: Packages added to package.json dependencies

- [ ] **Step 2: Verify installation**

Run: `npm ls i18next react-i18next i18next-browser-languagedetector`

Expected: All three packages listed with versions

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add i18next dependencies"
```

---

### Task 2: Create Portuguese Translation File

**Files:**
- Create: `src/data/pt/translation.json`

- [ ] **Step 1: Create pt directory**

Run: `mkdir -p src/data/pt`

- [ ] **Step 2: Create merged Portuguese translation file**

Create `src/data/pt/translation.json` with content from all existing JSONs merged:

```json
{
  "header": {
    "items": [
      { "url": "#about-me", "name": "Sobre" },
      { "url": "#skills", "name": "Habilidades" },
      { "url": "#experience", "name": "Experiência" },
      { "url": "#contact", "name": "Contato" }
    ]
  },
  "hero": {
    "greeting": "Olá, me chamo",
    "name": "Vinícius Costa.",
    "location": "Rio Grande, RS",
    "descriptionPrefix": "Sou desenvolvedor front-end localizado em ",
    "descriptionSuffix": "Tenho experiência com desenvolvimento de aplicações web.",
    "cta": "Entre em contato",
    "alt": "Imagem de perfil"
  },
  "about": {
    "title": "Desenvolvedor front-end com foco em JavaScript",
    "paragraphs": [
      "Desenvolvedor front-end com experiência em React, TypeScript, Next.js, HTML, CSS, SCSS e Tailwind.",
      "Na Sympla, implementei tracking de analytics com Mixpanel, push notifications com Braze e Service Worker, e realizei a migração de banco de dados AWS Redshift para Athena para redução de custos.",
      "Possuo experiência em documentação técnica, publicação de pacotes npm no GitLab Registry e adoção de desenvolvimento assistido por IA.",
      "Habilidades em colaboração, resolução de problemas e adaptabilidade em equipes multidisciplinares."
    ],
    "cvLabel": "Baixar currículo"
  },
  "skills": {
    "title": "Habilidades",
    "description": "Estou sempre em busca de aprender algo novo. Gosto de explorar ferramentas, práticas e jeitos diferentes de construir e ir somando isso ao que já faço no dia a dia.",
    "list": [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "React Query",
      "Testes Unitários",
      "Analytics",
      "Spec Driven Development",
      "API Rest",
      "NodeJS"
    ]
  },
  "experience": {
    "title": "Experiência",
    "showMore": "Ver mais",
    "showLess": "Ver menos",
    "experiences": [
      {
        "role": "Desenvolvedor de front-end",
        "company": "Sympla",
        "period": { "start": "nov/2025", "end": "jun/2026" },
        "responsibilities": [
          "Criei o SDK de analytics da plataforma para alternar facilmente entre ferramentas como Mixpanel, Google Analytics e PostHog, viabilizando troca ágil de ferramentas.",
          "Implementei 100+ eventos estruturados de analytics em diversas aplicações (JavaScript Vanilla, React, Next.js, Vue e Polymer), contribuindo para grande aumento no uso da plataforma.",
          "Refatorei a fila de eventos baseada em Promise eliminando condições de corrida no React e conduzi treinamentos para desenvolvedores garantindo adoção adequada da ferramenta."
        ],
        "skills": [
          "React",
          "Next.js",
          "TypeScript",
          "Web Components",
          "Monorepo",
          "Jest + Vitest",
          "Ghost Inspector",
          "Mixpanel",
          "Analytics",
          "Docker",
          "AWS"
        ]
      },
      {
        "role": "Desenvolvedor de front-end",
        "company": "InfoPrice",
        "period": { "start": "jun/2023", "end": "out/2025" },
        "responsibilities": [
          "Arquitetei soluções front-end com React, TypeScript, Redux e SASS/SCSS para plataforma SaaS B2B de precificação no varejo.",
          "Desenvolvi componentes reutilizáveis, escaláveis e acessíveis aprimorando significativamente a experiência do usuário da plataforma."
        ],
        "skills": [
          "React",
          "TypeScript",
          "Redux",
          "Storybook",
          "Jest + React Testing Library",
          "Git",
          "GitHub"
        ]
      },
      {
        "role": "Desenvolvedor de front-end",
        "company": "Bornlogic",
        "period": { "start": "ago/2022", "end": "jan/2023" },
        "responsibilities": [
          "Projetei e implementei Design System completo usando React, Storybook e Styled-Components com documentação de componentes em MDX."
        ],
        "skills": [
          "React",
          "TypeScript",
          "Storybook",
          "Jest + React Testing Library",
          "Git",
          "GitHub"
        ]
      }
    ]
  },
  "contact": {
    "title": "Contato",
    "emailLabel": "Entre em contato através do meu email",
    "email": "vinicius.dsc95@gmail.com",
    "cvLabel": "Para mais informações, baixe o meu",
    "cvLink": "currículo",
    "sendButton": "Enviar",
    "formFields": {
      "name": "Nome",
      "subject": "Assunto",
      "email": "Email",
      "message": "Mensagem"
    }
  },
  "common": {
    "sending": "Enviando...",
    "closeMenu": "Fechar menu",
    "openMenu": "Abrir menu"
  },
  "validation": {
    "nameMin": "O nome precisa ter pelo menos 3 caractéres",
    "emailInvalid": "O email precisa ser válido",
    "subjectMin": "O assunto precisa ter pelo menos 3 caractéres",
    "messageMin": "A mensagem precisa ter pelo menos 5 caractéres"
  },
  "toast": {
    "sendSuccess": "Email encaminhado com sucesso",
    "sendError": "Não foi possível enviar o email",
    "sendFail": "Falha ao enviar o formulário"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/pt/translation.json
git commit -m "feat: add Portuguese translation file"
```

---

### Task 3: Create English Translation File

**Files:**
- Create: `src/data/en/translation.json`

- [ ] **Step 1: Create en directory**

Run: `mkdir -p src/data/en`

- [ ] **Step 2: Create English translation file**

Create `src/data/en/translation.json` with translated content:

```json
{
  "header": {
    "items": [
      { "url": "#about-me", "name": "About" },
      { "url": "#skills", "name": "Skills" },
      { "url": "#experience", "name": "Experience" },
      { "url": "#contact", "name": "Contact" }
    ]
  },
  "hero": {
    "greeting": "Hello, my name is",
    "name": "Vinícius Costa.",
    "location": "Rio Grande, RS",
    "descriptionPrefix": "I'm a front-end developer based in ",
    "descriptionSuffix": "I have experience building web applications.",
    "cta": "Get in touch",
    "alt": "Profile picture"
  },
  "about": {
    "title": "Front-end developer focused on JavaScript",
    "paragraphs": [
      "Front-end developer with experience in React, TypeScript, Next.js, HTML, CSS, SCSS and Tailwind.",
      "At Sympla, I implemented analytics tracking with Mixpanel, push notifications with Braze and Service Worker, and migrated the AWS Redshift database to Athena to reduce costs.",
      "I have experience in technical documentation, publishing npm packages to GitLab Registry, and adopting AI-assisted development.",
      "Skills in collaboration, problem-solving, and adaptability in multidisciplinary teams."
    ],
    "cvLabel": "Download resume"
  },
  "skills": {
    "title": "Skills",
    "description": "I'm always looking to learn something new. I enjoy exploring tools, practices, and different ways to build things, adding them to what I already do day to day.",
    "list": [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "React Query",
      "Unit Testing",
      "Analytics",
      "Spec Driven Development",
      "REST API",
      "NodeJS"
    ]
  },
  "experience": {
    "title": "Experience",
    "showMore": "Show more",
    "showLess": "Show less",
    "experiences": [
      {
        "role": "Front-end Developer",
        "company": "Sympla",
        "period": { "start": "nov/2025", "end": "jun/2026" },
        "responsibilities": [
          "Created the platform's analytics SDK to easily switch between tools like Mixpanel, Google Analytics and PostHog, enabling agile tool switching.",
          "Implemented 100+ structured analytics events across multiple applications (Vanilla JavaScript, React, Next.js, Vue and Polymer), contributing to significant platform usage growth.",
          "Refactored the Promise-based event queue eliminating race conditions in React and conducted developer training ensuring proper tool adoption."
        ],
        "skills": [
          "React",
          "Next.js",
          "TypeScript",
          "Web Components",
          "Monorepo",
          "Jest + Vitest",
          "Ghost Inspector",
          "Mixpanel",
          "Analytics",
          "Docker",
          "AWS"
        ]
      },
      {
        "role": "Front-end Developer",
        "company": "InfoPrice",
        "period": { "start": "jun/2023", "end": "out/2025" },
        "responsibilities": [
          "Architected front-end solutions with React, TypeScript, Redux and SASS/SCSS for a B2B SaaS retail pricing platform.",
          "Developed reusable, scalable and accessible components significantly improving the platform's user experience."
        ],
        "skills": [
          "React",
          "TypeScript",
          "Redux",
          "Storybook",
          "Jest + React Testing Library",
          "Git",
          "GitHub"
        ]
      },
      {
        "role": "Front-end Developer",
        "company": "Bornlogic",
        "period": { "start": "ago/2022", "end": "jan/2023" },
        "responsibilities": [
          "Designed and implemented a complete Design System using React, Storybook and Styled-Components with MDX component documentation."
        ],
        "skills": [
          "React",
          "TypeScript",
          "Storybook",
          "Jest + React Testing Library",
          "Git",
          "GitHub"
        ]
      }
    ]
  },
  "contact": {
    "title": "Contact",
    "emailLabel": "Get in touch via my email",
    "email": "vinicius.dsc95@gmail.com",
    "cvLabel": "For more information, download my",
    "cvLink": "resume",
    "sendButton": "Send",
    "formFields": {
      "name": "Name",
      "subject": "Subject",
      "email": "Email",
      "message": "Message"
    }
  },
  "common": {
    "sending": "Sending...",
    "closeMenu": "Close menu",
    "openMenu": "Open menu"
  },
  "validation": {
    "nameMin": "Name must be at least 3 characters",
    "emailInvalid": "Email must be valid",
    "subjectMin": "Subject must be at least 3 characters",
    "messageMin": "Message must be at least 5 characters"
  },
  "toast": {
    "sendSuccess": "Email sent successfully",
    "sendError": "Could not send email",
    "sendFail": "Failed to send form"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/en/translation.json
git commit -m "feat: add English translation file"
```

---

### Task 4: Create i18n Configuration

**Files:**
- Create: `src/i18n.ts`

- [ ] **Step 1: Create i18n configuration file**

Create `src/i18n.ts`:

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import pt from './data/pt/translation.json';
import en from './data/en/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en }
    },
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```

- [ ] **Step 2: Commit**

```bash
git add src/i18n.ts
git commit -m "feat: add i18next configuration"
```

---

### Task 5: Initialize i18n in Main Entry

**Files:**
- Modify: `src/main.tsx`

- [ ] **Step 1: Add i18n import to main.tsx**

Update `src/main.tsx` to:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 2: Commit**

```bash
git add src/main.tsx
git commit -m "feat: initialize i18n in main entry"
```

---

### Task 6: Create useDocumentLang Hook

**Files:**
- Create: `src/hooks/useDocumentLang.ts`

- [ ] **Step 1: Create hooks directory**

Run: `mkdir -p src/hooks`

- [ ] **Step 2: Create useDocumentLang hook**

Create `src/hooks/useDocumentLang.ts`:

```typescript
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SEO_DATA: Record<string, { title: string; description: string }> = {
  pt: {
    title: 'Vinícius Costa - Desenvolvedor Front-end',
    description: 'Vinícius Costa — desenvolvedor front-end. Experiência com React, TypeScript, Next.js e Tailwind.'
  },
  en: {
    title: 'Vinícius Costa - Front-end Developer',
    description: 'Vinícius Costa — front-end developer. Experience with React, TypeScript, Next.js and Tailwind.'
  }
};

export function useDocumentLang() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;

    const seoData = SEO_DATA[i18n.language] || SEO_DATA.pt;
    document.title = seoData.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoData.description);
    }
  }, [i18n.language]);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useDocumentLang.ts
git commit -m "feat: add useDocumentLang hook for SEO updates"
```

---

### Task 7: Update App.tsx with useDocumentLang

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add useDocumentLang hook to App.tsx**

Update `src/App.tsx`:

```tsx
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
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
        <Contact />
      </main>
      <Toaster />
    </>
  );
}

export default App;
```

- [ ] **Step 2: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add useDocumentLang to App component"
```

---

### Task 8: Update Header.tsx with useTranslation

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Update Header.tsx to use useTranslation**

Update `src/components/Header.tsx`:

```tsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { HamburgerButton } from "./ui/hamburger-button";

const Header = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const headerItems = t('header.items', { returnObjects: true }) as Array<{ url: string; name: string }>;

  return (
    <>
      <header className="wrapper py-6 sticky top-0 w-full z-50 bg-background/80 shadow-md ring-1 ring-border backdrop-blur-xl">
        <nav className="flex justify-between items-center">
          <Logo />

          <div className="hidden md:flex items-center">
            {headerItems.map(({ name, url }) => (
              <Button
                key={name}
                asChild
                variant="link"
                className="text-md transition-all motion-reduce:transition-none"
              >
                <a href={url}>{name}</a>
              </Button>
            ))}
          </div>

          <HamburgerButton isOpen={isOpen} onClick={toggleMenu} />
        </nav>
      </header>

      <div
        className={`
          fixed inset-0 z-40 bg-background/95 backdrop-blur-xl
          flex flex-col items-center justify-center gap-6 p-6 md:hidden
          transition-all duration-300 ease-in-out
          motion-reduce:transition-none
          ${
            isOpen
              ? "opacity-100 visible pointer-events-auto scale-100"
              : "opacity-0 invisible pointer-events-none scale-95"
          }
        `}
      >
        {headerItems.map(({ name, url }) => (
          <Button
            key={name}
            asChild
            variant="link"
            className="text-2xl w-full"
            onClick={() => setIsOpen(false)}
            size="lg"
          >
            <a href={url}>{name}</a>
          </Button>
        ))}
      </div>
    </>
  );
};

export { Header };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: update Header to use useTranslation"
```

---

### Task 9: Update Hero.tsx with useTranslation

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Update Hero.tsx to use useTranslation**

Update `src/components/Hero.tsx`:

```tsx
import { Pointer } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";

import profile from "../assets/profile.png";
import { Section } from "./ui/Section";
import { LinkedInButton } from "./ui/linkedin-button";
import { GitHubButton } from "./ui/github-button";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <Section>
      <div className="grid place-content-center gap-y-8 lg:gap-y-16">
        <div className="space-y-2 lg:space-y-4">
          <div>
            <span className="text-h3">{t('hero.greeting')}</span>
            <h1>{t('hero.name')}</h1>
          </div>
          <p>
            {t('hero.descriptionPrefix')}
            <strong>{t('hero.location')}</strong>.
            <br />
            {t('hero.descriptionSuffix')}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg" className="pe-1 " asChild>
            <a href="#contact">
              <span>{t('hero.cta')}</span>
              <Button asChild variant="secondary" size="icon-sm">
                <span>
                  <Pointer className="text-primary" />
                </span>
              </Button>
            </a>
          </Button>
          <ButtonGroup>
            <LinkedInButton />
            <GitHubButton />
          </ButtonGroup>
        </div>
      </div>
      <div className="bg-secondary rounded-4xl overflow-hidden relative aspect-square lg:aspect-3/4">
        <img
          src={profile}
          alt={t('hero.alt')}
          className="drop-shadow absolute bottom-0"
        />
      </div>
    </Section>
  );
};

export { Hero };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: update Hero to use useTranslation"
```

---

### Task 10: Update About.tsx with useTranslation

**Files:**
- Modify: `src/components/About.tsx`

- [ ] **Step 1: Update About.tsx to use useTranslation**

Update `src/components/About.tsx`:

```tsx
import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Section } from "./ui/Section";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { LinkedInButton } from "./ui/linkedin-button";
import { GitHubButton } from "./ui/github-button";

import cvUrl from "../assets/vinicius_costa_cv.docx?url";

const About = () => {
  const { t } = useTranslation();
  const aboutParagraphs = t('about.paragraphs', { returnObjects: true }) as string[];

  return (
    <Section id="about-me">
      <h2>{t('about.title')}</h2>
      <div className="space-y-8">
        <div className="space-y-4">
          <h3>{t('about.title')}</h3>
          <div className="text-justify space-y-2">
            {aboutParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg" className="pe-1" asChild>
            <a href={cvUrl} download="vinicius_costa_cv.docx">
              <span>{t('about.cvLabel')}</span>
              <Button asChild variant="secondary" size="icon-sm">
                <span>
                  <Download />
                </span>
              </Button>
            </a>
          </Button>

          <ButtonGroup>
            <LinkedInButton />
            <GitHubButton />
          </ButtonGroup>
        </div>
      </div>
    </Section>
  );
};

export { About };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: update About to use useTranslation"
```

---

### Task 11: Update SkillsWrapper.tsx with useTranslation

**Files:**
- Modify: `src/components/SkillsWrapper.tsx`

- [ ] **Step 1: Update SkillsWrapper.tsx to use useTranslation**

Update `src/components/SkillsWrapper.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { Section } from "./ui/Section";
import { Button } from "./ui/button";

const SkillsWrapper = () => {
  const { t } = useTranslation();
  const skillsList = t('skills.list', { returnObjects: true }) as string[];

  return (
    <Section id="skills">
      <h2>{t('skills.title')}</h2>
      <div className="space-y-8">
        <p>{t('skills.description')}</p>
        <ul className="flex flex-wrap gap-2">
          {skillsList.map((skill, index) => (
            <Button
              key={skill}
              variant={index > 2 ? "outline" : "default"}
              className="pointer-events-none"
              asChild
            >
              <li className="flex-1">{skill}</li>
            </Button>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export { SkillsWrapper };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SkillsWrapper.tsx
git commit -m "feat: update SkillsWrapper to use useTranslation"
```

---

### Task 12: Update Experience.tsx with useTranslation

**Files:**
- Modify: `src/components/Experience.tsx`

- [ ] **Step 1: Update Experience.tsx to use useTranslation**

Update `src/components/Experience.tsx`:

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "./ui/Section";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ChevronDown } from "lucide-react";

type ExperienceType = {
  role: string;
  company: string;
  period: { start: string; end: string };
  responsibilities: string[];
  skills: string[];
};

const ExperienceItem = ({
  company,
  responsibilities,
  period,
  role,
  skills,
}: ExperienceType) => {
  return (
    <div key={company}>
      <li className="space-y-4">
        <div>
          <h4>{company}</h4>
          <h5>{role}</h5>
          <p>
            {period.start} — {period.end}
          </p>
          <ul className="flex flex-wrap items-center gap-2 mt-2">
            {skills.map((skill, index) => (
              <li key={skill}>
                <Badge variant={index > 2 ? "outline" : "default"}>
                  {skill}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        <ul className="space-y-1">
          {responsibilities.map((resp) => (
            <li
              key={resp}
              className="text-muted-foreground text-justify hyphens-auto"
            >
              • {resp}
            </li>
          ))}
        </ul>
      </li>
      <Separator className="last:hidden" />
    </div>
  );
};

const ITEMS_PER_PAGE = 3;

const Experience = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const experiences = t('experience.experiences', { returnObjects: true }) as ExperienceType[];
  const visibleExperiences = expanded
    ? experiences
    : experiences.slice(0, ITEMS_PER_PAGE);

  return (
    <Section id="experience">
      <h2>{t('experience.title')}</h2>
      <div>
        <ul className="space-y-6" id="experience-list">
          {visibleExperiences.map(ExperienceItem)}
        </ul>
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
                className={`transition-transform motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
              />
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
};

export { Experience };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Experience.tsx
git commit -m "feat: update Experience to use useTranslation"
```

---

### Task 13: Update Contact.tsx with useTranslation

**Files:**
- Modify: `src/components/Contact.tsx`

- [ ] **Step 1: Update Contact.tsx to use useTranslation**

Update `src/components/Contact.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { Section } from "./ui/Section";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { ButtonGroup } from "./ui/button-group";
import { LinkedInButton } from "./ui/linkedin-button";
import { GitHubButton } from "./ui/github-button";
import { sendContactEmail } from "@/lib/service";
import { sendContactSchema } from "@/lib/schemas";
import { LoadingButton } from "./ui/loading-button";
import { Button } from "./ui/button";

import cvUrl from "../assets/vinicius_costa_cv.docx?url";

const ContactForm = () => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(sendContactSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  return (
    <form
      className="space-y-8"
      id="contact-form"
      onSubmit={form.handleSubmit((data) => sendContactEmail(data, t))}
    >
      <div>
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          className="hidden absolute opacity-0 pointer-events-none w-0 h-0"
        />
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>{t('contact.formFields.name')}</FieldLabel>
                <Input {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="subject"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>{t('contact.formFields.subject')}</FieldLabel>
                <Input {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>{t('contact.formFields.email')}</FieldLabel>
                <Input {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>{t('contact.formFields.message')}</FieldLabel>
                <Textarea {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      <Separator />
      <div className="flex gap-4 justify-end">
        <LoadingButton
          className="min-w-20"
          size="lg"
          isLoading={form.formState.isSubmitting}
        >
          {t('contact.sendButton')}
        </LoadingButton>
      </div>
    </form>
  );
};

const Contact = () => {
  const { t } = useTranslation();

  return (
    <Section id="contact">
      <div className="space-y-4">
        <h2>{t('contact.title')}</h2>
        <div>
          <p>
            {t('contact.emailLabel')}{" "}
            <Button className="p-0 text-base" variant="link" asChild>
              <a href={`mailto:${t('contact.email')}`}>
                {t('contact.email')}
              </a>
            </Button>
          </p>

          <p>
            {t('contact.cvLabel')}{" "}
            <Button className="p-0 text-base" variant="link" asChild>
              <a href={cvUrl} download="vinicius_costa_cv.docx">
                {t('contact.cvLink')}
              </a>
            </Button>
          </p>
        </div>
        <ButtonGroup className="mt-8">
          <LinkedInButton />
          <GitHubButton />
        </ButtonGroup>
      </div>
      <ContactForm />
    </Section>
  );
};

export { Contact };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: update Contact to use useTranslation"
```

---

### Task 14: Update schemas.ts to Accept Translation Function

**Files:**
- Modify: `src/lib/schemas.ts`

- [ ] **Step 1: Update schemas.ts to accept t function**

Update `src/lib/schemas.ts`:

```ts
import z from "zod";
import type { TFunction } from "i18next";

export const sendContactSchema = (t: TFunction) => z.object({
  name: z.string().min(3, t('validation.nameMin')),
  email: z.email(t('validation.emailInvalid')),
  subject: z.string().min(3, t('validation.subjectMin')),
  message: z.string().min(5, t('validation.messageMin')),
  _gotcha: z.string().optional(),
});

export type SendContactSchemaType = z.infer<ReturnType<typeof sendContactSchema>>;
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/schemas.ts
git commit -m "feat: update schemas to accept translation function"
```

---

### Task 15: Update service.ts to Accept Translation Function

**Files:**
- Modify: `src/lib/service.ts`

- [ ] **Step 1: Update service.ts to accept t function**

Update `src/lib/service.ts`:

```ts
import axios from "axios";
import type { SendContactSchemaType } from "./schemas";
import { toast } from "sonner";
import type { TFunction } from "i18next";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

export const sendContactEmail = async (data: SendContactSchemaType, t: TFunction) => {
  try {
    const response = await axios.post(FORMSPREE_ENDPOINT, data);

    if (response.status !== 200) {
      throw new Error(t('toast.sendFail'));
    }

    toast.success(t('toast.sendSuccess'), {
      position: "bottom-right",
    });
  } catch {
    toast.error(t('toast.sendError'), {
      position: "bottom-right",
    });
  }
};
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/service.ts
git commit -m "feat: update service to accept translation function"
```

---

### Task 16: Update LoadingButton with Translation

**Files:**
- Modify: `src/components/ui/loading-button.tsx`

- [ ] **Step 1: Update loading-button.tsx to use useTranslation**

Update `src/components/ui/loading-button.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function LoadingButton({
  isLoading,
  ...props
}: ButtonProps & { isLoading?: boolean }) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Button disabled {...props}>
        <Spinner data-icon="inline-start" />
        {t('common.sending')}
      </Button>
    );
  }

  return <Button {...props} />;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/loading-button.tsx
git commit -m "feat: update LoadingButton to use useTranslation"
```

---

### Task 17: Update HamburgerButton with Translation

**Files:**
- Modify: `src/components/ui/hamburger-button.tsx`

- [ ] **Step 1: Update hamburger-button.tsx to use useTranslation**

Update `src/components/ui/hamburger-button.tsx`:

```tsx
import type { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const HamburgerButton = ({
  isOpen = false,
  className,
  ...props
}: ComponentProps<"button"> & {
  isOpen?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-label={isOpen ? t('common.closeMenu') : t('common.openMenu')}
      className={cn(
        "md:hidden z-50 p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors",
        className,
      )}
      {...props}
    >
      {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
    </button>
  );
};

export { HamburgerButton };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/hamburger-button.tsx
git commit -m "feat: update HamburgerButton to use useTranslation"
```

---

### Task 18: Add hreflang Links to index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add hreflang links to index.html**

Add the following lines before the closing `</head>` tag in `index.html`:

```html
<link rel="alternate" hreflang="pt" href="/?lang=pt" />
<link rel="alternate" hreflang="en" href="/?lang=en" />
<link rel="alternate" hreflang="x-default" href="/" />
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add hreflang links for i18n SEO"
```

---

### Task 19: Delete Old Translation Files

**Files:**
- Delete: `src/data/header.json`
- Delete: `src/data/hero.json`
- Delete: `src/data/about.json`
- Delete: `src/data/skills.json`
- Delete: `src/data/experience.json`
- Delete: `src/data/contact.json`

- [ ] **Step 1: Delete old JSON files**

Run:
```bash
rm src/data/header.json src/data/hero.json src/data/about.json src/data/skills.json src/data/experience.json src/data/contact.json
```

- [ ] **Step 2: Verify no imports reference deleted files**

Run: `grep -r "from.*\.\./data/.*\.json" src/`

Expected: No results (all imports should now use useTranslation)

- [ ] **Step 3: Commit**

```bash
git add -A src/data/
git commit -m "feat: remove old translation files after migration"
```

---

### Task 20: Verify Build and Test

**Files:**
- None (verification only)

- [ ] **Step 1: Run TypeScript type check**

Run: `npm run typecheck`

Expected: No type errors

- [ ] **Step 2: Run build**

Run: `npm run build`

Expected: Build succeeds with no errors

- [ ] **Step 3: Run dev server and test manually**

Run: `npm run dev`

Manual testing:
1. Open browser with English locale - should see English content
2. Open browser with Portuguese locale - should see Portuguese content
3. Check that all sections display correctly
4. Test contact form validation messages
5. Test form submission toast messages
6. Check hamburger button aria-labels

- [ ] **Step 4: Run linter**

Run: `npm run lint`

Expected: No lint errors

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete i18n implementation with English support"
```

---

## Summary

**Total Tasks:** 20

**Files Created:** 4
- `src/i18n.ts`
- `src/hooks/useDocumentLang.ts`
- `src/data/pt/translation.json`
- `src/data/en/translation.json`

**Files Modified:** 13
- `src/main.tsx`
- `src/App.tsx`
- `src/components/Header.tsx`
- `src/components/Hero.tsx`
- `src/components/About.tsx`
- `src/components/SkillsWrapper.tsx`
- `src/components/Experience.tsx`
- `src/components/Contact.tsx`
- `src/components/ui/loading-button.tsx`
- `src/components/ui/hamburger-button.tsx`
- `src/lib/schemas.ts`
- `src/lib/service.ts`
- `index.html`

**Files Deleted:** 6
- `src/data/header.json`
- `src/data/hero.json`
- `src/data/about.json`
- `src/data/skills.json`
- `src/data/experience.json`
- `src/data/contact.json`
