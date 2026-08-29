# Strapi CMS Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Strapi CMS to allow editing portfolio data (profile, skills, experiences) without code changes.

**Architecture:** Strapi v5 self-hosted via Docker Compose, React app fetches data at build time via REST API.

**Tech Stack:** Strapi v5, Docker Compose, React, TypeScript, Vite, Nginx

---

## File Structure

```
portfolio/
├── docker-compose.yml              # Orquestração Strapi + Portfolio
├── Dockerfile.portfolio             # Build do React app
├── nginx.conf                       # Configuração Nginx
├── .env                             # Variáveis de ambiente
├── strapi/                          # Projeto Strapi
│   ├── Dockerfile
│   ├── package.json
│   ├── config/
│   ├── src/
│   │   ├── api/
│   │   │   ├── profile/
│   │   │   │   ├── content-types/profile/schema.json
│   │   │   │   ├── routes/profile.ts
│   │   │   │   └── controllers/profile.ts
│   │   │   ├── skill/
│   │   │   │   ├── content-types/skill/schema.json
│   │   │   │   ├── routes/skill.ts
│   │   │   │   └── controllers/skill.ts
│   │   │   ├── experience/
│   │   │   │   ├── content-types/experience/schema.json
│   │   │   │   ├── routes/experience.ts
│   │   │   │   └── controllers/experience.ts
│   │   │   └── social-link/
│   │   │       ├── content-types/social-link/schema.json
│   │   │       ├── routes/social-link.ts
│   │   │       └── controllers/social-link.ts
│   │   └── index.ts                 # Seed script
│   └── .env.example
├── src/
│   ├── lib/
│   │   ├── strapi.ts                # Fetch service
│   │   └── use-strapi.ts            # React hooks
│   └── components/
│       ├── Hero.tsx                 # Adaptado
│       ├── About.tsx                # Adaptado
│       ├── SkillsWrapper.tsx        # Adaptado
│       └── Experience.tsx           # Adaptado
```

---

## Task 1: Initialize Strapi Project

**Files:**
- Create: `strapi/` directory (via npx create-strapi-app)

- [ ] **Step 1: Create Strapi project**

```bash
cd /home/viniis/portfolio
npx create-strapi-app@latest strapi --quickstart --no-run
```

- [ ] **Step 2: Verify Strapi structure**

```bash
ls strapi/
```

Expected: `src/`, `config/`, `package.json`, `README.md`, etc.

- [ ] **Step 3: Commit**

```bash
git add strapi/
git commit -m "feat: initialize Strapi CMS project"
```

---

## Task 2: Create Profile Content Type

**Files:**
- Create: `strapi/src/api/profile/content-types/profile/schema.json`
- Create: `strapi/src/api/profile/routes/profile.ts`
- Create: `strapi/src/api/profile/controllers/profile.ts`

- [ ] **Step 1: Create Profile schema**

```json
{
  "kind": "collectionType",
  "collectionName": "profiles",
  "info": {
    "singularName": "profile",
    "pluralName": "profiles",
    "displayName": "Profile"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "title": {
      "type": "string",
      "required": true
    },
    "location": {
      "type": "string"
    },
    "bio": {
      "type": "richtext"
    },
    "profileImage": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "cvFile": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["files"]
    }
  }
}
```

- [ ] **Step 2: Create Profile route**

```typescript
import { factories } from "@strapi/strapi";
export default factories.createCoreRouter("api::profile.profile");
```

- [ ] **Step 3: Create Profile controller**

```typescript
import { factories } from "@strapi/strapi";
export default factories.createCoreController("api::profile.profile");
```

- [ ] **Step 4: Commit**

```bash
git add strapi/src/api/profile/
git commit -m "feat: add Profile content type to Strapi"
```

---

## Task 3: Create Skill Content Type

**Files:**
- Create: `strapi/src/api/skill/content-types/skill/schema.json`
- Create: `strapi/src/api/skill/routes/skill.ts`
- Create: `strapi/src/api/skill/controllers/skill.ts`

- [ ] **Step 1: Create Skill schema**

```json
{
  "kind": "collectionType",
  "collectionName": "skills",
  "info": {
    "singularName": "skill",
    "pluralName": "skills",
    "displayName": "Skill"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "unique": true
    },
    "category": {
      "type": "enumeration",
      "enum": ["frontend", "backend", "ferramentas"],
      "default": "frontend"
    }
  }
}
```

- [ ] **Step 2: Create Skill route**

```typescript
import { factories } from "@strapi/strapi";
export default factories.createCoreRouter("api::skill.skill");
```

- [ ] **Step 3: Create Skill controller**

```typescript
import { factories } from "@strapi/strapi";
export default factories.createCoreController("api::skill.skill");
```

- [ ] **Step 4: Commit**

```bash
git add strapi/src/api/skill/
git commit -m "feat: add Skill content type to Strapi"
```

---

## Task 4: Create Experience Content Type

**Files:**
- Create: `strapi/src/api/experience/content-types/experience/schema.json`
- Create: `strapi/src/api/experience/routes/experience.ts`
- Create: `strapi/src/api/experience/controllers/experience.ts`

- [ ] **Step 1: Create Experience schema**

```json
{
  "kind": "collectionType",
  "collectionName": "experiences",
  "info": {
    "singularName": "experience",
    "pluralName": "experiences",
    "displayName": "Experience"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "company": {
      "type": "string",
      "required": true
    },
    "role": {
      "type": "string",
      "required": true
    },
    "startDate": {
      "type": "string"
    },
    "endDate": {
      "type": "string"
    },
    "responsibilities": {
      "type": "json"
    },
    "skills": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::skill.skill"
    }
  }
}
```

- [ ] **Step 2: Create Experience route**

```typescript
import { factories } from "@strapi/strapi";
export default factories.createCoreRouter("api::experience.experience");
```

- [ ] **Step 3: Create Experience controller**

```typescript
import { factories } from "@strapi/strapi";
export default factories.createCoreController("api::experience.experience");
```

- [ ] **Step 4: Commit**

```bash
git add strapi/src/api/experience/
git commit -m "feat: add Experience content type to Strapi"
```

---

## Task 5: Create SocialLink Content Type

**Files:**
- Create: `strapi/src/api/social-link/content-types/social-link/schema.json`
- Create: `strapi/src/api/social-link/routes/social-link.ts`
- Create: `strapi/src/api/social-link/controllers/social-link.ts`

- [ ] **Step 1: Create SocialLink schema**

```json
{
  "kind": "collectionType",
  "collectionName": "social-links",
  "info": {
    "singularName": "social-link",
    "pluralName": "social-links",
    "displayName": "SocialLink"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "platform": {
      "type": "string",
      "required": true
    },
    "url": {
      "type": "string",
      "required": true
    }
  }
}
```

- [ ] **Step 2: Create SocialLink route**

```typescript
import { factories } from "@strapi/strapi";
export default factories.createCoreRouter("api::social-link.social-link");
```

- [ ] **Step 3: Create SocialLink controller**

```typescript
import { factories } from "@strapi/strapi";
export default factories.createCoreController("api::social-link.social-link");
```

- [ ] **Step 4: Commit**

```bash
git add strapi/src/api/social-link/
git commit -m "feat: add SocialLink content type to Strapi"
```

---

## Task 6: Configure Docker Compose

**Files:**
- Create: `docker-compose.yml`
- Create: `strapi/Dockerfile`
- Create: `Dockerfile.portfolio`
- Create: `nginx.conf`

- [ ] **Step 1: Create Strapi Dockerfile**

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 1337
CMD ["npm", "run", "develop"]
```

- [ ] **Step 2: Create docker-compose.yml**

```yaml
version: "3.8"

services:
  strapi:
    build:
      context: ./strapi
      dockerfile: Dockerfile
    ports:
      - "1337:1337"
    environment:
      - DATABASE_CLIENT=sqlite
      - DATABASE_FILENAME=.tmp/data.db
    volumes:
      - ./strapi:/app
      - strapi_node_modules:/app/node_modules
      - strapi_data:/app/.tmp
    restart: unless-stopped

  portfolio:
    build:
      context: .
      dockerfile: Dockerfile.portfolio
      args:
        - VITE_STRAPI_URL=http://strapi:1337
    ports:
      - "3000:80"
    depends_on:
      - strapi
    restart: unless-stopped

volumes:
  strapi_node_modules:
  strapi_data:
```

- [ ] **Step 3: Create Portfolio Dockerfile**

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_STRAPI_URL=http://localhost:1337
ENV VITE_STRAPI_URL=$VITE_STRAPI_URL
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

- [ ] **Step 4: Create nginx.conf**

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

- [ ] **Step 5: Commit**

```bash
git add docker-compose.yml strapi/Dockerfile Dockerfile.portfolio nginx.conf
git commit -m "feat: add Docker Compose configuration for Strapi + Portfolio"
```

---

## Task 7: Create Environment Configuration

**Files:**
- Modify: `.env`
- Create: `strapi/.env.example`

- [ ] **Step 1: Add Strapi URL to .env**

```
VITE_STRAPI_URL=http://localhost:1337
```

- [ ] **Step 2: Create Strapi .env.example**

```
HOST=0.0.0.0
PORT=1337
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
JWT_SECRET=
TRANSFER_TOKEN_SALT=
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

- [ ] **Step 3: Commit**

```bash
git add .env strapi/.env.example
git commit -m "feat: add environment configuration for Strapi"
```

---

## Task 8: Create Strapi Fetch Service

**Files:**
- Create: `src/lib/strapi.ts`

- [ ] **Step 1: Create types and fetch functions**

```typescript
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Profile {
  id: number;
  documentId: string;
  name: string;
  title: string;
  location: string;
  bio: string;
  profileImage?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
  cvFile?: {
    id: number;
    url: string;
    name: string;
  };
}

export interface Skill {
  id: number;
  documentId: string;
  name: string;
  category: "frontend" | "backend" | "ferramentas";
}

export interface Experience {
  id: number;
  documentId: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  skills: Skill[];
}

export interface SocialLink {
  id: number;
  documentId: string;
  platform: string;
  url: string;
}

async function fetchAPI<T>(endpoint: string): Promise<StrapiResponse<T>> {
  const res = await fetch(`${STRAPI_URL}/api${endpoint}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
  }
  return res.json();
}

export async function getProfile(): Promise<StrapiResponse<Profile>> {
  return fetchAPI<Profile>("/profile?populate=*");
}

export async function getSkills(): Promise<StrapiResponse<Skill[]>> {
  return fetchAPI<Skill[]>("/skills");
}

export async function getExperiences(): Promise<StrapiResponse<Experience[]>> {
  return fetchAPI<Experience[]>("/experiences?populate=skills");
}

export async function getSocialLinks(): Promise<StrapiResponse<SocialLink[]>> {
  return fetchAPI<SocialLink[]>("/social-links");
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/strapi.ts
git commit -m "feat: add Strapi fetch service with types"
```

---

## Task 9: Create React Hooks

**Files:**
- Create: `src/lib/use-strapi.ts`

- [ ] **Step 1: Create custom hooks**

```typescript
import { useState, useEffect } from "react";
import {
  getProfile,
  getSkills,
  getExperiences,
  getSocialLinks,
  type Profile,
  type Skill,
  type Experience,
  type SocialLink,
} from "./strapi";

interface UseStrapiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useStrapi<T>(
  fetcher: () => Promise<{ data: T }>
): UseStrapiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((res) => {
        if (!cancelled) {
          setData(res.data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

export function useProfile() {
  return useStrapi<Profile>(getProfile);
}

export function useSkills() {
  return useStrapi<Skill[]>(getSkills);
}

export function useExperiences() {
  return useStrapi<Experience[]>(getExperiences);
}

export function useSocialLinks() {
  return useStrapi<SocialLink[]>(getSocialLinks);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/use-strapi.ts
git commit -m "feat: add React hooks for Strapi data fetching"
```

---

## Task 10: Adapt Hero Component

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Update Hero to use Strapi data**

Replace the entire file with:

```typescript
import { Pointer } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Section } from "./ui/Section";
import { LinkedInButton } from "./ui/linkedin-button";
import { GitHubButton } from "./ui/github-button";
import { useProfile } from "@/lib/use-strapi";

import profileImg from "../assets/profile.png";

const Hero = () => {
  const { data: profile, loading } = useProfile();

  return (
    <Section>
      <div className="grid place-content-center gap-y-8 lg:gap-y-16">
        <div className="space-y-2 lg:space-y-4">
          <div>
            <span className="text-h3">Olá, me chamo</span>
            <h1>{loading ? "Carregando..." : `${profile?.name || "Vinícius Costa"}.`}</h1>
          </div>
          <p>
            Sou {profile?.title || "desenvolvedor front-end"} localizado em{" "}
            <strong>{profile?.location || "Rio Grande, RS"}</strong>.
            <br />
            Tenho experiência com desenvolvimento de aplicações web.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg" className="pe-1 " asChild>
            <a href="#contact">
              <span>Entre em contato</span>
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
          src={profile?.profileImage?.url || profileImg}
          alt={profile?.profileImage?.alternativeText || "Imagem de perfil"}
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
git commit -m "feat: adapt Hero component to use Strapi data"
```

---

## Task 11: Adapt About Component

**Files:**
- Modify: `src/components/About.tsx`

- [ ] **Step 1: Update About to use Strapi data**

Replace the entire file with:

```typescript
import { Download } from "lucide-react";
import { Section } from "./ui/Section";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { LinkedInButton } from "./ui/linkedin-button";
import { GitHubButton } from "./ui/github-button";
import { useProfile } from "@/lib/use-strapi";

const About = () => {
  const { data: profile, loading } = useProfile();

  const cvUrl = profile?.cvFile?.url
    ? `${import.meta.env.VITE_STRAPI_URL}${profile.cvFile.url}`
    : "#";

  return (
    <Section id="about-me">
      <h2>Sobre</h2>
      <div className="space-y-8">
        <div className="space-y-4">
          <h3>{profile?.title || "Desenvolvedor front-end com foco em JavaScript"}</h3>
          <div className="text-justify space-y-2">
            {loading ? (
              <p>Carregando...</p>
            ) : profile?.bio ? (
              <p>{profile.bio}</p>
            ) : (
              <>
                <p>
                  Desenvolvedor front-end com experiência em React, TypeScript,
                  Next.js, HTML, CSS, SCSS e Tailwind.
                </p>
                <p>
                  Na Sympla, implementei tracking de analytics com Mixpanel, push
                  notifications com Braze e Service Worker, e realizei a migração de
                  banco de dados AWS Redshift para Athena para redução de custos.
                </p>
                <p>
                  Possuo experiência em documentação técnica, publicação de pacotes
                  npm no GitLab Registry e adoção de desenvolvimento assistido por
                  IA.
                </p>
                <p>
                  Habilidades em colaboração, resolução de problemas e
                  adaptabilidade em equipes multidisciplinares.
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg" className="pe-1" asChild>
            <a href={cvUrl} download="vinicius_costa_cv.docx">
              <span>Baixar currículo</span>
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
git commit -m "feat: adapt About component to use Strapi data"
```

---

## Task 12: Adapt SkillsWrapper Component

**Files:**
- Modify: `src/components/SkillsWrapper.tsx`

- [ ] **Step 1: Update SkillsWrapper to use Strapi data**

Replace the entire file with:

```typescript
import { Section } from "./ui/Section";
import { Button } from "./ui/button";
import { useSkills } from "@/lib/use-strapi";

const SkillsWrapper = () => {
  const { data: skills, loading } = useSkills();

  return (
    <Section id="skills">
      <h2>Habilidades</h2>
      <div className="space-y-8">
        <p>
          Estou sempre em busca de aprender algo novo. Gosto de explorar
          ferramentas, práticas e jeitos diferentes de construir e ir somando
          isso ao que já faço no dia a dia.
        </p>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {(skills || []).map((skill, index) => (
              <Button
                key={skill.id}
                variant={index > 2 ? "outline" : "default"}
                className="pointer-events-none"
                asChild
              >
                <li className="flex-1">{skill.name}</li>
              </Button>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
};

export { SkillsWrapper };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SkillsWrapper.tsx
git commit -m "feat: adapt SkillsWrapper component to use Strapi data"
```

---

## Task 13: Adapt Experience Component

**Files:**
- Modify: `src/components/Experience.tsx`

- [ ] **Step 1: Update Experience to use Strapi data**

Replace the entire file with:

```typescript
import { useState } from "react";
import { Section } from "./ui/Section";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ChevronDown } from "lucide-react";
import { useExperiences } from "@/lib/use-strapi";

type ExperienceItemType = {
  role: string;
  company: string;
  period: Record<"start" | "end", string>;
  responsibilities: string[];
  skills: string[];
};

const ExperienceItem = ({
  company,
  responsibilities,
  period,
  role,
  skills,
}: ExperienceItemType) => {
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
  const [expanded, setExpanded] = useState(false);
  const { data: experiences, loading } = useExperiences();

  const allExperiences = (experiences || []).map((exp) => ({
    company: exp.company,
    role: exp.role,
    period: { start: exp.startDate, end: exp.endDate },
    responsibilities: exp.responsibilities,
    skills: exp.skills.map((s) => s.name),
  }));

  const visibleExperiences = expanded
    ? allExperiences
    : allExperiences.slice(0, ITEMS_PER_PAGE);

  return (
    <Section id="experience">
      <h2>Experiência</h2>
      <div>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <ul className="space-y-6" id="experience-list">
            {visibleExperiences.map((exp) => (
              <ExperienceItem key={exp.company} {...exp} />
            ))}
          </ul>
        )}
        {allExperiences.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center mt-6">
            <Button
              variant="ghost"
              size="sm"
              aria-expanded={expanded}
              aria-controls="experience-list"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Ver menos" : "Ver mais"}
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
git commit -m "feat: adapt Experience component to use Strapi data"
```

---

## Task 14: Create Seed Script

**Files:**
- Create: `strapi/src/index.ts`

- [ ] **Step 1: Create seed script**

```typescript
import type { Core } from "@strapi/strapi";

export default {
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const profile = await strapi.documents("api::profile.profile").findFirst();

    if (!profile) {
      strapi.log.info("Seeding initial data...");

      await strapi.documents("api::profile.profile").create({
        data: {
          name: "Vinícius Costa",
          title: "Desenvolvedor front-end",
          location: "Rio Grande, RS",
          bio: "Desenvolvedor front-end com experiência em React, TypeScript, Next.js, HTML, CSS, SCSS e Tailwind.",
        },
      });

      const skillsData = [
        { name: "React", category: "frontend" as const },
        { name: "Next.js", category: "frontend" as const },
        { name: "TypeScript", category: "frontend" as const },
        { name: "Tailwind CSS", category: "frontend" as const },
        { name: "Redux", category: "frontend" as const },
        { name: "React Query", category: "frontend" as const },
        { name: "NodeJS", category: "backend" as const },
        { name: "Analytics", category: "ferramentas" as const },
      ];

      const createdSkills = [];
      for (const skill of skillsData) {
        const s = await strapi.documents("api::skill.skill").create({
          data: skill,
        });
        createdSkills.push(s);
      }

      await strapi.documents("api::experience.experience").create({
        data: {
          company: "Sympla",
          role: "Desenvolvedor de front-end",
          startDate: "nov/2025",
          endDate: "jun/2026",
          responsibilities: [
            "Criei o SDK de analytics da plataforma para alternar facilmente entre ferramentas como Mixpanel, Google Analytics e PostHog",
            "Implementei 100+ eventos estruturados de analytics em diversas aplicações",
            "Refatorei a fila de eventos baseada em Promise eliminando condições de corrida no React",
          ],
          skills: createdSkills.slice(0, 6).map((s) => s.documentId),
        },
      });

      await strapi.documents("api::experience.experience").create({
        data: {
          company: "InfoPrice",
          role: "Desenvolvedor de front-end",
          startDate: "jun/2023",
          endDate: "out/2025",
          responsibilities: [
            "Arquitetei soluções front-end com React, TypeScript, Redux e SASS/SCSS para plataforma SaaS B2B",
            "Desenvolvi componentes reutilizáveis, escaláveis e acessíveis",
          ],
          skills: createdSkills.slice(0, 4).map((s) => s.documentId),
        },
      });

      await strapi.documents("api::experience.experience").create({
        data: {
          company: "Bornlogic",
          role: "Desenvolvedor de front-end",
          startDate: "ago/2022",
          endDate: "jan/2023",
          responsibilities: [
            "Projetei e implementei Design System completo usando React, Storybook e Styled-Components",
          ],
          skills: createdSkills.slice(0, 3).map((s) => s.documentId),
        },
      });

      await strapi.documents("api::social-link.social-link").create({
        data: { platform: "linkedin", url: "https://linkedin.com/in/vinicius-costa" },
      });

      await strapi.documents("api::social-link.social-link").create({
        data: { platform: "github", url: "https://github.com/vinicius-costa" },
      });

      strapi.log.info("Seed data created successfully!");
    }
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add strapi/src/index.ts
git commit -m "feat: add Strapi seed script with initial portfolio data"
```

---

## Task 15: Test Strapi Locally

- [ ] **Step 1: Start Strapi**

```bash
cd strapi
npm run develop
```

- [ ] **Step 2: Open admin panel**

Navigate to http://localhost:1337/admin

- [ ] **Step 3: Create admin user**

Fill in the registration form.

- [ ] **Step 4: Verify content types**

Confirm Profile, Skill, Experience, SocialLink appear in the Content-Type Builder.

- [ ] **Step 5: Verify seed data**

Check that data was seeded in each collection.

- [ ] **Step 6: Test API endpoints**

```bash
curl http://localhost:1337/api/profile?populate=*
curl http://localhost:1337/api/skills
curl http://localhost:1337/api/experiences?populate=skills
curl http://localhost:1337/api/social-links
```

- [ ] **Step 7: Commit any fixes**

```bash
git add .
git commit -m "fix: adjustments from Strapi local testing"
```

---

## Task 16: Test Full Integration

- [ ] **Step 1: Start React app**

```bash
cd /home/viniis/portfolio
npm run dev
```

- [ ] **Step 2: Verify data renders**

Check that Hero, About, Skills, and Experience sections display data from Strapi.

- [ ] **Step 3: Test editing in Strapi**

Change a name or skill in Strapi admin, rebuild React app, verify changes appear.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete Strapi CMS integration"
```

---

## Summary

| Task | Description | Status |
|------|-------------|--------|
| 1 | Initialize Strapi project | - [ ] |
| 2 | Create Profile content type | - [ ] |
| 3 | Create Skill content type | - [ ] |
| 4 | Create Experience content type | - [ ] |
| 5 | Create SocialLink content type | - [ ] |
| 6 | Configure Docker Compose | - [ ] |
| 7 | Create environment configuration | - [ ] |
| 8 | Create Strapi fetch service | - [ ] |
| 9 | Create React hooks | - [ ] |
| 10 | Adapt Hero component | - [ ] |
| 11 | Adapt About component | - [ ] |
| 12 | Adapt SkillsWrapper component | - [ ] |
| 13 | Adapt Experience component | - [ ] |
| 14 | Create seed script | - [ ] |
| 15 | Test Strapi locally | - [ ] |
| 16 | Test full integration | - [ ] |
