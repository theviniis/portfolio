import z from 'zod'

export const sendContactSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(3, t('validation.nameMin')),
    email: z.email(t('validation.emailInvalid')),
    subject: z.string().min(3, t('validation.subjectMin')),
    message: z.string().min(5, t('validation.messageMin')),
    _gotcha: z.string().optional()
  })

export type SendContactSchemaType = z.infer<
  ReturnType<typeof sendContactSchema>
>
