import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { Button } from "@/shared/ui/button";
import { ExperienceItem } from "./ExperienceItem";
import type { ExperienceType } from "./types";

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
