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

const ContactForm = () => {
  const form = useForm({
    resolver: zodResolver(sendContactSchema),
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
      onSubmit={form.handleSubmit(sendContactEmail)}
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
                <FieldLabel>Nome</FieldLabel>
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
                <FieldLabel>Assunto</FieldLabel>
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
                <FieldLabel>Email</FieldLabel>
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
                <FieldLabel>Mensagem</FieldLabel>
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
        <ButtonGroup>
          <LinkedInButton />
          <GitHubButton />
        </ButtonGroup>
        <LoadingButton
          className="min-w-20"
          size="lg"
          isLoading={form.formState.isSubmitting}
        >
          Enviar
        </LoadingButton>
      </div>
    </form>
  );
};

const Contact = () => {
  return (
    <Section>
      <h2>Contato</h2>
      <ContactForm />
    </Section>
  );
};

export { Contact };
