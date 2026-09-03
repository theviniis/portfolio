import { useTranslation } from "react-i18next";
import { Section } from "@/shared/ui/Section";
import { SocialLinks } from "@/shared/ui/social-links";
import { Button } from "@/shared/ui/button";

import cvUrlPt from "../assets/vinicius_costa_cv.docx?url";
import cvUrlEn from "../assets/vinicius_costa_cv_en.docx?url";
import { lazy, Suspense } from "react";
import { Spinner } from "@/shared/ui/spinner";

const ContactForm = lazy(async () => {
  const module = await import("./ContactForm");
  return {
    default: module.ContactForm,
  };
});

const CV_MAP: Record<string, { url: string; filename: string }> = {
  "pt-BR": { url: cvUrlPt, filename: "vinicius_costa_cv.docx" },
  "en-US": { url: cvUrlEn, filename: "vinicius_costa_cv_en.docx" },
};

const Contact = () => {
  const { t, i18n } = useTranslation();
  const cv = CV_MAP[i18n.language] || CV_MAP["pt-BR"];

  return (
    <Section id={t("contact.id")}>
      <div className="space-y-4">
        <h2>{t("contact.title")}</h2>
        <div>
          <p>
            {t("contact.emailLabel")}{" "}
            <Button className="p-0 text-base" variant="link" asChild>
              <a href={`mailto:${t("contact.email")}`}>{t("contact.email")}</a>
            </Button>
          </p>

          <p>
            {t("contact.cvLabel")}{" "}
            <Button className="p-0 text-base" variant="link" asChild>
              <a href={cv.url} download={cv.filename}>
                {t("contact.cvLink")}
              </a>
            </Button>
          </p>
        </div>
        <Suspense
          fallback={
            <div>
              <Spinner />
              {t("common.sending")}
            </div>
          }
        >
          <SocialLinks />
        </Suspense>
      </div>
      <ContactForm />
    </Section>
  );
};

export { Contact };
