import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { sendContactEmail } from "@/lib/service";
import { sendContactSchema } from "@/lib/schemas";
import { LoadingButton } from "./ui/loading-button";

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
                <FieldLabel htmlFor={field.name}>{t("contact.formFields.name")}</FieldLabel>
                <Input id={field.name} {...field} />
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
                <FieldLabel htmlFor={field.name}>{t("contact.formFields.subject")}</FieldLabel>
                <Input id={field.name} {...field} />
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
                <FieldLabel htmlFor={field.name}>{t("contact.formFields.email")}</FieldLabel>
                <Input id={field.name} {...field} />
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
                <FieldLabel htmlFor={field.name}>{t("contact.formFields.message")}</FieldLabel>
                <Textarea id={field.name} {...field} />
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
          {t("contact.sendButton")}
        </LoadingButton>
      </div>
    </form>
  );
};

export { ContactForm };
