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

## Features

- Responsive design with mobile-first approach
- Dark/Light theme toggle
- Smooth animations with tw-animate-css
- Contact form with validation
- Downloadable CV
- SEO optimized

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
├── assets/           # Images, icons, CV
├── css/              # Global styles
├── lib/              # Utility functions
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
