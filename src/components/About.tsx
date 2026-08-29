import { Download } from "lucide-react";
import { Section } from "./ui/Section";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";

import cvUrl from "../assets/vinicius_costa_cv.docx?url";
import { LinkedInButton } from "./ui/linkedin-button";
import { GitHubButton } from "./ui/github-button";

const About = () => {
  return (
    <Section id="about-me">
      <h2>Sobre</h2>
      <div className="space-y-8">
        <div className="space-y-2">
          <h3>Desenvolvedor front-end com foco em React</h3>
          <p className="text-justify">
            Desenvolvedor front-end com experiência em React, TypeScript,
            Next.js, HTML, CSS, SCSS e Tailwind.
            <br />
            Na Sympla, implementei analytics com Mixpanel, push notifications
            com Braze e Service Worker, e realizei a migração de banco de dados
            AWS Redshift para Athena para redução de custos.
            <br />
            Possuo experiência em documentação técnica, publicação de pacotes
            npm no GitLab Registry e adoção de desenvolvimento assistido por IA.
            <br />
            Habilidades em colaboração, resolução de problemas e adaptabilidade
            em equipes multidisciplinares.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg" className="pe-1" asChild>
            <a href={cvUrl} download="vinicius_costa_cv.docx">
              <span>Baixar currículo</span>
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
