import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Section } from "./ui/Section";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { LinkedInButton } from "./ui/linkedin-button";
import { GitHubButton } from "./ui/github-button";

import cvUrlPt from "../assets/vinicius_costa_cv.docx?url";
import cvUrlEn from "../assets/vinicius_costa_cv_en.docx?url";

const CV_MAP: Record<string, { url: string; filename: string }> = {
  'pt-BR': { url: cvUrlPt, filename: 'vinicius_costa_cv.docx' },
  'en-US': { url: cvUrlEn, filename: 'vinicius_costa_cv_en.docx' }
};

const About = () => {
  const { t, i18n } = useTranslation();
  const cv = CV_MAP[i18n.language] || CV_MAP['pt-BR'];

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
            <a href={cv.url} download={cv.filename}>
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
