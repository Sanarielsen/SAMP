import * as zod from 'zod';

export const forgotPasswordSchema = zod.object({
  email: zod.string().min(1, 'Um e-mail é obrigatório para essa operacão').email({ message: 'Digite um e-mail válido' }),  
})

export type forgotPasswordSchemaFormData = zod.infer<typeof forgotPasswordSchema>
