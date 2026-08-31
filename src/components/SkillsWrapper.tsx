import { Section } from "./ui/Section";
import { Button } from "./ui/button";
import skillsData from "../data/skills.json";

const SkillsWrapper = () => {
  return (
    <Section id="skills">
      <h2>{skillsData.title}</h2>
      <div className="space-y-8">
        <p>{skillsData.description}</p>
        <ul className="flex flex-wrap gap-2">
          {skillsData.list.map((skill, index) => (
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
