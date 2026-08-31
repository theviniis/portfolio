import { useState } from "react";
import { Section } from "./ui/Section";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ChevronDown } from "lucide-react";
import experienceData from "../data/experience.json";

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
    ? experienceData.experiences
    : experienceData.experiences.slice(0, ITEMS_PER_PAGE);

  return (
    <Section id="experience">
      <h2>{experienceData.title}</h2>
      <div>
        <ul className="space-y-6" id="experience-list">
          {visibleExperiences.map(ExperienceItem)}
        </ul>
        {experienceData.experiences.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center mt-6">
            <Button
              variant="ghost"
              size="sm"
              aria-expanded={expanded}
              aria-controls="experience-list"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? experienceData.showLess : experienceData.showMore}
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
