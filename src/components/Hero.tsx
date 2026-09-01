import { Pointer } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Section } from "./ui/Section";
import { SocialLinks } from "./ui/social-links";

import profile from "../assets/profile.png";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <Section>
      <div className="grid md:place-content-center gap-y-8 lg:gap-y-16">
        <div className="space-y-2 lg:space-y-4">
          <div>
            <span className="text-h3">{t("hero.greeting")}</span>
            <h1>{t("hero.name")}</h1>
          </div>
          <p>
            {t("hero.descriptionPrefix")}
            <strong>{t("hero.location")}</strong>.
            <br />
            {t("hero.descriptionSuffix")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg" className="pe-1 " asChild>
            <a href={`#${t("contact.id")}`}>
              <span>{t("hero.cta")}</span>
              <Button asChild variant="secondary" size="icon-sm">
                <span>
                  <Pointer className="text-primary" />
                </span>
              </Button>
            </a>
          </Button>
          <SocialLinks />
        </div>
      </div>
      <div className="bg-secondary rounded-4xl overflow-hidden relative aspect-square lg:aspect-3/4">
        <img
          src={profile}
          alt={t("hero.alt")}
          className="drop-shadow absolute bottom-0"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </Section>
  );
};

export { Hero };
