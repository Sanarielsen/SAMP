import { z } from "zod";


export const newMagazineSchema = z.object({
  categoryId: z.string({error: 'Informe a categoria que os processos serão importados.'}).min(1, 'Informe a categoria que os processos serão importados.'),
  numberMagazine: z.string({error: 'Informe a revista a ser utilizada nessa importação.'}).min(1, 'Informe a revista a ser utilizada nessa importação.'),
  fileMagazine: z.instanceof(File, {
    message: "Selecione uma revista válida para extracão dos processos.",
  }).superRefine((file, ctx) => {
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      ctx.addIssue({
        code: "custom",
        message: "A revista deve ser um PDF.",
      });
    }
  }),
});

export type NewMagazineFormData = z.infer<typeof newMagazineSchema>;