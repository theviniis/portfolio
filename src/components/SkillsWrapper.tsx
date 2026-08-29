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
