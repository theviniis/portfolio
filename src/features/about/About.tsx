import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Section } from "@/shared/ui/Section";
import { SocialLinks } from "@/shared/ui/social-links";
import { CtaButton } from "@/shared/components/CtaButton";
import { getCvForLang } from "@/shared/lib/cv";

const About = () => {
  const { t, i18n } = useTranslation();
  const cv = getCvForLang(i18n.language);

  return (
    <Section id={t('about.id')}>
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
          <CtaButton
            label={t('about.cvLabel')}
            icon={<Download />}
            href={cv.url}
            download={cv.filename}
          />
          <SocialLinks />
        </div>
      </div>
    </Section>
  );
};

export { About };
