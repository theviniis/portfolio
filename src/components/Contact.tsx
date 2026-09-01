import { useTranslation } from "react-i18next";
import { Section } from "./ui/Section";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { ButtonGroup } from "./ui/button-group";
import { LinkedInButton } from "./ui/linkedin-button";
import { GitHubButton } from "./ui/github-button";
import { sendContactEmail } from "@/lib/service";
import { sendContactSchema } from "@/lib/schemas";
import { LoadingButton } from "./ui/loading-button";
import { Button } from "./ui/button";

import cvUrlPt from "../assets/vinicius_costa_cv.docx?url";
import cvUrlEn from "../assets/vinicius_costa_cv_en.docx?url";

const CV_MAP: Record<string, { url: string; filename: string }> = {
  'pt-BR': { url: cvUrlPt, filename: 'vinicius_costa_cv.docx' },
  'en-US': { url: cvUrlEn, filename: 'vinicius_costa_cv_en.docx' }
};

const ContactForm = () => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(sendContactSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  return (
    <form
      className="space-y-8"
      id="contact-form"
      onSubmit={form.handleSubmit((data) => sendContactEmail(data, t))}
    >
      <div>
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          className="hidden absolute opacity-0 pointer-events-none w-0 h-0"
        />
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>{t('contact.formFields.name')}</FieldLabel>
                <Input {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="subject"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>{t('contact.formFields.subject')}</FieldLabel>
                <Input {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>{t('contact.formFields.email')}</FieldLabel>
                <Input {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>{t('contact.formFields.message')}</FieldLabel>
                <Textarea {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      <Separator />
      <div className="flex gap-4 justify-end">
        <LoadingButton
          className="min-w-20"
          size="lg"
          isLoading={form.formState.isSubmitting}
        >
          {t('contact.sendButton')}
        </LoadingButton>
      </div>
    </form>
  );
};

const Contact = () => {
  const { t, i18n } = useTranslation();
  const cv = CV_MAP[i18n.language] || CV_MAP['pt-BR'];

  return (
    <Section id="contact">
      <div className="space-y-4">
        <h2>{t('contact.title')}</h2>
        <div>
          <p>
            {t('contact.emailLabel')}{" "}
            <Button className="p-0 text-base" variant="link" asChild>
              <a href={`mailto:${t('contact.email')}`}>
                {t('contact.email')}
              </a>
            </Button>
          </p>

          <p>
            {t('contact.cvLabel')}{" "}
            <Button className="p-0 text-base" variant="link" asChild>
              <a href={cv.url} download={cv.filename}>
                {t('contact.cvLink')}
              </a>
            </Button>
          </p>
        </div>
        <ButtonGroup className="mt-8">
          <LinkedInButton />
          <GitHubButton />
        </ButtonGroup>
      </div>
      <ContactForm />
    </Section>
  );
};

export { Contact };
