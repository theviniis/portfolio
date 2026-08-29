import { Download } from "lucide-react";
import { Section } from "./ui/Section";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { LinkedInButton } from "./ui/linkedin-button";
import { GitHubButton } from "./ui/github-button";
import { useProfile } from "@/lib/use-strapi";

const About = () => {
  const { data: profile, loading } = useProfile();

  const cvUrl = profile?.cvFile?.url
    ? `${import.meta.env.VITE_STRAPI_URL}${profile.cvFile.url}`
    : "#";

  return (
    <Section id="about-me">
      <h2>Sobre</h2>
      <div className="space-y-8">
        <div className="space-y-4">
          <h3>{profile?.title || "Desenvolvedor front-end com foco em JavaScript"}</h3>
          <div className="text-justify space-y-2">
            {loading ? (
              <p>Carregando...</p>
            ) : profile?.bio ? (
              <p>{profile.bio}</p>
            ) : (
              <>
                <p>
                  Desenvolvedor front-end com experiência em React, TypeScript,
                  Next.js, HTML, CSS, SCSS e Tailwind.
                </p>
                <p>
                  Na Sympla, implementei tracking de analytics com Mixpanel, push
                  notifications com Braze e Service Worker, e realizei a migração de
                  banco de dados AWS Redshift para Athena para redução de custos.
                </p>
                <p>
                  Possuo experiência em documentação técnica, publicação de pacotes
                  npm no GitLab Registry e adoção de desenvolvimento assistido por
                  IA.
                </p>
                <p>
                  Habilidades em colaboração, resolução de problemas e
                  adaptabilidade em equipes multidisciplinares.
                </p>
              </>
            )}
          </div>
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
