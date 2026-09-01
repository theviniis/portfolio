import { useTranslation } from "react-i18next";
import { Section } from "./ui/Section";
import { Button } from "./ui/button";

const SkillsWrapper = () => {
  const { t } = useTranslation();

  return (
    <Section id="skills">
      <h2>{t('skills.title')}</h2>
      <div className="space-y-8">
        <p>{t('skills.description')}</p>
        <ul className="flex flex-wrap gap-2">
          {(t('skills.list', { returnObjects: true }) as string[]).map((skill, index) => (
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
