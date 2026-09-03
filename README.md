# Vinicius Costa - Portfolio

Personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod
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

## Adding a New Social Link

1. Add the SVG icon to `src/assets/social/` using kebab-case naming (e.g., `twitter.svg`)
2. Add the link data to `src/data/translations/links/en-US.json`:
   ```json
   { "url": "https://...", "name": "Twitter", "ariaLabel": "Twitter profile", "iconName": "twitter" }
   ```
3. Add the same entry to `src/data/translations/links/pt-BR.json`

The `iconName` must match the SVG filename converted to camelCase (e.g., `git-hub.svg` → `gitHub`).

## Internationalization (i18n)

The portfolio supports two languages with automatic detection based on browser settings:

- **Portuguese (pt-BR)**: Default fallback language
- **English (en-US)**: Detected automatically

### How it works

- Uses `i18next-browser-languagedetector` to detect browser language
- Translation files are in `src/data/pt-BR/` and `src/data/en/`
- All components use the `useTranslation` hook
- CV downloads are language-specific
- SEO meta tags update dynamically

### Adding a new language

1. Create a new folder in `src/data/` (e.g., `es/`)
2. Add `translation.json` with the same structure as existing files
3. Update `src/i18n.ts` to include the new language
4. Update `src/hooks/useDocumentLang.ts` with SEO data

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (shadcn/ui)
│   ├── Hero.tsx      # Landing section
│   ├── About.tsx     # About me section
│   ├── Experience.tsx # Work experience
│   ├── SkillsWrapper.tsx # Skills showcase
│   ├── Contact.tsx   # Contact form
│   ├── Header.tsx    # Navigation header
│   └── Logo.tsx      # Logo component
├── data/
│   ├── pt-BR/        # Portuguese translations
│   └── en/           # English translations
├── hooks/
│   └── useDocumentLang.ts  # Dynamic language updates
├── assets/           # Images, icons, CV files
├── css/              # Global styles
├── lib/              # Utility functions
├── i18n.ts           # i18next configuration
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

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
```

## License

MIT
