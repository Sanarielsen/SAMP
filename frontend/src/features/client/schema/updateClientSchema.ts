import * as zod from 'zod';

export const updateClientSchema = zod.object({

  legalName: zod.string().min(1, "Informe uma razão social"),
  tradeName: zod.string().min(1, "Informe um nome fantasia"),
  type: zod.number(),
  protocol: zod.string().min(1, "Informa o documento desse cliente (CPF ou CNPJ)"),
  fundationDate: zod.string().min(1, "Informa a data de fundacão do cliente"),
  locationAddress: zod.string().min(1, "Informa um endereco de localidade desse cliente"),
  correspondenceAddress: zod.string().min(1, "Informa um endereco de correspondencia desse cliente"),
  nameContact: zod.string().min(1, "Informa um nome do contato a ser buscado"),
  numberContact: zod.string().min(1, "Informa o contato desse contato a ser buscado"),
})

export type UpdateSchemaFormData = zod.infer<typeof updateClientSchema>
