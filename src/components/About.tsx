import { Download } from "lucide-react";
import { Section } from "./ui/Section";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { LinkedInButton } from "./ui/linkedin-button";
import { GitHubButton } from "./ui/github-button";

import cvUrl from "../assets/vinicius_costa_cv.docx?url";
import aboutData from "../data/about.json";

const About = () => {
  return (
    <Section id="about-me">
      <h2>Sobre</h2>
      <div className="space-y-8">
        <div className="space-y-4">
          <h3>{aboutData.title}</h3>
          <div className="text-justify space-y-2">
            {aboutData.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg" className="pe-1" asChild>
            <a href={cvUrl} download="vinicius_costa_cv.docx">
              <span>{aboutData.cvLabel}</span>
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
