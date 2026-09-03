# Code Splitting & Reusability Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce initial JS bundle and improve component reusability by lazy-loading Projects/Contact sections, extracting shared patterns into `shared/`, and reorganizing source into feature folders with per-feature i18n loading.

**Architecture:** Feature folders under `src/features/`, shared primitives under `src/shared/`, lazy chunks for Projects and Contact with Suspense + skeleton fallbacks, i18n namespaces registered per feature at module evaluation time.

**Tech Stack:** React 19, TypeScript, Vite, i18next, shadcn/ui, Tailwind CSS v4

---

## File Structure

| Path                                           | Action | Purpose                                         |
| ---------------------------------------------- | ------ | ----------------------------------------------- |
| `src/shared/lib/cv.ts`                         | Create | Single source of truth for CV_MAP               |
| `src/shared/lib/utils.ts`                      | Move   | From `src/lib/utils.ts`                         |
| `src/shared/lib/schemas.ts`                    | Move   | From `src/lib/schemas.ts` (used by Contact)     |
| `src/shared/lib/service.ts`                    | Move   | From `src/lib/service.ts` (used by Contact)     |
| `src/shared/hooks/useDocumentMeta.ts`          | Create | Replaces `useDocumentLang`                      |
| `src/shared/hooks/useBodyScrollLock.ts`        | Create | Extract from Header                             |
| `src/shared/hooks/useClickOutsideEscape.ts`    | Create | Extract from ProjectCard                        |
| `src/shared/hooks/useCarouselScroll.ts`        | Create | Extract from Projects                           |
| `src/shared/components/CtaButton.tsx`          | Create | Hero + About CTA pattern                        |
| `src/shared/components/SkillList.tsx`          | Create | Badge list with index > 2 rule                  |
| `src/shared/components/SectionHeader.tsx`      | Create | h2 + description                                |
| `src/shared/components/HorizontalCarousel.tsx` | Create | Generic carousel with prev/next                 |
| `src/shared/components/SectionLoading.tsx`     | Create | Skeleton fallback for Suspense                  |
| `src/shared/ui/skeleton.tsx`                   | Create | shadcn skeleton primitive                       |
| `src/shared/ui/Section.tsx`                    | Move   | From `src/components/ui/Section.tsx`            |
| `src/shared/ui/*`                              | Move   | All shadcn primitives from `src/components/ui/` |
| `src/features/header/index.ts`                 | Create | Barrel export                                   |
| `src/features/header/Header.tsx`               | Move   | From `src/components/Header.tsx`                |
| `src/features/header/Logo.tsx`                 | Move   | From `src/components/Logo.tsx`                  |
| `src/features/header/i18n.ts`                  | Create | Register header translations                    |
| `src/features/hero/index.ts`                   | Create | Barrel export                                   |
| `src/features/hero/Hero.tsx`                   | Move   | From `src/components/Hero.tsx`                  |
| `src/features/hero/i18n.ts`                    | Create | Register hero translations                      |
| `src/features/about/index.ts`                  | Create | Barrel export                                   |
| `src/features/about/About.tsx`                 | Move   | From `src/components/About.tsx`                 |
| `src/features/about/i18n.ts`                   | Create | Register about translations                     |
| `src/features/skills/index.ts`                 | Create | Barrel export                                   |
| `src/features/skills/SkillsWrapper.tsx`        | Move   | From `src/components/SkillsWrapper.tsx`         |
| `src/features/skills/i18n.ts`                  | Create | Register skills translations                    |
| `src/features/experience/index.ts`             | Create | Barrel export                                   |
| `src/features/experience/Experience.tsx`       | Move   | From `src/components/Experience.tsx`            |
| `src/features/experience/ExperienceItem.tsx`   | Create | Extract from Experience.tsx                     |
| `src/features/experience/types.ts`             | Create | ExperienceType                                  |
| `src/features/experience/i18n.ts`              | Create | Register experience translations                |
| `src/features/projects/index.ts`               | Create | Barrel export (lazy)                            |
| `src/features/projects/Projects.tsx`           | Move   | From `src/components/Projects.tsx`              |
| `src/features/projects/ProjectCard.tsx`        | Move   | From `src/components/ProjectCard.tsx`           |
| `src/features/projects/types.ts`               | Create | Project type                                    |
| `src/features/projects/i18n.ts`                | Create | Register projects translations                  |
| `src/features/contact/index.ts`                | Create | Barrel export (lazy)                            |
| `src/features/contact/Contact.tsx`             | Move   | From `src/components/Contact.tsx`               |
| `src/features/contact/ContactForm.tsx`         | Move   | From `src/components/ContactForm.tsx`           |
| `src/features/contact/i18n.ts`                 | Create | Register contact translations                   |
| `src/data/translations/header/pt-BR.json`      | Create | Split from header.json                          |
| `src/data/translations/header/en-US.json`      | Create | Split from header.json                          |
| `src/data/translations/hero/pt-BR.json`        | Create | Split from hero.json                            |
| `src/data/translations/hero/en-US.json`        | Create | Split from hero.json                            |
| `src/data/translations/about/pt-BR.json`       | Create | Split from about.json                           |
| `src/data/translations/about/en-US.json`       | Create | Split from about.json                           |
| `src/data/translations/skills/pt-BR.json`      | Create | Split from skills.json                          |
| `src/data/translations/skills/en-US.json`      | Create | Split from skills.json                          |
| `src/data/translations/experience/pt-BR.json`  | Create | Split from experience.json                      |
| `src/data/translations/experience/en-US.json`  | Create | Split from experience.json                      |
| `src/data/translations/projects/pt-BR.json`    | Create | Split from projects.json                        |
| `src/data/translations/projects/en-US.json`    | Create | Split from projects.json                        |
| `src/data/translations/contact/pt-BR.json`     | Create | Split from contact.json                         |
| `src/data/translations/contact/en-US.json`     | Create | Split from contact.json                         |
| `src/data/translations/ui/pt-BR.json`          | Create | Split from ui.json                              |
| `src/data/translations/ui/en-US.json`          | Create | Split from ui.json                              |
| `src/data/translations/links/pt-BR.json`       | Create | Split from links.json                           |
| `src/data/translations/links/en-US.json`       | Create | Split from links.json                           |
| `src/i18n.ts`                                  | Modify | Remove static resources, keep header only       |
| `src/App.tsx`                                  | Modify | Add lazy() + Suspense for Projects/Contact      |
| `src/lib/social-icons.tsx`                     | Move   | To `src/shared/lib/social-icons.tsx`            |
| `src/data/types.ts`                            | Move   | To `src/shared/types.ts`                        |

---

## Phase 1: Extract Shared Utilities

### Task 1: Create CV utility

**Files:**

- Create: `src/shared/lib/cv.ts`

- [ ] **Step 1: Create shared/lib directory**

```bash
mkdir -p /home/viniis/portfolio/src/shared/lib
```

- [ ] **Step 2: Write CV utility**

```typescript
import cvUrlPt from '@/assets/cv_vinicius_costa.docx?url'
import cvUrlEn from '@/assets/en_cv_vinicius_costa.docx?url'

export const CV_MAP: Record<string, { url: string; filename: string }> = {
  'pt-BR': { url: cvUrlPt, filename: 'cv_vinicius_costa.docx' },
  'en-US': { url: cvUrlEn, filename: 'en_cv_vinicius_costa.docx' }
}

export function getCvForLang(lang: string) {
  return CV_MAP[lang] ?? CV_MAP['pt-BR']
}
```

- [ ] **Step 3: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
cd /home/viniis/portfolio && git add src/shared/lib/cv.ts && git commit -m "feat(shared): add CV utility"
```

---

### Task 2: Move lib utilities to shared

**Files:**

- Move: `src/lib/utils.ts` → `src/shared/lib/utils.ts`
- Move: `src/lib/schemas.ts` → `src/shared/lib/schemas.ts`
- Move: `src/lib/service.ts` → `src/shared/lib/service.ts`
- Move: `src/lib/social-icons.tsx` → `src/shared/lib/social-icons.tsx`

- [ ] **Step 1: Move utils.ts**

```bash
cd /home/viniis/portfolio && mv src/lib/utils.ts src/shared/lib/utils.ts
```

- [ ] **Step 2: Move schemas.ts**

```bash
cd /home/viniis/portfolio && mv src/lib/schemas.ts src/shared/lib/schemas.ts
```

- [ ] **Step 3: Move service.ts**

```bash
cd /home/viniis/portfolio && mv src/lib/service.ts src/shared/lib/service.ts
```

- [ ] **Step 4: Move social-icons.tsx**

```bash
cd /home/viniis/portfolio && mv src/lib/social-icons.tsx src/shared/lib/social-icons.tsx
```

- [ ] **Step 5: Update service.ts import**

In `src/shared/lib/service.ts`, change:

```typescript
import { sendContactSchema } from '@/lib/schemas'
```

to:

```typescript
import { sendContactSchema } from '@/shared/lib/schemas'
```

- [ ] **Step 6: Remove empty lib directory**

```bash
cd /home/viniis/portfolio && rmdir src/lib
```

- [ ] **Step 7: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: Errors about missing imports (we'll fix in next tasks)

- [ ] **Step 8: Commit**

```bash
cd /home/viniis/portfolio && git add -A && git commit -m "refactor(shared): move lib utilities to shared/lib"
```

---

### Task 3: Update imports to use shared/lib

**Files:**

- Modify: `src/components/ContactForm.tsx`
- Modify: `src/components/ui/social-link-button.tsx`
- Modify: All files under `src/components/ui/`

- [ ] **Step 1: Update ContactForm imports**

In `src/components/ContactForm.tsx`, change:

```typescript
import { sendContactEmail } from '@/lib/service'
import { sendContactSchema } from '@/lib/schemas'
```

to:

```typescript
import { sendContactEmail } from '@/shared/lib/service'
import { sendContactSchema } from '@/shared/lib/schemas'
```

- [ ] **Step 2: Update social-link-button imports**

In `src/components/ui/social-link-button.tsx`, change:

```typescript
import { socialIconMap, type SocialIcon } from '@/lib/social-icons'
```

to:

```typescript
import { socialIconMap, type SocialIcon } from '@/shared/lib/social-icons'
```

- [ ] **Step 3: Update all ui component imports**

In all files under `src/components/ui/` that import `utils`, change:

```typescript
import { cn } from '@/lib/utils'
```

to:

```typescript
import { cn } from '@/shared/lib/utils'
```

Files to update:

- `src/components/ui/badge.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/button-group.tsx`
- `src/components/ui/field.tsx`
- `src/components/ui/hamburger-button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/label.tsx`
- `src/components/ui/Section.tsx`
- `src/components/ui/separator.tsx`
- `src/components/ui/social-link-button.tsx`
- `src/components/ui/spinner.tsx`
- `src/components/ui/textarea.tsx`

- [ ] **Step 4: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 5: Commit**

```bash
cd /home/viniis/portfolio && git add -A && git commit -m "refactor: update imports to use shared/lib"
```

---

## Phase 2: Create Shared Hooks

### Task 4: Create useDocumentMeta hook

**Files:**

- Create: `src/shared/hooks/useDocumentMeta.ts`

- [ ] **Step 1: Create shared/hooks directory**

```bash
mkdir -p /home/viniis/portfolio/src/shared/hooks
```

- [ ] **Step 2: Write useDocumentMeta hook**

```typescript
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const SEO_DATA: Record<string, { title: string; description: string }> = {
  'pt-BR': {
    title: 'Vinícius Costa - Desenvolvedor Front-end',
    description:
      'Vinícius Costa — desenvolvedor front-end. Experiência com React, TypeScript, Next.js e Tailwind.'
  },
  'en-US': {
    title: 'Vinícius Costa - Front-end Developer',
    description:
      'Vinícius Costa — front-end developer. Experience with React, TypeScript, Next.js and Tailwind.'
  }
}

export function useDocumentMeta() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language

    const seoData = SEO_DATA[i18n.language] ?? SEO_DATA['en-US']
    document.title = seoData.title

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', seoData.description)
    }
  }, [i18n.language])
}
```

- [ ] **Step 3: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
cd /home/viniis/portfolio && git add src/shared/hooks/useDocumentMeta.ts && git commit -m "feat(shared): add useDocumentMeta hook"
```

---

### Task 5: Create useBodyScrollLock hook

**Files:**

- Create: `src/shared/hooks/useBodyScrollLock.ts`

- [ ] **Step 1: Write useBodyScrollLock hook**

```typescript
import { useEffect } from 'react'

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /home/viniis/portfolio && git add src/shared/hooks/useBodyScrollLock.ts && git commit -m "feat(shared): add useBodyScrollLock hook"
```

---

### Task 6: Create useClickOutsideEscape hook

**Files:**

- Create: `src/shared/hooks/useClickOutsideEscape.ts`

- [ ] **Step 1: Write useClickOutsideEscape hook**

```typescript
import { useEffect } from 'react'

interface UseClickOutsideEscapeOptions {
  active: boolean
  ignoreInside?: string
  onDismiss: () => void
}

export function useClickOutsideEscape({
  active,
  ignoreInside,
  onDismiss
}: UseClickOutsideEscapeOptions) {
  useEffect(() => {
    if (!active) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    }

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (ignoreInside && target.closest(ignoreInside)) return
      onDismiss()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown, true)
    }
  }, [active, ignoreInside, onDismiss])
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /home/viniis/portfolio && git add src/shared/hooks/useClickOutsideEscape.ts && git commit -m "feat(shared): add useClickOutsideEscape hook"
```

---

### Task 7: Create useCarouselScroll hook

**Files:**

- Create: `src/shared/hooks/useCarouselScroll.ts`

- [ ] **Step 1: Write useCarouselScroll hook**

```typescript
import { RefObject, useCallback, useEffect, useState } from 'react'

export function useCarouselScroll(ref: RefObject<HTMLDivElement>) {
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateScrollState = useCallback(() => {
    const el = ref.current
    if (!el) return
    setCanScrollPrev(el.scrollLeft > 0)
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }, [ref])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState, ref])

  const scrollPrev = useCallback(() => {
    ref.current?.scrollBy({
      left: -ref.current.clientWidth,
      behavior: 'smooth'
    })
  }, [ref])

  const scrollNext = useCallback(() => {
    ref.current?.scrollBy({
      left: ref.current.clientWidth,
      behavior: 'smooth'
    })
  }, [ref])

  return { canScrollPrev, canScrollNext, scrollPrev, scrollNext }
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /home/viniis/portfolio && git add src/shared/hooks/useCarouselScroll.ts && git commit -m "feat(shared): add useCarouselScroll hook"
```

---

## Phase 3: Create Shared Components

### Task 8: Install shadcn skeleton

**Files:**

- Create: `src/shared/ui/skeleton.tsx`

- [ ] **Step 1: Create shared/ui directory**

```bash
mkdir -p /home/viniis/portfolio/src/shared/ui
```

- [ ] **Step 2: Install skeleton component**

```bash
cd /home/viniis/portfolio && pnpm dlx shadcn@latest add skeleton
```

Expected: Creates `src/components/ui/skeleton.tsx`

- [ ] **Step 3: Move skeleton to shared/ui**

```bash
cd /home/viniis/portfolio && mv src/components/ui/skeleton.tsx src/shared/ui/skeleton.tsx
```

- [ ] **Step 4: Update skeleton import path**

In `src/shared/ui/skeleton.tsx`, change:

```typescript
import { cn } from '@/lib/utils'
```

to:

```typescript
import { cn } from '@/shared/lib/utils'
```

- [ ] **Step 5: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 6: Commit**

```bash
cd /home/viniis/portfolio && git add -A && git commit -m "feat(shared): add skeleton component"
```

---

### Task 9: Create CtaButton component

**Files:**

- Create: `src/shared/components/CtaButton.tsx`

- [ ] **Step 1: Create shared/components directory**

```bash
mkdir -p /home/viniis/portfolio/src/shared/components
```

- [ ] **Step 2: Write CtaButton component**

```typescript
import { Slot } from 'radix-ui';
import { Button, type ButtonProps } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

interface CtaButtonProps extends Omit<ButtonProps, 'size' | 'asChild'> {
  label: string;
  icon: React.ReactNode;
  href?: string;
  download?: string;
  size?: 'default' | 'lg';
}

export function CtaButton({
  label,
  icon,
  href,
  download,
  size = 'lg',
  className,
  ...props
}: CtaButtonProps) {
  return (
    <Button asChild size={size} className={cn('pe-1', className)} {...props}>
      <a href={href} download={download}>
        <span>{label}</span>
        <Button asChild variant="secondary" size="icon-sm">
          <span>{icon}</span>
        </Button>
      </a>
    </Button>
  );
}
```

- [ ] **Step 3: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
cd /home/viniis/portfolio && git add src/shared/components/CtaButton.tsx && git commit -m "feat(shared): add CtaButton component"
```

---

### Task 10: Create SkillList component

**Files:**

- Create: `src/shared/components/SkillList.tsx`

- [ ] **Step 1: Write SkillList component**

```typescript
import { ReactNode } from 'react';
import { Badge } from '@/shared/ui/badge';
import { cn } from '@/shared/lib/utils';

interface SkillListProps {
  skills: string[];
  primaryCount?: number;
  renderItem?: (skill: string, variant: 'default' | 'outline') => ReactNode;
  className?: string;
}

export function SkillList({
  skills,
  primaryCount = 3,
  renderItem,
  className,
}: SkillListProps) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {skills.map((skill, index) => {
        const variant = index > primaryCount - 1 ? 'outline' : 'default';
        return (
          <li key={skill}>
            {renderItem ? (
              renderItem(skill, variant)
            ) : (
              <Badge variant={variant}>{skill}</Badge>
            )}
          </li>
        );
      })}
    </ul>
  );
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /home/viniis/portfolio && git add src/shared/components/SkillList.tsx && git commit -m "feat(shared): add SkillList component"
```

---

### Task 11: Create SectionHeader component

**Files:**

- Create: `src/shared/components/SectionHeader.tsx`

- [ ] **Step 1: Write SectionHeader component**

```typescript
interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div>
      <h2>{title}</h2>
      {description && <p className="text-muted-foreground mt-2">{description}</p>}
    </div>
  );
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /home/viniis/portfolio && git add src/shared/components/SectionHeader.tsx && git commit -m "feat(shared): add SectionHeader component"
```

---

### Task 12: Create HorizontalCarousel component

**Files:**

- Create: `src/shared/components/HorizontalCarousel.tsx`

- [ ] **Step 1: Write HorizontalCarousel component**

```typescript
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { useCarouselScroll } from '@/shared/hooks/useCarouselScroll';
import { cn } from '@/shared/lib/utils';

interface HorizontalCarouselProps {
  itemKeys: string[];
  renderItem: (key: string) => React.ReactNode;
  prevLabel: string;
  nextLabel: string;
  itemClassName?: string;
}

export function HorizontalCarousel({
  itemKeys,
  renderItem,
  prevLabel,
  nextLabel,
  itemClassName,
}: HorizontalCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarouselScroll(scrollRef);

  return (
    <div className="relative overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {itemKeys.map((key) => (
          <div
            key={key}
            className={cn('min-w-0 flex-none w-full snap-start', itemClassName)}
          >
            {renderItem(key)}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 mt-4">
        <Button
          size="icon"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label={prevLabel}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label={nextLabel}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /home/viniis/portfolio && git add src/shared/components/HorizontalCarousel.tsx && git commit -m "feat(shared): add HorizontalCarousel component"
```

---

### Task 13: Create SectionLoading component

**Files:**

- Create: `src/shared/components/SectionLoading.tsx`

- [ ] **Step 1: Write SectionLoading component**

```typescript
import { Skeleton } from '@/shared/ui/skeleton';

interface SectionLoadingProps {
  variant: 'projects' | 'contact';
}

export function SectionLoading({ variant }: SectionLoadingProps) {
  return (
    <section className="wrapper">
      <div className="grid md:grid-cols-[1fr_1fr] gap-8 py-8 lg:gap-16 lg:py-16">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        {variant === 'projects' ? (
          <Skeleton className="aspect-video w-full rounded-lg" />
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-32 ml-auto" />
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /home/viniis/portfolio && git add src/shared/components/SectionLoading.tsx && git commit -m "feat(shared): add SectionLoading component"
```

---

## Phase 4: Move UI Primitives to Shared

### Task 14: Move all UI components to shared/ui

**Files:**

- Move: All files from `src/components/ui/` → `src/shared/ui/`

- [ ] **Step 1: Move all ui components**

```bash
cd /home/viniis/portfolio && mv src/components/ui/* src/shared/ui/
```

- [ ] **Step 2: Remove empty ui directory**

```bash
cd /home/viniis/portfolio && rmdir src/components/ui
```

- [ ] **Step 3: Update imports in existing components**

In all files under `src/components/`, change imports from:

```typescript
import { Component } from './ui/component'
```

to:

```typescript
import { Component } from '@/shared/ui/component'
```

Files to update:

- `src/components/About.tsx`
- `src/components/Contact.tsx`
- `src/components/ContactForm.tsx`
- `src/components/Experience.tsx`
- `src/components/Header.tsx`
- `src/components/Hero.tsx`
- `src/components/ProjectCard.tsx`
- `src/components/Projects.tsx`
- `src/components/SkillsWrapper.tsx`
- `src/components/Logo.tsx` (if it imports anything)

- [ ] **Step 4: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 5: Run dev server smoke test**

```bash
cd /home/viniis/portfolio && pnpm dev
```

Open browser and verify homepage renders correctly. Press Ctrl+C to stop.

- [ ] **Step 6: Commit**

```bash
cd /home/viniis/portfolio && git add -A && git commit -m "refactor: move ui primitives to shared/ui"
```

---

## Phase 5: Split Translation Files

### Task 15: Split header translations

**Files:**

- Create: `src/data/translations/header/pt-BR.json`
- Create: `src/data/translations/header/en-US.json`

- [ ] **Step 1: Create header translation directories**

```bash
mkdir -p /home/viniis/portfolio/src/data/translations/header
```

- [ ] **Step 2: Read current header translations**

```bash
cd /home/viniis/portfolio && node -e "const data = require('./src/data/translations/header.json'); console.log(JSON.stringify(data, null, 2))"
```

- [ ] **Step 3: Write pt-BR header translations**

Extract `header` object from `pt` key in `src/data/translations/header.json` and write to:

`src/data/translations/header/pt-BR.json`:

```json
{
  "header": {
    "items": [
      { "url": "#sobre", "name": "Sobre" },
      { "url": "#habilidades", "name": "Habilidades" },
      { "url": "#experiencia", "name": "Experiência" },
      { "url": "#projetos", "name": "Projetos" },
      { "url": "#contato", "name": "Contato" }
    ]
  }
}
```

- [ ] **Step 4: Write en-US header translations**

Extract `header` object from `en` key in `src/data/translations/header.json` and write to:

`src/data/translations/header/en-US.json`:

```json
{
  "header": {
    "items": [
      { "url": "#about", "name": "About" },
      { "url": "#skills", "name": "Skills" },
      { "url": "#experience", "name": "Experience" },
      { "url": "#projects", "name": "Projects" },
      { "url": "#contact", "name": "Contact" }
    ]
  }
}
```

- [ ] **Step 5: Validate JSON**

```bash
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/header/pt-BR.json', 'utf8')); console.log('pt-BR valid')"
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/header/en-US.json', 'utf8')); console.log('en-US valid')"
```

Expected: Both valid

- [ ] **Step 6: Commit**

```bash
cd /home/viniis/portfolio && git add src/data/translations/header/ && git commit -m "feat(i18n): split header translations"
```

---

### Task 16: Split hero translations

**Files:**

- Create: `src/data/translations/hero/pt-BR.json`
- Create: `src/data/translations/hero/en-US.json`

- [ ] **Step 1: Create hero translation directories**

```bash
mkdir -p /home/viniis/portfolio/src/data/translations/hero
```

- [ ] **Step 2: Read current hero translations**

```bash
cd /home/viniis/portfolio && node -e "const data = require('./src/data/translations/hero.json'); console.log(JSON.stringify(data, null, 2))"
```

- [ ] **Step 3: Write pt-BR hero translations**

Extract `hero` object from `pt` key and write to `src/data/translations/hero/pt-BR.json`:

```json
{
  "hero": {
    "greeting": "Olá, eu sou",
    "name": "Vinícius Costa",
    "descriptionPrefix": "Desenvolvedor front-end, localizado em ",
    "location": "Recife, Brasil",
    "descriptionSuffix": "Focado em criar interfaces modernas e acessíveis.",
    "cta": "Entre em contato",
    "alt": "Foto de Vinícius Costa"
  }
}
```

- [ ] **Step 4: Write en-US hero translations**

Extract `hero` object from `en` key and write to `src/data/translations/hero/en-US.json`:

```json
{
  "hero": {
    "greeting": "Hi, I'm",
    "name": "Vinícius Costa",
    "descriptionPrefix": "Front-end developer, based in ",
    "location": "Recife, Brazil",
    "descriptionSuffix": "Focused on building modern and accessible interfaces.",
    "cta": "Get in touch",
    "alt": "Photo of Vinícius Costa"
  }
}
```

- [ ] **Step 5: Validate JSON**

```bash
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/hero/pt-BR.json', 'utf8')); console.log('pt-BR valid')"
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/hero/en-US.json', 'utf8')); console.log('en-US valid')"
```

Expected: Both valid

- [ ] **Step 6: Commit**

```bash
cd /home/viniis/portfolio && git add src/data/translations/hero/ && git commit -m "feat(i18n): split hero translations"
```

---

### Task 17: Split about translations

**Files:**

- Create: `src/data/translations/about/pt-BR.json`
- Create: `src/data/translations/about/en-US.json`

- [ ] **Step 1: Create about translation directories**

```bash
mkdir -p /home/viniis/portfolio/src/data/translations/about
```

- [ ] **Step 2: Read current about translations and write pt-BR**

Extract `about` from `pt` in `src/data/translations/about.json` and create `src/data/translations/about/pt-BR.json` with the content.

- [ ] **Step 3: Write en-US about translations**

Extract `about` from `en` in `src/data/translations/about.json` and create `src/data/translations/about/en-US.json` with the content.

- [ ] **Step 4: Validate JSON**

```bash
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/about/pt-BR.json', 'utf8')); console.log('pt-BR valid')"
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/about/en-US.json', 'utf8')); console.log('en-US valid')"
```

Expected: Both valid

- [ ] **Step 5: Commit**

```bash
cd /home/viniis/portfolio && git add src/data/translations/about/ && git commit -m "feat(i18n): split about translations"
```

---

### Task 18: Split skills translations

**Files:**

- Create: `src/data/translations/skills/pt-BR.json`
- Create: `src/data/translations/skills/en-US.json`

- [ ] **Step 1: Create skills translation directories**

```bash
mkdir -p /home/viniis/portfolio/src/data/translations/skills
```

- [ ] **Step 2: Read current skills translations and write pt-BR**

Extract `skills` from `pt` in `src/data/translations/skills.json` and create `src/data/translations/skills/pt-BR.json`.

- [ ] **Step 3: Write en-US skills translations**

Extract `skills` from `en` in `src/data/translations/skills.json` and create `src/data/translations/skills/en-US.json`.

- [ ] **Step 4: Validate JSON**

```bash
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/skills/pt-BR.json', 'utf8')); console.log('pt-BR valid')"
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/skills/en-US.json', 'utf8')); console.log('en-US valid')"
```

Expected: Both valid

- [ ] **Step 5: Commit**

```bash
cd /home/viniis/portfolio && git add src/data/translations/skills/ && git commit -m "feat(i18n): split skills translations"
```

---

### Task 19: Split experience translations

**Files:**

- Create: `src/data/translations/experience/pt-BR.json`
- Create: `src/data/translations/experience/en-US.json`

- [ ] **Step 1: Create experience translation directories**

```bash
mkdir -p /home/viniis/portfolio/src/data/translations/experience
```

- [ ] **Step 2: Read current experience translations and write pt-BR**

Extract `experience` from `pt` in `src/data/translations/experience.json` and create `src/data/translations/experience/pt-BR.json`.

- [ ] **Step 3: Write en-US experience translations**

Extract `experience` from `en` in `src/data/translations/experience.json` and create `src/data/translations/experience/en-US.json`.

- [ ] **Step 4: Validate JSON**

```bash
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/experience/pt-BR.json', 'utf8')); console.log('pt-BR valid')"
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/experience/en-US.json', 'utf8')); console.log('en-US valid')"
```

Expected: Both valid

- [ ] **Step 5: Commit**

```bash
cd /home/viniis/portfolio && git add src/data/translations/experience/ && git commit -m "feat(i18n): split experience translations"
```

---

### Task 20: Split projects translations

**Files:**

- Create: `src/data/translations/projects/pt-BR.json`
- Create: `src/data/translations/projects/en-US.json`

- [ ] **Step 1: Create projects translation directories**

```bash
mkdir -p /home/viniis/portfolio/src/data/translations/projects
```

- [ ] **Step 2: Read current projects translations and write pt-BR**

Extract `projects` from `pt` in `src/data/translations/projects.json` and create `src/data/translations/projects/pt-BR.json`.

- [ ] **Step 3: Write en-US projects translations**

Extract `projects` from `en` in `src/data/translations/projects.json` and create `src/data/translations/projects/en-US.json`.

- [ ] **Step 4: Validate JSON**

```bash
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/projects/pt-BR.json', 'utf8')); console.log('pt-BR valid')"
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/projects/en-US.json', 'utf8')); console.log('en-US valid')"
```

Expected: Both valid

- [ ] **Step 5: Commit**

```bash
cd /home/viniis/portfolio && git add src/data/translations/projects/ && git commit -m "feat(i18n): split projects translations"
```

---

### Task 21: Split contact translations

**Files:**

- Create: `src/data/translations/contact/pt-BR.json`
- Create: `src/data/translations/contact/en-US.json`

- [ ] **Step 1: Create contact translation directories**

```bash
mkdir -p /home/viniis/portfolio/src/data/translations/contact
```

- [ ] **Step 2: Read current contact translations and write pt-BR**

Extract `contact` from `pt` in `src/data/translations/contact.json` and create `src/data/translations/contact/pt-BR.json`.

- [ ] **Step 3: Write en-US contact translations**

Extract `contact` from `en` in `src/data/translations/contact.json` and create `src/data/translations/contact/en-US.json`.

- [ ] **Step 4: Validate JSON**

```bash
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/contact/pt-BR.json', 'utf8')); console.log('pt-BR valid')"
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/contact/en-US.json', 'utf8')); console.log('en-US valid')"
```

Expected: Both valid

- [ ] **Step 5: Commit**

```bash
cd /home/viniis/portfolio && git add src/data/translations/contact/ && git commit -m "feat(i18n): split contact translations"
```

---

### Task 22: Split ui translations

**Files:**

- Create: `src/data/translations/ui/pt-BR.json`
- Create: `src/data/translations/ui/en-US.json`

- [ ] **Step 1: Create ui translation directories**

```bash
mkdir -p /home/viniis/portfolio/src/data/translations/ui
```

- [ ] **Step 2: Read current ui translations and write pt-BR**

Extract `common` from `pt` in `src/data/translations/ui.json` and create `src/data/translations/ui/pt-BR.json`.

- [ ] **Step 3: Write en-US ui translations**

Extract `common` from `en` in `src/data/translations/ui.json` and create `src/data/translations/ui/en-US.json`.

- [ ] **Step 4: Validate JSON**

```bash
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/ui/pt-BR.json', 'utf8')); console.log('pt-BR valid')"
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/ui/en-US.json', 'utf8')); console.log('en-US valid')"
```

Expected: Both valid

- [ ] **Step 5: Commit**

```bash
cd /home/viniis/portfolio && git add src/data/translations/ui/ && git commit -m "feat(i18n): split ui translations"
```

---

### Task 23: Split links translations

**Files:**

- Create: `src/data/translations/links/pt-BR.json`
- Create: `src/data/translations/links/en-US.json`

- [ ] **Step 1: Create links translation directories**

```bash
mkdir -p /home/viniis/portfolio/src/data/translations/links
```

- [ ] **Step 2: Read current links translations and write pt-BR**

Extract `links` from `pt` in `src/data/translations/links.json` and create `src/data/translations/links/pt-BR.json`.

- [ ] **Step 3: Write en-US links translations**

Extract `links` from `en` in `src/data/translations/links.json` and create `src/data/translations/links/en-US.json`.

- [ ] **Step 4: Validate JSON**

```bash
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/links/pt-BR.json', 'utf8')); console.log('pt-BR valid')"
cd /home/viniis/portfolio && node -e "JSON.parse(require('fs').readFileSync('src/data/translations/links/en-US.json', 'utf8')); console.log('en-US valid')"
```

Expected: Both valid

- [ ] **Step 5: Commit**

```bash
cd /home/viniis/portfolio && git add src/data/translations/links/ && git commit -m "feat(i18n): split links translations"
```

---

## Phase 6: Create Feature Folders

### Task 24: Create header feature

**Files:**

- Create: `src/features/header/index.ts`
- Create: `src/features/header/i18n.ts`
- Move: `src/components/Header.tsx` → `src/features/header/Header.tsx`
- Move: `src/components/Logo.tsx` → `src/features/header/Logo.tsx`

- [ ] **Step 1: Create header feature directory**

```bash
mkdir -p /home/viniis/portfolio/src/features/header
```

- [ ] **Step 2: Move Header.tsx**

```bash
cd /home/viniis/portfolio && mv src/components/Header.tsx src/features/header/Header.tsx
```

- [ ] **Step 3: Move Logo.tsx**

```bash
cd /home/viniis/portfolio && mv src/components/Logo.tsx src/features/header/Logo.tsx
```

- [ ] **Step 4: Update Header imports**

In `src/features/header/Header.tsx`, change:

```typescript
import { Logo } from './Logo'
import { Button } from './ui/button'
import { HamburgerButton } from './ui/hamburger-button'
```

to:

```typescript
import { Logo } from './Logo'
import { Button } from '@/shared/ui/button'
import { HamburgerButton } from '@/shared/ui/hamburger-button'
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock'
```

- [ ] **Step 5: Refactor Header to use useBodyScrollLock**

In `src/features/header/Header.tsx`, replace the `useEffect` block that manages `body.overflow` (lines 31-41 in original) with:

```typescript
useBodyScrollLock(isOpen)
```

Remove the second `useEffect` and just keep the hook call at the top level.

- [ ] **Step 6: Write header i18n.ts**

Create `src/features/header/i18n.ts`:

```typescript
import type { i18n as I18n } from 'i18next'
import headerPt from '@/data/translations/header/pt-BR.json'
import headerEn from '@/data/translations/header/en-US.json'

export const headerPtBR = headerPt
export const headerEnUS = headerEn

export function mountHeaderTranslations(i18n: I18n) {
  i18n.addResourceBundle('pt-BR', 'translation', headerPt, true, true)
  i18n.addResourceBundle('en-US', 'translation', headerEn, true, true)
}
```

- [ ] **Step 7: Write header barrel export**

Create `src/features/header/index.ts`:

```typescript
export { Header } from './Header'
```

- [ ] **Step 8: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: Errors about missing Header import in App.tsx (we'll fix soon)

- [ ] **Step 9: Commit**

```bash
cd /home/viniis/portfolio && git add -A && git commit -m "feat(features): create header feature"
```

---

### Task 25: Create hero feature

**Files:**

- Create: `src/features/hero/index.ts`
- Create: `src/features/hero/i18n.ts`
- Move: `src/components/Hero.tsx` → `src/features/hero/Hero.tsx`

- [ ] **Step 1: Create hero feature directory**

```bash
mkdir -p /home/viniis/portfolio/src/features/hero
```

- [ ] **Step 2: Move Hero.tsx**

```bash
cd /home/viniis/portfolio && mv src/components/Hero.tsx src/features/hero/Hero.tsx
```

- [ ] **Step 3: Update Hero imports**

In `src/features/hero/Hero.tsx`, change:

```typescript
import { Button } from './ui/button'
import { Section } from './ui/Section'
import { SocialLinks } from './ui/social-links'
```

to:

```typescript
import { Section } from '@/shared/ui/Section'
import { SocialLinks } from '@/shared/ui/social-links'
import { CtaButton } from '@/shared/components/CtaButton'
```

- [ ] **Step 4: Refactor Hero to use CtaButton**

In `src/features/hero/Hero.tsx`, replace the CTA button code (lines 28-37 in original) with:

```typescript
<CtaButton
  label={t("hero.cta")}
  icon={<Pointer className="text-primary" />}
  href={`#${t("contact.id")}`}
/>
```

Remove the unused `Button` import.

- [ ] **Step 5: Write hero i18n.ts**

Create `src/features/hero/i18n.ts`:

```typescript
import type { i18n as I18n } from 'i18next'
import heroPt from '@/data/translations/hero/pt-BR.json'
import heroEn from '@/data/translations/hero/en-US.json'

export function mountHeroTranslations(i18n: I18n) {
  i18n.addResourceBundle('pt-BR', 'translation', heroPt, true, true)
  i18n.addResourceBundle('en-US', 'translation', heroEn, true, true)
}
```

- [ ] **Step 6: Write hero barrel export**

Create `src/features/hero/index.ts`:

```typescript
import i18n from '@/i18n'
import { Hero } from './Hero'
import { mountHeroTranslations } from './i18n'

let registered = false
function setup() {
  if (!registered) {
    mountHeroTranslations(i18n)
    registered = true
  }
}

setup()

export { Hero }
```

- [ ] **Step 7: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: Errors about missing Hero import in App.tsx

- [ ] **Step 8: Commit**

```bash
cd /home/viniis/portfolio && git add -A && git commit -m "feat(features): create hero feature"
```

---

### Task 26: Create about feature

**Files:**

- Create: `src/features/about/index.ts`
- Create: `src/features/about/i18n.ts`
- Move: `src/components/About.tsx` → `src/features/about/About.tsx`

- [ ] **Step 1: Create about feature directory**

```bash
mkdir -p /home/viniis/portfolio/src/features/about
```

- [ ] **Step 2: Move About.tsx**

```bash
cd /home/viniis/portfolio && mv src/components/About.tsx src/features/about/About.tsx
```

- [ ] **Step 3: Update About imports**

In `src/features/about/About.tsx`, change:

```typescript
import { Section } from './ui/Section'
import { Button } from './ui/button'
import { SocialLinks } from './ui/social-links'
```

to:

```typescript
import { Section } from '@/shared/ui/Section'
import { SocialLinks } from '@/shared/ui/social-links'
import { CtaButton } from '@/shared/components/CtaButton'
import { getCvForLang } from '@/shared/lib/cv'
```

- [ ] **Step 4: Refactor About to use CtaButton and getCvForLang**

In `src/features/about/About.tsx`:

Remove the `CV_MAP` constant and the `cvUrlPt`/`cvUrlEn` imports.

Replace the `cv` variable line with:

```typescript
const cv = getCvForLang(i18n.language)
```

Replace the CTA button code (lines 32-41 in original) with:

```typescript
<CtaButton
  label={t('about.cvLabel')}
  icon={<Download />}
  href={cv.url}
  download={cv.filename}
/>
```

- [ ] **Step 5: Write about i18n.ts**

Create `src/features/about/i18n.ts`:

```typescript
import type { i18n as I18n } from 'i18next'
import aboutPt from '@/data/translations/about/pt-BR.json'
import aboutEn from '@/data/translations/about/en-US.json'

export function mountAboutTranslations(i18n: I18n) {
  i18n.addResourceBundle('pt-BR', 'translation', aboutPt, true, true)
  i18n.addResourceBundle('en-US', 'translation', aboutEn, true, true)
}
```

- [ ] **Step 6: Write about barrel export**

Create `src/features/about/index.ts`:

```typescript
import i18n from '@/i18n'
import { About } from './About'
import { mountAboutTranslations } from './i18n'

let registered = false
function setup() {
  if (!registered) {
    mountAboutTranslations(i18n)
    registered = true
  }
}

setup()

export { About }
```

- [ ] **Step 7: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: Errors about missing About import in App.tsx

- [ ] **Step 8: Commit**

```bash
cd /home/viniis/portfolio && git add -A && git commit -m "feat(features): create about feature"
```

---

### Task 27: Create skills feature

**Files:**

- Create: `src/features/skills/index.ts`
- Create: `src/features/skills/i18n.ts`
- Move: `src/components/SkillsWrapper.tsx` → `src/features/skills/SkillsWrapper.tsx`

- [ ] **Step 1: Create skills feature directory**

```bash
mkdir -p /home/viniis/portfolio/src/features/skills
```

- [ ] **Step 2: Move SkillsWrapper.tsx**

```bash
cd /home/viniis/portfolio && mv src/components/SkillsWrapper.tsx src/features/skills/SkillsWrapper.tsx
```

- [ ] **Step 3: Update SkillsWrapper imports**

In `src/features/skills/SkillsWrapper.tsx`, change:

```typescript
import { Section } from './ui/Section'
import { Button } from './ui/button'
```

to:

```typescript
import { Section } from '@/shared/ui/Section'
import { Button } from '@/shared/ui/button'
import { SkillList } from '@/shared/components/SkillList'
```

- [ ] **Step 4: Refactor SkillsWrapper to use SkillList**

In `src/features/skills/SkillsWrapper.tsx`, replace the skills list rendering (lines 13-24 in original) with:

```typescript
<SkillList
  skills={t('skills.list', { returnObjects: true }) as string[]}
  renderItem={(skill, variant) => (
    <Button
      variant={variant}
      className="pointer-events-none"
      asChild
    >
      <li className="flex-1">{skill}</li>
    </Button>
  )}
/>
```

- [ ] **Step 5: Write skills i18n.ts**

Create `src/features/skills/i18n.ts`:

```typescript
import type { i18n as I18n } from 'i18next'
import skillsPt from '@/data/translations/skills/pt-BR.json'
import skillsEn from '@/data/translations/skills/en-US.json'

export function mountSkillsTranslations(i18n: I18n) {
  i18n.addResourceBundle('pt-BR', 'translation', skillsPt, true, true)
  i18n.addResourceBundle('en-US', 'translation', skillsEn, true, true)
}
```

- [ ] **Step 6: Write skills barrel export**

Create `src/features/skills/index.ts`:

```typescript
import i18n from '@/i18n'
import { SkillsWrapper } from './SkillsWrapper'
import { mountSkillsTranslations } from './i18n'

let registered = false
function setup() {
  if (!registered) {
    mountSkillsTranslations(i18n)
    registered = true
  }
}

setup()

export { SkillsWrapper }
```

- [ ] **Step 7: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: Errors about missing SkillsWrapper import in App.tsx

- [ ] **Step 8: Commit**

```bash
cd /home/viniis/portfolio && git add -A && git commit -m "feat(features): create skills feature"
```

---

### Task 28: Create experience feature

**Files:**

- Create: `src/features/experience/index.ts`
- Create: `src/features/experience/i18n.ts`
- Create: `src/features/experience/types.ts`
- Create: `src/features/experience/ExperienceItem.tsx`
- Move: `src/components/Experience.tsx` → `src/features/experience/Experience.tsx`

- [ ] **Step 1: Create experience feature directory**

```bash
mkdir -p /home/viniis/portfolio/src/features/experience
```

- [ ] **Step 2: Move Experience.tsx**

```bash
cd /home/viniis/portfolio && mv src/components/Experience.tsx src/features/experience/Experience.tsx
```

- [ ] **Step 3: Write types.ts**

Create `src/features/experience/types.ts`:

```typescript
export type ExperienceType = {
  role: string
  company: string
  period: { start: string; end: string }
  responsibilities: string[]
  skills: string[]
}
```

- [ ] **Step 4: Write ExperienceItem.tsx**

Create `src/features/experience/ExperienceItem.tsx`:

```typescript
import { Separator } from '@/shared/ui/separator';
import { SkillList } from '@/shared/components/SkillList';
import type { ExperienceType } from './types';

interface ExperienceItemProps extends ExperienceType {
  isLast: boolean;
}

export function ExperienceItem({
  company,
  responsibilities,
  period,
  role,
  skills,
  isLast,
}: ExperienceItemProps) {
  return (
    <li className="space-y-4">
      <div>
        <h3 className="text-h4">{company}</h3>
        <h4 className="text-h5">{role}</h4>
        <p>
          {period.start} — {period.end}
        </p>
        <SkillList skills={skills} className="mt-2" />
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
      {!isLast && <Separator />}
    </li>
  );
}
```

- [ ] **Step 5: Update Experience imports**

In `src/features/experience/Experience.tsx`, change:

```typescript
import { Section } from './ui/Section'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
```

to:

```typescript
import { Section } from '@/shared/ui/Section'
import { Button } from '@/shared/ui/button'
import { ExperienceItem } from './ExperienceItem'
import type { ExperienceType } from './types'
```

- [ ] **Step 6: Refactor Experience to use ExperienceItem**

In `src/features/experience/Experience.tsx`:

Remove the inline `ExperienceItem` component definition (lines 17-55 in original).

Remove the `type ExperienceType` definition (lines 9-15 in original).

The render should already use the `ExperienceItem` component.

- [ ] **Step 7: Write experience i18n.ts**

Create `src/features/experience/i18n.ts`:

```typescript
import type { i18n as I18n } from 'i18next'
import experiencePt from '@/data/translations/experience/pt-BR.json'
import experienceEn from '@/data/translations/experience/en-US.json'

export function mountExperienceTranslations(i18n: I18n) {
  i18n.addResourceBundle('pt-BR', 'translation', experiencePt, true, true)
  i18n.addResourceBundle('en-US', 'translation', experienceEn, true, true)
}
```

- [ ] **Step 8: Write experience barrel export**

Create `src/features/experience/index.ts`:

```typescript
import i18n from '@/i18n'
import { Experience } from './Experience'
import { mountExperienceTranslations } from './i18n'

let registered = false
function setup() {
  if (!registered) {
    mountExperienceTranslations(i18n)
    registered = true
  }
}

setup()

export { Experience }
```

- [ ] **Step 9: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: Errors about missing Experience import in App.tsx

- [ ] **Step 10: Commit**

```bash
cd /home/viniis/portfolio && git add -A && git commit -m "feat(features): create experience feature"
```

---

### Task 29: Create projects feature (lazy)

**Files:**

- Create: `src/features/projects/index.ts`
- Create: `src/features/projects/i18n.ts`
- Create: `src/features/projects/types.ts`
- Move: `src/components/Projects.tsx` → `src/features/projects/Projects.tsx`
- Move: `src/components/ProjectCard.tsx` → `src/features/projects/ProjectCard.tsx`

- [ ] **Step 1: Create projects feature directory**

```bash
mkdir -p /home/viniis/portfolio/src/features/projects
```

- [ ] **Step 2: Move Projects.tsx**

```bash
cd /home/viniis/portfolio && mv src/components/Projects.tsx src/features/projects/Projects.tsx
```

- [ ] **Step 3: Move ProjectCard.tsx**

```bash
cd /home/viniis/portfolio && mv src/components/ProjectCard.tsx src/features/projects/ProjectCard.tsx
```

- [ ] **Step 4: Write types.ts**

Create `src/features/projects/types.ts`:

```typescript
export type Project = {
  name: string
  deployUrl: string
  githubUrl: string
  skills: string[]
  description?: string
}
```

- [ ] **Step 5: Update ProjectCard imports**

In `src/features/projects/ProjectCard.tsx`, change:

```typescript
import { Badge } from './ui/badge'
import { Button } from './ui/button'
```

to:

```typescript
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { SkillList } from '@/shared/components/SkillList'
import { useClickOutsideEscape } from '@/shared/hooks/useClickOutsideEscape'
import type { Project } from './types'
```

Remove the `type Project` definition (lines 7-13 in original) and the `export type { Project }` at the bottom.

- [ ] **Step 6: Refactor ProjectCard to use hooks and SkillList**

In `src/features/projects/ProjectCard.tsx`:

Replace the `useEffect` block that manages Esc + click-outside (lines 27-42 in original) with:

```typescript
useClickOutsideEscape({
  active,
  ignoreInside: 'iframe',
  onDismiss: () => setActive(false)
})
```

Replace the skills list rendering (lines 117-123 in original) with:

```typescript
<SkillList skills={skills} />
```

- [ ] **Step 7: Update Projects imports**

In `src/features/projects/Projects.tsx`, change:

```typescript
import { Section } from './ui/Section'
import { Button } from './ui/button'
import { ProjectCard, type Project } from './ProjectCard'
```

to:

```typescript
import { Section } from '@/shared/ui/Section'
import { SectionHeader } from '@/shared/components/SectionHeader'
import { HorizontalCarousel } from '@/shared/components/HorizontalCarousel'
import { ProjectCard } from './ProjectCard'
import type { Project } from './types'
```

- [ ] **Step 8: Refactor Projects to use SectionHeader and HorizontalCarousel**

In `src/features/projects/Projects.tsx`:

Replace the header section (lines 53-58 in original) with:

```typescript
<SectionHeader
  title={t("projects.title")}
  description={t("projects.description")}
/>
```

Remove the carousel implementation (lines 12-47 and 60-93 in original) and replace with:

```typescript
<HorizontalCarousel
  itemKeys={projects.map((p) => p.name)}
  renderItem={(key) => {
    const project = projects.find((p) => p.name === key);
    if (!project) return null;
    return <ProjectCard {...project} />;
  }}
  prevLabel="Previous project"
  nextLabel="Next project"
/>
```

- [ ] **Step 9: Write projects i18n.ts**

Create `src/features/projects/i18n.ts`:

```typescript
import type { i18n as I18n } from 'i18next'
import projectsPt from '@/data/translations/projects/pt-BR.json'
import projectsEn from '@/data/translations/projects/en-US.json'

export function mountProjectsTranslations(i18n: I18n) {
  i18n.addResourceBundle('pt-BR', 'translation', projectsPt, true, true)
  i18n.addResourceBundle('en-US', 'translation', projectsEn, true, true)
}
```

- [ ] **Step 10: Write projects barrel export**

Create `src/features/projects/index.ts`:

```typescript
import i18n from '@/i18n'
import { Projects } from './Projects'
import { mountProjectsTranslations } from './i18n'

let registered = false
function setup() {
  if (!registered) {
    mountProjectsTranslations(i18n)
    registered = true
  }
}

setup()

export { Projects }
```

- [ ] **Step 11: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: Errors about missing Projects import in App.tsx

- [ ] **Step 12: Commit**

```bash
cd /home/viniis/portfolio && git add -A && git commit -m "feat(features): create projects feature"
```

---

### Task 30: Create contact feature (lazy)

**Files:**

- Create: `src/features/contact/index.ts`
- Create: `src/features/contact/i18n.ts`
- Move: `src/components/Contact.tsx` → `src/features/contact/Contact.tsx`
- Move: `src/components/ContactForm.tsx` → `src/features/contact/ContactForm.tsx`

- [ ] **Step 1: Create contact feature directory**

```bash
mkdir -p /home/viniis/portfolio/src/features/contact
```

- [ ] **Step 2: Move Contact.tsx**

```bash
cd /home/viniis/portfolio && mv src/components/Contact.tsx src/features/contact/Contact.tsx
```

- [ ] **Step 3: Move ContactForm.tsx**

```bash
cd /home/viniis/portfolio && mv src/components/ContactForm.tsx src/features/contact/ContactForm.tsx
```

- [ ] **Step 4: Update ContactForm imports**

In `src/features/contact/ContactForm.tsx`, change all relative `./ui/` imports to `@/shared/ui/`:

```typescript
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Separator } from '@/shared/ui/separator'
import { LoadingButton } from '@/shared/ui/loading-button'
```

The imports to `@/shared/lib/service` and `@/shared/lib/schemas` should already be correct from Task 3.

- [ ] **Step 5: Update Contact imports**

In `src/features/contact/Contact.tsx`, change:

```typescript
import { Section } from './ui/Section'
import { SocialLinks } from './ui/social-links'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'
```

to:

```typescript
import { Section } from '@/shared/ui/Section'
import { SocialLinks } from '@/shared/ui/social-links'
import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/ui/spinner'
import { getCvForLang } from '@/shared/lib/cv'
```

- [ ] **Step 6: Refactor Contact to use getCvForLang**

In `src/features/contact/Contact.tsx`:

Remove the `CV_MAP` constant and the `cvUrlPt`/`cvUrlEn` imports.

Replace the `cv` variable line with:

```typescript
const cv = getCvForLang(i18n.language)
```

- [ ] **Step 7: Update Contact lazy import**

In `src/features/contact/Contact.tsx`, change the lazy import:

```typescript
const ContactForm = lazy(async () => {
  const module = await import('./ContactForm')
  return {
    default: module.ContactForm
  }
})
```

to:

```typescript
const ContactForm = lazy(() =>
  import('./ContactForm').then((m) => ({ default: m.ContactForm }))
)
```

- [ ] **Step 8: Write contact i18n.ts**

Create `src/features/contact/i18n.ts`:

```typescript
import type { i18n as I18n } from 'i18next'
import contactPt from '@/data/translations/contact/pt-BR.json'
import contactEn from '@/data/translations/contact/en-US.json'
import uiPt from '@/data/translations/ui/pt-BR.json'
import uiEn from '@/data/translations/ui/en-US.json'

export function mountContactTranslations(i18n: I18n) {
  i18n.addResourceBundle('pt-BR', 'translation', contactPt, true, true)
  i18n.addResourceBundle('en-US', 'translation', contactEn, true, true)
  i18n.addResourceBundle('pt-BR', 'translation', uiPt, true, true)
  i18n.addResourceBundle('en-US', 'translation', uiEn, true, true)
}
```

- [ ] **Step 9: Write contact barrel export**

Create `src/features/contact/index.ts`:

```typescript
import i18n from '@/i18n'
import { Contact } from './Contact'
import { mountContactTranslations } from './i18n'

let registered = false
function setup() {
  if (!registered) {
    mountContactTranslations(i18n)
    registered = true
  }
}

setup()

export { Contact }
```

- [ ] **Step 10: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: Errors about missing Contact import in App.tsx

- [ ] **Step 11: Commit**

```bash
cd /home/viniis/portfolio && git add -A && git commit -m "feat(features): create contact feature"
```

---

## Phase 7: Wire Everything Together

### Task 31: Update i18n.ts to only load header eagerly

**Files:**

- Modify: `src/i18n.ts`

- [ ] **Step 1: Rewrite i18n.ts**

Replace the entire content of `src/i18n.ts` with:

```typescript
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import headerPt from '@/data/translations/header/pt-BR.json'
import headerEn from '@/data/translations/header/en-US.json'
import linksPt from '@/data/translations/links/pt-BR.json'
import linksEn from '@/data/translations/links/en-US.json'

const headerAndLinksPt = { ...headerPt, links: linksPt.links }
const headerAndLinksEn = { ...headerEn, links: linksEn.links }

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': { translation: headerAndLinksPt },
      'en-US': { translation: headerAndLinksEn }
    },
    fallbackLng: 'en-US',
    interpolation: { escapeValue: false },
    detection: {
      order: ['navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
      convertDetectedLanguage: (lng: string) =>
        lng.startsWith('pt') ? 'pt-BR' : 'en-US'
    }
  })

export default i18n
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: Errors about missing imports in App.tsx

- [ ] **Step 3: Commit**

```bash
cd /home/viniis/portfolio && git add src/i18n.ts && git commit -m "refactor(i18n): only load header and links eagerly"
```

---

### Task 32: Update App.tsx with lazy loading

**Files:**

- Modify: `src/App.tsx`

- [ ] **Step 1: Rewrite App.tsx**

Replace the entire content of `src/App.tsx` with:

```typescript
import { lazy, Suspense } from 'react';
import { Header } from '@/features/header';
import { Hero } from '@/features/hero';
import { About } from '@/features/about';
import { SkillsWrapper } from '@/features/skills';
import { Experience } from '@/features/experience';
import { Separator } from '@/shared/ui/separator';
import { Toaster } from '@/shared/ui/sonner';
import { SectionLoading } from '@/shared/components/SectionLoading';
import { useDocumentMeta } from '@/shared/hooks/useDocumentMeta';

const Projects = lazy(() =>
  import('@/features/projects').then((m) => ({ default: m.Projects })),
);
const Contact = lazy(() =>
  import('@/features/contact').then((m) => ({ default: m.Contact })),
);

function App() {
  useDocumentMeta();

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
  );
}

export default App;
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /home/viniis/portfolio && git add src/App.tsx && git commit -m "feat(app): wire lazy loading with Suspense boundaries"
```

---

### Task 33: Remove old components directory

**Files:**

- Delete: `src/components/` (should be empty or only have useDocumentLang.ts left)

- [ ] **Step 1: Check what remains**

```bash
ls /home/viniis/portfolio/src/components/
```

Expected: Either empty or only `useDocumentLang.ts`

- [ ] **Step 2: Remove useDocumentLang if it exists**

```bash
rm -f /home/viniis/portfolio/src/components/useDocumentLang.ts
```

- [ ] **Step 3: Remove components directory**

```bash
rmdir /home/viniis/portfolio/src/components/
```

- [ ] **Step 4: Commit**

```bash
cd /home/viniis/portfolio && git add -A && git commit -m "refactor: remove old components directory"
```

---

### Task 34: Remove old translation files

**Files:**

- Delete: All `src/data/translations/*.json` files (not directories)

- [ ] **Step 1: List old translation files**

```bash
ls /home/viniis/portfolio/src/data/translations/*.json
```

Expected: List of about.json, contact.json, experience.json, header.json, hero.json, links.json, projects.json, skills.json, ui.json

- [ ] **Step 2: Remove old translation files**

```bash
cd /home/viniis/portfolio && rm src/data/translations/*.json
```

- [ ] **Step 3: Commit**

```bash
cd /home/viniis/portfolio && git add -A && git commit -m "refactor(i18n): remove old translation files"
```

---

### Task 35: Move data/types.ts to shared

**Files:**

- Move: `src/data/types.ts` → `src/shared/types.ts` (if exists)

- [ ] **Step 1: Check if data/types.ts exists**

```bash
ls /home/viniis/portfolio/src/data/types.ts
```

Expected: File exists or not found

- [ ] **Step 2: If exists, move to shared**

```bash
cd /home/viniis/portfolio && mv src/data/types.ts src/shared/types.ts 2>/dev/null || echo "types.ts not found, skipping"
```

- [ ] **Step 3: Update imports if file was moved**

Search for any imports of `@/data/types` and change to `@/shared/types`.

In `src/shared/ui/social-links.tsx`, if it imports from `@/data/types`, change to:

```typescript
import type { SocialLinkItem } from '@/shared/types'
```

- [ ] **Step 4: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 5: Commit if changes were made**

```bash
cd /home/viniis/portfolio && git add -A && git commit -m "refactor: move types to shared" || echo "No changes to commit"
```

---

## Phase 8: Final Verification

### Task 36: Run full build and verification

**Files:**

- None (verification only)

- [ ] **Step 1: Run lint**

```bash
cd /home/viniis/portfolio && pnpm lint
```

Expected: No errors or warnings

- [ ] **Step 2: Run TypeScript check**

```bash
cd /home/viniis/portfolio && pnpm exec tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Run production build**

```bash
cd /home/viniis/portfolio && pnpm build
```

Expected: Build succeeds

- [ ] **Step 4: Check bundle output**

```bash
cd /home/viniis/portfolio && ls -lh dist/assets/*.js
```

Expected: Multiple JS files including lazy chunks (projects-_.js, contact-_.js)

- [ ] **Step 5: Start dev server**

```bash
cd /home/viniis/portfolio && pnpm dev
```

- [ ] **Step 6: Manual smoke tests**

Open http://localhost:5173 in browser and verify:

1. Header renders with navigation links
2. Hero section shows with CTA button
3. About section shows with CV download button
4. Skills section shows
5. Experience section shows with skills badges
6. Projects section shows skeleton briefly then loads carousel
7. Contact section shows skeleton briefly then loads form
8. Language switching works (all sections update)
9. ProjectCard overlay closes on Escape
10. Mobile menu locks body scroll when open

Press Ctrl+C to stop dev server.

- [ ] **Step 7: Final commit**

```bash
cd /home/viniis/portfolio && git add -A && git commit -m "refactor: code splitting and reusability complete" || echo "Nothing to commit"
```

---

## Completion Checklist

- [ ] All shared utilities created and used
- [ ] All shared hooks created and used
- [ ] All shared components created and used
- [ ] All UI primitives moved to shared/ui
- [ ] All translation files split by language
- [ ] All features created with barrel exports and i18n
- [ ] Projects and Contact are lazy loaded with Suspense
- [ ] i18n only loads header eagerly
- [ ] App.tsx wired correctly
- [ ] Old components directory removed
- [ ] Old translation files removed
- [ ] Build succeeds with multiple chunks
- [ ] Lint passes
- [ ] TypeScript passes
- [ ] Manual smoke tests pass
- [ ] All changes committed

---

## Success Criteria

1. `pnpm build` creates separate chunks for projects and contact
2. `pnpm lint` passes without warnings
3. `pnpm exec tsc --noEmit` passes without errors
4. Dev server shows all sections rendering correctly
5. Language switching updates all content immediately
6. Projects section shows skeleton then loads
7. Contact section shows skeleton then loads
8. No visual regressions compared to main branch
9. CV download works with correct filenames per language
10. ProjectCard overlay dismissal works (Esc + click-outside)
11. Header mobile menu body scroll lock works
