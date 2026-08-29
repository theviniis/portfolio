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
- **CMS**: Strapi v5 (Headless CMS)

## Features

- Responsive design with mobile-first approach
- Dark/Light theme toggle
- Smooth animations with tw-animate-css
- Contact form with validation
- Downloadable CV
- SEO optimized

## Project Structure

```
portfolio/
├── docker-compose.yml          # Docker orchestration (Strapi + Portfolio)
├── Dockerfile.portfolio        # Portfolio Docker build
├── nginx.conf                  # Nginx config for SPA routing
├── strapi/                     # Strapi CMS project
│   ├── src/api/               # Content types (Profile, Skill, Experience, SocialLink)
│   ├── src/index.ts           # Seed script
│   └── config/                # Strapi configuration
└── src/
    ├── components/
    │   ├── ui/                # Reusable UI components (shadcn/ui)
    │   ├── Hero.tsx           # Landing section
    │   ├── About.tsx          # About me section
    │   ├── Experience.tsx     # Work experience
    │   ├── SkillsWrapper.tsx  # Skills showcase
    │   ├── Contact.tsx        # Contact form
    │   ├── Header.tsx         # Navigation header
    │   └── Logo.tsx           # Logo component
    ├── lib/
    │   ├── strapi.ts          # Strapi API fetch service
    │   ├── use-strapi.ts      # React hooks for data fetching
    │   └── utils.ts           # Utility functions
    ├── assets/                # Images, icons, CV
    ├── css/                   # Global styles
    ├── App.tsx                # Main app component
    └── main.tsx               # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- Docker & Docker Compose (for containerized setup)

### Local Development

```bash
# Install dependencies
pnpm install

# Start Strapi CMS (Terminal 1)
cd strapi && npm run develop

# Start React app (Terminal 2)
pnpm dev
```

- **React App**: http://localhost:5173
- **Strapi Admin**: http://localhost:1337/admin

### Docker Setup

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

- **Portfolio**: http://localhost:3000
- **Strapi API**: http://localhost:1337

## CMS (Strapi)

### Content Types

| Content Type | Description | Fields |
|-------------|-------------|--------|
| **Profile** | Personal info | name, title, location, bio, profileImage, cvFile |
| **Skill** | Technical skills | name, category (frontend/backend/ferramentas) |
| **Experience** | Work history | company, role, startDate, endDate, responsibilities, skills |
| **SocialLink** | Social profiles | platform, url |

### API Endpoints

```
GET /api/profile?populate=*        # Get profile with media
GET /api/skills                    # Get all skills
GET /api/experiences?populate=skills # Get experiences with skills
GET /api/social-links              # Get social links
```

### Editing Data

1. Access Strapi admin at http://localhost:1337/admin
2. Create an admin account on first run
3. Navigate to Content Manager
4. Edit Profile, Skills, Experiences, or Social Links
5. Changes are reflected on next build (or restart React dev server)

### Seed Data

On first startup, Strapi automatically seeds:
- Profile: Vinícius Costa
- Skills: React, Next.js, TypeScript, Tailwind CSS, Redux, React Query, NodeJS, Analytics
- Experiences: Sympla, InfoPrice, Bornlogic
- Social Links: LinkedIn, GitHub

To re-seed, delete all entries in Strapi admin and restart the server.

### Environment Variables

```bash
# .env
VITE_STRAPI_URL=http://localhost:1337

# strapi/.env
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

## License

MIT
