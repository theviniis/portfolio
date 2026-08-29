import { useState } from "react";
import { Section } from "./ui/Section";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ChevronDown } from "lucide-react";

type ExperienceType = {
  role: string;
  company: string;
  period: Record<"start" | "end", `${string}/${string}`>;
  responsibilities: string[];
  skills: string[];
};

const experiences: ExperienceType[] = [
  {
    role: "Desenvolvedor de front-end",
    company: "Sympla",
    period: {
      start: "nov/2025",
      end: "jun/2026",
    },
    responsibilities: [
      "Criei o SDK de analytics da plataforma para alternar facilmente entre ferramentas como Mixpanel, Google Analytics e PostHog, viabilizando troca ágil de ferramentas.",
      "Implementei 100+ eventos estruturados de analytics em diversas aplicações (JavaScript Vanilla, React, Next.js, Vue e Polymer), contribuindo para grande aumento no uso da plataforma.",
      "Refatorei a fila de eventos baseada em Promise eliminando condições de corrida no React e conduzi treinamentos para desenvolvedores garantindo adoção adequada da ferramenta.",
    ],
    skills: [
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
      "AWS",
    ],
  },

  {
    role: "Desenvolvedor de front-end",
    company: "InfoPrice",
    period: {
      start: "jun/2023",
      end: "out/2025",
    },
    responsibilities: [
      "Arquitetei soluções front-end com React, TypeScript, Redux e SASS/SCSS para plataforma SaaS B2B de precificação no varejo.",
      "Desenvolvi componentes reutilizáveis, escaláveis e acessíveis aprimorando significativamente a experiência do usuário da plataforma.",
    ],
    skills: [
      "React",
      "TypeScript",
      "Redux",
      "Storybook",
      "Jest + React Testing Library",
      "Git",
      "GitHub",
    ],
  },

  {
    role: "Desenvolvedor de front-end",
    company: "Bornlogic",
    period: {
      start: "ago/2022",
      end: "jan/2023",
    },
    responsibilities: [
      "Projetei e implementei Design System completo usando React, Storybook e Styled-Components com documentação de componentes em MDX.",
    ],
    skills: [
      "React",
      "TypeScript",
      "Storybook",
      "Jest + React Testing Library",
      "Git",
      "GitHub",
    ],
  },
];

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
  const [expanded, setExpanded] = useState(false);
  const visibleExperiences = expanded
    ? experiences
    : experiences.slice(0, ITEMS_PER_PAGE);

  return (
    <Section id="experience">
      <h2>Experiência</h2>
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
              {expanded ? "Ver menos" : "Ver mais"}
              <ChevronDown
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
};

export { Experience };
