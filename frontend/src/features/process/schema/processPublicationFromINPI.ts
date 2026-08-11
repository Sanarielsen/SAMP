import { z } from "zod";


const publicationSchema = z.object({
  magazineNumber: z.string(),
  publicationDate: z.string(),
  dispatch: z.string(),
  certificate: z.string(),
  description: z.string(),
  complement: z.string(),
});

export const publicationFormSchema = z.object({
  publications: z
    .array(publicationSchema)
    .min(1, 'Selecione ao menos uma publicação.'),
});

export type PublicationFormData = z.infer<
  typeof publicationFormSchema
>;