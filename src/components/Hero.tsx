import { Pointer } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";

import profile from "../assets/profile.png";
import { Section } from "./ui/Section";
import { LinkedInButton } from "./ui/linkedin-button";
import { GitHubButton } from "./ui/github-button";

const Hero = () => {
  return (
    <Section>
      <div className="grid place-content-center gap-y-4 lg:gap-y-8">
        <div className="space-y-2 lg:space-y-4">
          <div>
            <span className="text-h3">Olá, me chamo</span>
            <h1>Vinícius Costa.</h1>
          </div>
          <p>
            Sou desenvolvedor front-end localizado em{" "}
            <strong>Rio Grande, RS</strong>.
            <br />
            Tenho experiência com desenvolvimento de aplicações web.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg" className="pe-1 " asChild>
            <a href="#contact">
              <span>Entre em contato</span>
              <Button asChild variant="secondary" size="icon-sm">
                <span>
                  <Pointer />
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
          alt="Imagem de perfil"
          className="drop-shadow absolute bottom-0"
        />
      </div>
    </Section>
  );
};

export { Hero };
