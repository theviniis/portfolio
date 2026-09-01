import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "./ui/Section";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ChevronDown } from "lucide-react";

type ExperienceType = {
  role: string;
  company: string;
  period: { start: string; end: string };
  responsibilities: string[];
  skills: string[];
};

const ExperienceItem = ({
  company,
  responsibilities,
  period,
  role,
  skills,
  isLast,
}: ExperienceType & { isLast: boolean }) => {
  return (
    <li className="space-y-4">
      <div>
        <h3 className="text-h4">{company}</h3>
        <h4 className="text-h5">{role}</h4>
        <p>
          {period.start} — {period.end}
        </p>
        <ul className="flex flex-wrap items-center gap-2 mt-2">
          {skills.map((skill, index) => (
            <li key={skill}>
              <Badge variant={index > 2 ? "outline" : "default"}>{skill}</Badge>
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
      {!isLast && <Separator />}
    </li>
  );
};

const ITEMS_PER_PAGE = 3;

const Experience = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const experiences = t("experience.experiences", {
    returnObjects: true,
  }) as ExperienceType[];
  const visibleExperiences = expanded
    ? experiences
    : experiences.slice(0, ITEMS_PER_PAGE);

  return (
    <Section id={t("experience.id")}>
      <h2>{t("experience.title")}</h2>
      <div>
        <ul className="space-y-6" id="experience-list">
          {visibleExperiences.map((item, index) => (
            <ExperienceItem
              key={item.company}
              {...item}
              isLast={index === visibleExperiences.length - 1}
            />
          ))}
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
              {expanded ? t("experience.showLess") : t("experience.showMore")}
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
