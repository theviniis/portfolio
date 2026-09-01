# Projects Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Projects" section to the portfolio with an Embla Carousel of iframe project cards (deploy preview, GitHub link, skills badges).

**Architecture:** New `Projects.tsx` component using `Section` layout, `ProjectCard.tsx` for individual cards, Embla Carousel for navigation. Data stored in i18n translation files. Position between Experience and Contact.

**Tech Stack:** React 19, TypeScript, Embla Carousel React v8.6.0, Tailwind CSS, shadcn Badge, lucide-react icons

---

## File Structure

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | Modify | Add `embla-carousel-react` dependency |
| `src/data/en/translation.json` | Modify | Add `projects` section + header item |
| `src/data/pt-BR/translation.json` | Modify | Add `projects` section + header item |
| `src/components/ProjectCard.tsx` | Create | Single project card (iframe + info) |
| `src/components/Projects.tsx` | Create | Carousel section with Embla |
| `src/App.tsx` | Modify | Add `Projects` between Experience and Contact |

---

### Task 1: Install Embla Carousel dependency

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install embla-carousel-react**

```bash
cd /home/viniis/portfolio && npm install embla-carousel-react
```

- [ ] **Step 2: Verify installation**

```bash
grep "embla-carousel-react" /home/viniis/portfolio/package.json
```
Expected: line showing `"embla-carousel-react": "^8.6.0"`

- [ ] **Step 3: Commit**

```bash
cd /home/viniis/portfolio && git add package.json pnpm-lock.yaml package-lock.json && git commit -m "deps: add embla-carousel-react"
```

---

### Task 2: Add projects data to EN translation file

**Files:**
- Modify: `src/data/en/translation.json`

- [ ] **Step 1: Add header nav item**

In `src/data/en/translation.json`, add a new item to `header.items` array (before Contact):

```json
{ "url": "#projects", "name": "Projects" }
```

- [ ] **Step 2: Add projects section**

In `src/data/en/translation.json`, add a new top-level key (before `contact`):

```json
"projects": {
  "id": "projects",
  "title": "Projects",
  "description": "A selection of projects I've built. Each one is a live preview you can interact with.",
  "list": []
},
```

- [ ] **Step 3: Validate JSON**

```bash
node -e "JSON.parse(require('fs').readFileSync('/home/viniis/portfolio/src/data/en/translation.json', 'utf8')); console.log('Valid JSON')"
```
Expected: `Valid JSON`

- [ ] **Step 4: Commit**

```bash
cd /home/viniis/portfolio && git add src/data/en/translation.json && git commit -m "feat(projects): add EN translation data"
```

---

### Task 3: Add projects data to PT-BR translation file

**Files:**
- Modify: `src/data/pt-BR/translation.json`

- [ ] **Step 1: Add header nav item**

In `src/data/pt-BR/translation.json`, add a new item to `header.items` array (before Contato):

```json
{ "url": "#projetos", "name": "Projetos" }
```

- [ ] **Step 2: Add projects section**

In `src/data/pt-BR/translation.json`, add a new top-level key (before `contact`):

```json
"projects": {
  "id": "projetos",
  "title": "Projetos",
  "description": "Uma seleção de projetos que desenvolvi. Cada um tem uma pré-visualização ao vivo que você pode interagir.",
  "list": []
},
```

- [ ] **Step 3: Validate JSON**

```bash
node -e "JSON.parse(require('fs').readFileSync('/home/viniis/portfolio/src/data/pt-BR/translation.json', 'utf8')); console.log('Valid JSON')"
```
Expected: `Valid JSON`

- [ ] **Step 4: Commit**

```bash
cd /home/viniis/portfolio && git add src/data/pt-BR/translation.json && git commit -m "feat(projects): add PT-BR translation data"
```

---

### Task 4: Create ProjectCard component

**Files:**
- Create: `src/components/ProjectCard.tsx`

- [ ] **Step 1: Create the ProjectCard component**

```tsx
import { Badge } from "./ui/badge";

type Project = {
  name: string;
  deployUrl: string;
  githubUrl: string;
  skills: string[];
  description?: string;
};

const ProjectCard = ({ name, deployUrl, githubUrl, skills, description }: Project) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-video overflow-hidden rounded-lg border bg-muted">
        <iframe
          src={deployUrl}
          title={name}
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4>{name}</h4>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} GitHub repository`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        <ul className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <li key={skill}>
              <Badge variant={index > 2 ? "outline" : "default"}>
                {skill}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { ProjectCard };
export type { Project };
```

- [ ] **Step 2: Commit**

```bash
cd /home/viniis/portfolio && git add src/components/ProjectCard.tsx && git commit -m "feat(projects): add ProjectCard component"
```

---

### Task 5: Create Projects carousel component

**Files:**
- Create: `src/components/Projects.tsx`

- [ ] **Step 1: Create the Projects component**

```tsx
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "./ui/Section";
import { Button } from "./ui/button";
import { ProjectCard, type Project } from "./ProjectCard";

const Projects = () => {
  const { t } = useTranslation();
  const projects = t("projects.list", { returnObjects: true }) as Project[];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!projects.length) return null;

  return (
    <Section id={t("projects.id")}>
      <div>
        <h2>{t("projects.title")}</h2>
        <p className="text-muted-foreground mt-2">
          {t("projects.description")}
        </p>
      </div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {projects.map((project) => (
              <div key={project.name} className="min-w-0 flex-none w-full">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            aria-label="Previous project"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            aria-label="Next project"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
};

export { Projects };
```

- [ ] **Step 2: Commit**

```bash
cd /home/viniis/portfolio && git add src/components/Projects.tsx && git commit -m "feat(projects): add Projects carousel component"
```

---

### Task 6: Add Projects to App layout

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Import and add Projects component**

In `src/App.tsx`:

1. Add import after Experience import:
```tsx
import { Projects } from "./components/Projects";
```

2. Add `<Projects />` between `<Experience />` and `<Separator />` before Contact:

```tsx
<Experience />
<Separator />
<Projects />
<Separator />
<Contact />
```

- [ ] **Step 2: Verify build**

```bash
cd /home/viniis/portfolio && npm run build 2>&1 | tail -20
```
Expected: Build succeeds with no TypeScript errors

- [ ] **Step 3: Commit**

```bash
cd /home/viniis/portfolio && git add src/App.tsx && git commit -m "feat(projects): add Projects section to App layout"
```

---

### Task 7: Final verification

**Files:**
- None (verification only)

- [ ] **Step 1: Run lint**

```bash
cd /home/viniis/portfolio && npm run lint
```
Expected: No errors

- [ ] **Step 2: Run build**

```bash
cd /home/viniis/portfolio && npm run build
```
Expected: Build succeeds

- [ ] **Step 3: Start dev server and verify**

```bash
cd /home/viniis/portfolio && npm run dev
```
Expected: Dev server starts, navigate to http://localhost:5173 and verify:
- Projects section appears between Experience and Contact
- Header has "Projects" / "Projetos" nav link
- If `projects.list` has items, carousel renders with arrows

- [ ] **Step 4: Final commit with all files**

```bash
cd /home/viniis/portfolio && git status
```
Review all changes, commit if any remaining.
