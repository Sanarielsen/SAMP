import { z } from "zod";

export const newMagazineSchema = z.object({
  file: z.instanceof(File, {
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