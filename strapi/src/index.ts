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
