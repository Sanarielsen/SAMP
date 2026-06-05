import z from "zod";

export const manageUserSchema = z.object({
  name: z.string({
    error: 'Nome obrigatório.'
  }).min(1, 'Nome obrigatório.'),
  email: z.string({
    error: 'Email obrigatório.'
  }).min(1, 'Email obrigatório.'),
  roleId: z.string(({
    error: 'Selecione um cargo.'
  }))
})

export type ManageUserSchemaFormData =
  z.infer<typeof manageUserSchema>;