import { Pointer } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Section } from "./ui/Section";
import { LinkedInButton } from "./ui/linkedin-button";
import { GitHubButton } from "./ui/github-button";
import { useProfile } from "@/lib/use-strapi";

import profileImg from "../assets/profile.png";

const Hero = () => {
  const { data: profile, loading } = useProfile();

  return (
    <Section>
      <div className="grid place-content-center gap-y-8 lg:gap-y-16">
        <div className="space-y-2 lg:space-y-4">
          <div>
            <span className="text-h3">Olá, me chamo</span>
            <h1>{loading ? "Carregando..." : `${profile?.name || "Vinícius Costa"}.`}</h1>
          </div>
          <p>
            Sou {profile?.title || "desenvolvedor front-end"} localizado em{" "}
            <strong>{profile?.location || "Rio Grande, RS"}</strong>.
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
          src={profile?.profileImage?.url ? `${import.meta.env.VITE_STRAPI_URL}${profile.profileImage.url}` : profileImg}
          alt={profile?.profileImage?.alternativeText || "Imagem de perfil"}
          className="drop-shadow absolute bottom-0"
        />
      </div>
    </Section>
  );
};

export { Hero };
