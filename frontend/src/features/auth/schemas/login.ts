import * as zod from 'zod';

export const loginSchema = zod.object({
  email: zod.string().min(1, 'Um e-mail é obrigatório para essa operacão').email({ message: 'Digite um e-mail válido' }),
  password: zod.string().min(1, 'Uma senha é obrigatória para essa operacão'),
})

export type LoginSchemaFormData = zod.infer<typeof loginSchema>
