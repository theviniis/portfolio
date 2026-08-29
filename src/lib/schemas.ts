import z from "zod";

export const sendContactSchema = z.object({
  name: z.string().min(3, "O nome precisa ter pelo menos 3 caractéres"),
  email: z.email("O email precisa ser válido"),
  subject: z.string().min(3, "O assunto precisa ter pelo menos 3 caractéres"),
  message: z.string().min(5, "A mensagem precisa ter pelo menos 3 caractéres"),
  _gotcha: z.string().optional(),
});

export type SendContactSchemaType = z.infer<typeof sendContactSchema>;
