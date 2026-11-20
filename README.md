# Vinicius Costa - Portfolio

Personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui (in `src/shared/ui/`)
- **Forms**: React Hook Form + Zod (schemas in `src/shared/lib/schemas.ts`)
- **Icons**: Lucide React
- **Theme**: shadcn tokens + prefers-color-scheme
- **Internationalization**: react-i18next with automatic language detection

## Features

- Responsive design with mobile-first approach
- Light/dark colors following the browser and operating system
- Motion animations with reduced-motion support, hero flip and orbit effects, draggable polaroid
- Direct contact links (LinkedIn, email, GitHub and WhatsApp)
- Downloadable CV (different versions for pt-BR and en-US)
- SEO optimized
- Automatic language detection (pt-BR / en-US)
- Iframe previews loaded on first visibility with react-intersection-observer and kept mounted afterward

## Adding a New Social Link

1. Add the SVG icon to `src/assets/` using kebab-case naming (e.g., `twitter.svg`)
2. Import it in `src/shared/lib/social-icons.tsx` and add to the icon map
3. Add the link data to `src/data/translations/links/en-US.json`:
   ```json
   {
     "url": "https://...",
     "name": "Twitter",
     "ariaLabel": "Twitter profile",
     "iconName": "twitter"
   }
   ```
4. Add the same entry to `src/data/translations/links/pt-BR.json`

## Internationalization (i18n)

The portfolio supports two languages with automatic detection based on browser settings:

- **Portuguese (pt-BR)**: Selected automatically for Portuguese browser locales
- **English (en-US)**: Selected for other browser locales and used as fallback

### How it works

- Uses `i18next-browser-languagedetector` to detect browser language
- Translation files are per-section in `src/data/translations/{section}/{pt-BR,en-US}.json`
- The shared portfolio copy, header and links load with i18n; section entry points register their existing data bundles
- All components use the `useTranslation` hook
- CV downloads are language-specific
- SEO meta tags update dynamically

### Adding a new section

1. Create `src/data/translations/{section}/pt-BR.json` and `en-US.json`
2. Create `src/features/{section}/i18n.ts` with a `mount*Translations()` function
3. Register translations in that function using `i18n.addResourceBundle()`

### Adding a new language

1. Add `{locale}.json` files in each existing section folder under `src/data/translations/`
2. Register the new locale in `src/i18n.ts` via the `i18next` init options

## Project Structure

```
src/
├── features/
│   ├── header/        # Navigation header + Logo
│   ├── hero/          # Landing section
│   ├── about/         # About me section
│   ├── skills/        # Skills showcase
│   ├── experience/    # Work experience
│   ├── projects/      # Stacked project cards and visible iframe previews
│   ├── contact/       # Contact links and animated typing indicator
│   └── footer/        # Full-width footer band
├── shared/
│   ├── components/    # CtaButton, SkillList, SectionHeader, HorizontalCarousel, SectionLoading
│   ├── hooks/         # useDocumentMeta, useBodyScrollLock, useClickOutsideEscape, useCarouselScroll
│   ├── lib/           # utils, schemas, service, cv, social-icons
│   ├── ui/            # shadcn/ui primitives (button, skeleton, input, etc.)
│   └── types.ts
├── data/
│   └── translations/  # {section}/{pt-BR,en-US}.json
├── assets/            # Images, icons, CV files
├── css/               # Global styles
├── i18n.ts            # i18next init (header + links only)
├── App.tsx            # Lazy loading with React.lazy + Suspense
└── main.tsx           # Entry point
```

## UI composition

Shared identity and contact URLs live in `src/data/profile.ts`.

`App.tsx` only composes the page and coordinates initial scrolling. Each section lives in its existing `features/` folder; local interactions stay with the section that owns them.

- `RevealSection` provides the initial fade-up. `SectionHeading` preserves shared heading typography.
- `ExpandableList<T>` receives items, labels and a render function and shares animated height and the right-aligned toggle between projects and experience.
- `AnimatedAction` composes shadcn `Button` with Motion. `TechnologyTags` composes the existing `SkillList` and shadcn `Badge`; previews use shadcn `Skeleton`.
- Hero stickers, the flipping portrait, orbit halo, polaroid and typing indicator are feature components with explicit props.
- Layout, responsive rules and decoration use Tailwind utilities. `style.css` only defines shadcn theme tokens, document defaults and the legacy shared wrapper utility. There is no separate redesign stylesheet.
- Approved page copy is stored in `data/translations/portfolio/`; project and experience data retain their section translation files. Language detection remains automatic.

## Preview loading

`ProjectPreview` mounts an iframe when its preview first enters the viewport and keeps it mounted when scrolling away, keeps its dimensions while loading, and shows shadcn skeleton blocks on an opaque background. Interaction is opt-in and can be stopped with the exit button, Escape or an outside click.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linting
pnpm lint

# Format code with Prettier
pnpm format

# Type check
pnpm exec tsc --noEmit -p tsconfig.app.json
```

## Lighthouse

Start `pnpm audit:serve` (or `npm run audit:serve`) to build and serve the production
bundle at **http://127.0.0.1:4173**. Open that address in Chrome to use the DevTools
Lighthouse panel. Port **5173** runs the development server, with React development
code, HMR and unminified modules; its scores do not represent the production build.
Do not stop your development server to run the audit: the two use separate ports.

With Chrome installed, the CLI can also audit the running production preview from
a separate terminal:

```bash
npx lighthouse@13.6.0 http://127.0.0.1:4173 --chrome-flags="--headless=new" --only-categories=performance,accessibility,best-practices,seo --output=html --output=json --output-path=./lighthouse-mobile.local
npx lighthouse@13.6.0 http://127.0.0.1:4173 --chrome-flags="--headless=new" --preset=desktop --only-categories=performance,accessibility,best-practices,seo --output=html --output=json --output-path=./lighthouse-desktop.local
```

Lighthouse scores vary with machine load, network conditions and the system color
scheme. Project previews load after the first scroll and their first visibility;
desktop drag features load near the About section. The original portrait remains
in `src/assets/profile.webp`; responsive derivatives use 240px, 320px and 480px widths.

## License

MIT
