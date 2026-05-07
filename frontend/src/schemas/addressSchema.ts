import * as zod from 'zod';

export const addressSchema = zod.object({
  cep: zod.string().min(1, "Informe um CEP para prosseguir."),
  street: zod.string().min(1, "Informe um lougradouro (Nome da rua) para prosseguir."),
  number: zod.string().min(1, "Informe um número do perimetro para prosseguir."),
  district: zod.string().min(1, "Informe um bairro para posseguir."),
  city: zod.string().min(1, "Informe uma cidade para posseguir."),
  state: zod.string().min(1, "Informe um estado para posseguir."),
  country: zod.string().min(1, "Informe um pais para posseguir."),
  complement: zod.string(),
})

export type AddressSchemaFormData = zod.infer<typeof addressSchema>
