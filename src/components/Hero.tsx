import { Pointer } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";

import profile from "../assets/profile.png";
import { Section } from "./ui/Section";
import { LinkedInButton } from "./ui/linkedin-button";
import { GitHubButton } from "./ui/github-button";
import heroData from "../data/hero.json";

const Hero = () => {
  return (
    <Section>
      <div className="grid place-content-center gap-y-8 lg:gap-y-16">
        <div className="space-y-2 lg:space-y-4">
          <div>
            <span className="text-h3">{heroData.greeting}</span>
            <h1>{heroData.name}</h1>
          </div>
          <p>
            {heroData.descriptionPrefix}
            <strong>{heroData.location}</strong>.
            <br />
            {heroData.descriptionSuffix}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg" className="pe-1 " asChild>
            <a href="#contact">
              <span>{heroData.cta}</span>
              <Button asChild variant="secondary" size="icon-sm">
                <span>
                  <Pointer className="text-primary" />
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
      <div className="bg-secondary rounded-4xl overflow-hidden relative aspect-square lg:aspect-3/4">
        <img
          src={profile}
          alt={heroData.alt}
          className="drop-shadow absolute bottom-0"
        />
      </div>
    </Section>
  );
};

export { Hero };
