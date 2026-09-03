# Vinicius Costa - Portfolio

Personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui (in `src/shared/ui/`)
- **Forms**: React Hook Form + Zod (schemas in `src/shared/lib/schemas.ts`)
- **Icons**: Lucide React
- **Theme**: next-themes (dark/light mode)
- **Internationalization**: react-i18next with automatic language detection

## Features

- Responsive design with mobile-first approach
- Dark/Light theme toggle
- Smooth animations with tw-animate-css
- Contact form with validation
- Downloadable CV (different versions for pt-BR and en-US)
- SEO optimized
- Automatic language detection (pt-BR / en-US)
- Code-split bundle with lazy-loaded sections

## Adding a New Social Link

1. Add the SVG icon to `src/assets/` using kebab-case naming (e.g., `twitter.svg`)
2. Import it in `src/shared/lib/social-icons.tsx` and add to the icon map
3. Add the link data to `src/data/translations/links/en-US.json`:
   ```json
   { "url": "https://...", "name": "Twitter", "ariaLabel": "Twitter profile", "iconName": "twitter" }
   ```
4. Add the same entry to `src/data/translations/links/pt-BR.json`

## Internationalization (i18n)

The portfolio supports two languages with automatic detection based on browser settings:

- **Portuguese (pt-BR)**: Default fallback language
- **English (en-US)**: Detected automatically

### How it works

- Uses `i18next-browser-languagedetector` to detect browser language
- Translation files are per-section in `src/data/translations/{section}/{pt-BR,en-US}.json`
- Only `header` and `links` translations are loaded eagerly; all others load on demand
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
│   ├── projects/      # Project cards (lazy-loaded)
│   └── contact/       # Contact form (lazy-loaded)
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

## Lazy Loading

Heavy sections (`Projects` and `Contact`) are lazy-loaded via `React.lazy()`. Translations for lazy sections load on demand when the chunk mounts, keeping the initial bundle small.

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

# Type check
pnpm exec tsc --noEmit -p tsconfig.app.json
```

## License

MIT
