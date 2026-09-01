import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Section } from "./ui/Section";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { LinkedInButton } from "./ui/linkedin-button";
import { GitHubButton } from "./ui/github-button";

import cvUrl from "../assets/vinicius_costa_cv.docx?url";

const About = () => {
  const { t } = useTranslation();

  return (
    <Section id="about-me">
      <h2>{t('about.heading')}</h2>
      <div className="space-y-8">
        <div className="space-y-4">
          <h3>{t('about.title')}</h3>
          <div className="text-justify space-y-2">
            {(t('about.paragraphs', { returnObjects: true }) as string[]).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg" className="pe-1" asChild>
            <a href={cvUrl} download="vinicius_costa_cv.docx">
              <span>{t('about.cvLabel')}</span>
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
