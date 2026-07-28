import z from "zod";

export const updatePasswordSchema = z
  .object({
    password: z
      .string({
        error: "Informe uma senha válida para prosseguir.",
      })
      .min(1, "Informe uma senha válida para prosseguir.")
      .regex(/[a-z]/, "A senha deve conter uma letra minúscula.")
      .regex(/[A-Z]/, "A senha deve conter uma letra maiúscula.")
      .regex(/\d/, "A senha deve conter um número.")
      .regex(/[^A-Za-z0-9]/, "A senha deve conter um símbolo."),

    confirm: z
      .string({
        error: "Confirme sua senha para prosseguir.",
      })
      .min(1, "Confirme sua senha para prosseguir."),
  })
  .refine((data) => data.password === data.confirm, {
    message: "As senhas não coincidem.",
    path: ["confirm"],
  });

export type UpdatePasswordSchemaFormData =
  z.infer<typeof updatePasswordSchema>;