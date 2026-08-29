import { Section } from "./ui/Section";
import { Button } from "./ui/button";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Redux",
  "React Query",
  "Testes Unitários",
  "Analytics",
  "Spec Driven Development",
  "API Rest",
  "NodeJS",
];

const SkillsWrapper = () => {
  return (
    <Section id="skills">
      <h2>Habilidades</h2>
      <div className="space-y-8">
        <p>
          Estou sempre em busca de aprender algo novo. Gosto de explorar
          ferramentas, práticas e jeitos diferentes de construir e ir somando
          isso ao que já faço no dia a dia.
        </p>
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Button
              key={skill}
              variant={index > 2 ? "outline" : "default"}
              className="pointer-events-none"
              asChild
            >
              <li className="flex-1">{skill}</li>
            </Button>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export { SkillsWrapper };
