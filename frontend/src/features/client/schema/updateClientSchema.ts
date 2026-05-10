import * as zod from 'zod';

export const updateClientSchema = zod.object({

  legalName: zod.string({
    message: "Informe uma razão social.",
  }),
  tradeName: zod.string({
    message: "Informe um nome fantasia."
  }),
  type: zod.number({
    message: "Informe um tipo de pessoa.",
  }),
  protocol: zod.string({
    message: "Informa o documento desse cliente (CPF ou CNPJ).",
  }),
  fundationDate: zod.string({
    message: "Informa a data de fundacão do cliente.",
  }),
  locationAddress: zod.string({
    message: "Informa um endereco de localizaçao desse cliente."
  }),
  correspondenceAddress: zod.string({
    message: "Informa um endereco de correspondencia desse cliente."
  }),
  nameContact: zod.string({
    message: "Informa o nome deste contato."
  }),
  numberContact: zod.string({
    message: "Informa o número deste contato."
  }),
})

export type UpdateSchemaFormData = zod.infer<typeof updateClientSchema>
