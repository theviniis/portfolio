# Code Splitting & Reusability Refactor — Design

## Goal

Reduce the initial JavaScript bundle of the portfolio site and increase component reusability by:

1. Splitting the two heaviest sections (`Projects`, `Contact`) into lazy chunks.
2. Extracting duplicated UI patterns into shared components and hooks.
3. Reorganizing the source tree into feature folders with explicit boundaries.
4. Loading i18n namespaces on demand (per feature) instead of bundling all translations eagerly.

The site is a single-page portfolio (`App.tsx` mounts 8 sections in order: `Header`, `Hero`, `About`, `SkillsWrapper`, `Experience`, `Projects`, `Contact`, plus `Toaster`).

## Non-Goals

- No behavioral or visual redesign.
- No new features, copy changes, or copy restructuring.
- No migration to a different state management, routing, or build tool.
- Sections other than `Projects` and `Contact` remain eager.
- Translations for the detected language stay bundled inside each chunk; we are not splitting PT vs EN as separate runtime downloads.

## Current State (audit)

Code that already touches the goal areas:

- `src/components/Contact.tsx:11` — already `lazy()`-imports `ContactForm.tsx`. We will keep that and extend the same pattern to the whole `Contact` section.
- `src/components/About.tsx:10-13` and `src/components/Contact.tsx:18-21` — `CV_MAP` is duplicated.
- `src/components/ProjectCard.tsx:120`, `src/components/Experience.tsx:36`, `src/components/SkillsWrapper.tsx:17` — the rule `index > 2 ? "outline" : "default"` is repeated three times.
- `src/components/Hero.tsx:28-37` and `src/components/About.tsx:32-41` — same "large button with embedded secondary icon button" CTA pattern.
- `src/components/Projects.tsx:12-47` — horizontal carousel with edge detection and prev/next buttons lives inline.
- `src/components/ProjectCard.tsx:27-42` — `Esc` + `mousedown` overlay dismissal is inlined.
- `src/components/Header.tsx:31-41` — `document.body.style.overflow` toggling is inlined.
- `src/hooks/useDocumentLang.ts` — mixes SEO meta updates with `html[lang]` sync.
- `src/i18n.ts:5-13` — imports all translation JSONs eagerly.

## Architecture

### Folder structure

```
src/
├── App.tsx
├── main.tsx
├── i18n.ts                              # init only; no static resources
├── features/
│   ├── header/                          # eager
│   │   ├── index.ts                     # barrel
│   │   ├── Header.tsx
│   │   ├── Logo.tsx
│   │   └── i18n.ts
│   ├── hero/                            # eager
│   │   ├── index.ts
│   │   ├── Hero.tsx
│   │   └── i18n.ts
│   ├── about/                           # eager
│   │   ├── index.ts
│   │   ├── About.tsx
│   │   └── i18n.ts
│   ├── skills/                          # eager
│   │   ├── index.ts
│   │   ├── SkillsWrapper.tsx
│   │   └── i18n.ts
│   ├── experience/                      # eager
│   │   ├── index.ts
│   │   ├── Experience.tsx
│   │   ├── ExperienceItem.tsx
│   │   ├── types.ts
│   │   └── i18n.ts
│   ├── projects/                        # LAZY
│   │   ├── index.ts
│   │   ├── Projects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── types.ts
│   │   ├── carousel/
│   │   │   ├── HorizontalCarousel.tsx
│   │   │   └── useCarouselScroll.ts
│   │   └── i18n.ts
│   └── contact/                         # LAZY
│       ├── index.ts
│       ├── Contact.tsx
│       ├── ContactForm.tsx
│       └── i18n.ts
├── shared/
│   ├── ui/                              # shadcn primitives + Section + Separator + sonner
│   ├── components/
│   │   ├── SectionHeader.tsx
│   │   ├── SkillList.tsx
│   │   ├── CtaButton.tsx
│   │   └── SectionLoading.tsx
│   ├── hooks/
│   │   ├── useClickOutsideEscape.ts
│   │   ├── useBodyScrollLock.ts
│   │   └── useDocumentMeta.ts
│   └── lib/
│       ├── utils.ts
│       ├── schemas.ts
│       ├── service.ts
│       └── cv.ts                        # CV_MAP + getCvForLang
├── data/
│   ├── translations/
│   │   ├── header/{pt-BR,en-US}.json
│   │   ├── hero/{pt-BR,en-US}.json
│   │   ├── about/{pt-BR,en-US}.json
│   │   ├── skills/{pt-BR,en-US}.json
│   │   ├── experience/{pt-BR,en-US}.json
│   │   ├── projects/{pt-BR,en-US}.json
│   │   ├── contact/{pt-BR,en-US}.json
│   │   ├── ui/{pt-BR,en-US}.json
│   │   └── links/{pt-BR,en-US}.json
│   └── types.ts
└── assets/
```

### Lazy loading boundaries

Only `Projects` and `Contact` are lazy. The remaining sections appear above the fold or have no meaningful bundle weight, so the cost of `Suspense` and skeleton would outweigh the benefit.

`App.tsx` wires the lazy boundary:

```tsx
import { lazy, Suspense } from 'react';
import { Header } from '@/features/header';
import { Hero } from '@/features/hero';
import { About } from '@/features/about';
import { SkillsWrapper } from '@/features/skills';
import { Experience } from '@/features/experience';
import { Separator } from '@/shared/ui/separator';
import { SectionLoading } from '@/shared/components/SectionLoading';
import { Toaster } from '@/shared/ui/sonner';
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
```

`Separators` stay outside the `Suspense` so the visual rhythm of the page persists during chunk load.

### Skeleton fallback

Install the shadcn primitive:

```
pnpm dlx shadcn@latest add skeleton
```

That writes `src/shared/ui/skeleton.tsx`. `SectionLoading` reuses it:

```tsx
// shared/components/SectionLoading.tsx
import { Section } from '@/shared/ui/Section';
import { Skeleton } from '@/shared/ui/skeleton';

interface SectionLoadingProps {
  variant: 'projects' | 'contact';
}

export function SectionLoading({ variant }: SectionLoadingProps) {
  return (
    <Section>
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
    </Section>
  );
}
```

The skeleton mirrors the real layout to avoid CLS while the chunk resolves.

### i18n lazy loading

Each translation file becomes one JSON per (section, language). The global `i18n.ts` only registers `header` eagerly because the header is in the first paint and needs its items rendered immediately.

```ts
// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import headerPt from '@/data/translations/header/pt-BR.json';
import headerEn from '@/data/translations/header/en-US.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': { translation: headerPt },
      'en-US': { translation: headerEn },
    },
    fallbackLng: 'en-US',
    interpolation: { escapeValue: false },
    detection: {
      order: ['navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
      convertDetectedLanguage: (lng: string) =>
        lng.startsWith('pt') ? 'pt-BR' : 'en-US',
    },
  });

export default i18n;
```

Each feature exports an `i18n.ts` with a `mount*Translations()` function and a `registered` guard. The barrel calls `mount*Translations()` at module evaluation time so registration happens before the component's first render.

```ts
// features/projects/i18n.ts
import type { i18n as I18n } from 'i18next';
import projectsPt from '@/data/translations/projects/pt-BR.json';
import projectsEn from '@/data/translations/projects/en-US.json';

export function mountProjectsTranslations(i18n: I18n) {
  i18n.addResourceBundle('pt-BR', 'translation', projectsPt, true, true);
  i18n.addResourceBundle('en-US', 'translation', projectsEn, true, true);
}
```

```ts
// features/projects/index.ts
import i18n from '@/i18n';
import { Projects } from './Projects';
import { mountProjectsTranslations } from './i18n';

let registered = false;
function setup() {
  if (!registered) {
    mountProjectsTranslations(i18n);
    registered = true;
  }
}

setup();

export { Projects };
```

Eager features follow the same pattern but execute synchronously on import (no `lazy()` indirection).

### Reusable components and hooks

All live under `src/shared/`. They have no feature-specific imports.

**`shared/components/CtaButton.tsx`** — large primary button with an embedded secondary icon button, used by `Hero` (pointer icon) and `About` (download icon). Props: `label`, `icon`, `href?`, `download?`, plus standard `ButtonProps` minus `size`.

**`shared/components/SkillList.tsx`** — renders a list of skills with the `index > primaryCount - 1 ? "outline" : "default"` rule. Props: `skills: string[]`, `primaryCount = 3`, optional `renderItem(skill, variant)` for callers that want `Button` instead of `Badge`. Used by `ProjectCard`, `Experience`, `SkillsWrapper`.

**`shared/components/SectionHeader.tsx`** — `h2` + optional muted description. Used by `Projects` today; available to other sections when convenient.

**`shared/components/HorizontalCarousel.tsx` + `shared/hooks/useCarouselScroll.ts`** — extracts the carousel logic from `Projects.tsx:12-47`. Generic over the rendered items via a `renderItem(key)` callback and a list of stable keys. `useCarouselScroll` returns `{ canScrollPrev, canScrollNext, scrollPrev, scrollNext }`.

**`shared/components/SectionLoading.tsx`** — see above.

**`shared/hooks/useBodyScrollLock.ts(locked: boolean)`** — sets `document.body.style.overflow` to `'hidden'` while `locked` is true and restores the previous value on cleanup. Used by `Header` (mobile menu open).

**`shared/hooks/useClickOutsideEscape.ts({ active, ignoreInside?, onDismiss })`** — attaches `keydown` (Esc) and `mousedown` listeners while `active`. `ignoreInside` lets callers exclude an element subtree (e.g., the iframe inside `ProjectCard`).

**`shared/hooks/useDocumentMeta.ts`** — replaces `useDocumentLang`. Syncs `html[lang]`, `document.title`, and `meta[name="description"]` to the active i18n language.

**`shared/lib/cv.ts`** — single source of truth for `CV_MAP` plus a `getCvForLang(lang)` helper. Removes the duplication between `About` and `Contact`.

**`shared/lib/{utils,schemas,service}.ts`** — moved as-is from `src/lib/`.

### Data flow

1. Browser loads `index.html` → `main.tsx` → `App.tsx`.
2. `i18n.ts` initializes with `header` translations only.
3. `App.tsx` synchronously renders `Header`, `Hero`, `About`, `SkillsWrapper`, `Experience`. Their feature barrels register their translations during module evaluation, so `useTranslation()` resolves immediately on mount.
4. `Suspense` placeholders render `SectionLoading` until `Projects` and `Contact` chunks arrive.
5. When each lazy module executes, its barrel calls `mount*Translations(i18n)` exactly once and exports the section component. React resolves the Suspense boundary and the section mounts with full translations.
6. Language switch updates the i18n instance; components re-render with new strings. Resource bundles are already loaded for all visible features, so no extra fetch is required.

### Error handling

- No new error states are introduced. Existing `ContactForm` already surfaces submission errors via `sonner`'s `Toaster`.
- If a lazy chunk fails to load (network error), React shows the closest error boundary. The app currently has no boundary; we accept this and leave error boundaries out of scope for this refactor.
- `mount*Translations` is idempotent via the `registered` flag and safe to call multiple times (it does nothing after the first call).

## Testing

Manual smoke tests only (no test framework configured in `package.json`):

1. `pnpm lint` — passes.
2. `pnpm build` — passes with TypeScript strict mode.
3. `pnpm dev` — open in browser and verify:
   - First paint shows Header + Hero with PT or EN correctly.
   - Scroll down — `Projects` shows skeleton briefly, then carousel works (prev/next disabled at edges).
   - `ProjectCard` overlay closes on Esc and on outside click (not on iframe click).
   - `Contact` form loads with skeleton then mounts; submission still works; CV download picks the correct filename per language.
   - Header mobile menu opens with body scroll locked; resizing to desktop closes the menu.
   - Switching language updates titles, descriptions, and `html[lang]`.

## Migration order

Each step must end with the app still working.

1. Create `shared/lib/cv.ts`. Replace duplicated `CV_MAP` in `About.tsx` and `Contact.tsx`.
2. Create `shared/hooks/useDocumentMeta.ts`, `useBodyScrollLock.ts`, `useClickOutsideEscape.ts`. Replace inline equivalents in `Header.tsx`, `ProjectCard.tsx`.
3. Create `shared/components/SectionHeader.tsx`, `SkillList.tsx`, `CtaButton.tsx`. Replace inline equivalents in `Hero.tsx`, `About.tsx`, `SkillsWrapper.tsx`, `Experience.tsx`, `ProjectCard.tsx`.
4. Create `shared/components/HorizontalCarousel.tsx` + `shared/hooks/useCarouselScroll.ts`. Refactor `Projects.tsx`.
5. Install shadcn skeleton and create `shared/components/SectionLoading.tsx`.
6. Reorganize: move `src/components/*` into `src/features/{header,hero,about,skills,experience,projects,contact}/`. Add `index.ts` barrels and `i18n.ts` per feature.
7. Split `src/data/translations/{section}.json` into `{pt-BR,en-US}.json` per section.
8. Slim down `src/i18n.ts` to register only header eagerly. Wire eager feature barrels to register their own namespaces at module evaluation.
9. In `App.tsx`, wrap `Projects` and `Contact` in `lazy()` + `Suspense` with `SectionLoading` fallback.
10. Run final verification (`pnpm lint && pnpm build`).

## Acceptance criteria

- `pnpm lint` and `pnpm build` both succeed.
- Build output contains at least two lazy chunks named `projects-*.js` and `contact-*.js` separate from the main entry.
- Switching language between PT/EN updates all sections, including `Projects` and `Contact`, without a page reload.
- No visual regression vs. current `main` branch.
- `useDocumentMeta` syncs `html[lang]`, `document.title`, and the description meta tag.
- `ProjectCard` overlay dismissal behavior (Esc + click-outside with iframe carve-out) is preserved.
- Header mobile menu still locks body scroll and closes on resize.
- `CVMap` is defined exactly once and is the source of truth for both `About` and `Contact`.

## Risks

- **Initial flicker on lazy sections.** Mitigated by per-section `SectionLoading` skeleton that matches the real layout.
- **Barrel export cycles.** Mitigated by keeping logic in internal files; barrels only re-export.
- **Double registration of i18n resources.** Mitigated by the per-feature `registered` flag.
- **`?url` asset imports from lazy modules.** Vite resolves at build time, but the asset stays in the chunk that imports it; both `cv.docx` files will move into whichever feature first references them. Acceptable.
- **shadcn CLI regeneration overwriting custom primitives.** We are only adding `skeleton`, not modifying existing primitives.
