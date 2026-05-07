import { z } from "zod";

export const addressSchema = z.object({

  cep: z
    .string()
    .min(1, "Informe o CEP."),
  street: z
    .string()
    .min(1, "Informe o logradouro."),
  number: z
    .string()
    .min(1, "Informe o número."),
  district: z
    .string()
    .min(1, "Informe o bairro."),
  city: z
    .string()
    .min(1, "Informe a cidade."),
  state: z
    .string()
    .min(1, "Informe o estado."),
  country: z
    .string()
    .min(1, "Informe o país."),
  complement: z
    .string()
    .optional(),
});

export const updateClientSchema = z.object({

  legalName: z
    .string()
    .min(1, "Informe a razão social."),
  tradeName: z
    .string()
    .min(1, "Informe o nome fantasia."),
  protocol: z
    .string()
    .min(1, "Informe o protocolo."),
  fundationDate: z
    .string()
    .min(1, "Informe a data de fundação."),
    type: z.number({
      message: "Informe o tipo do cliente.",
    }),

  locationAddress:
    addressSchema.refine(
      (value) =>
        value.cep.trim() !== "" &&
        value.street.trim() !== "" &&
        value.number.trim() !== "" &&
        value.city.trim() !== "",
      {
        message:
          "Informe um endereço de localização.",
      }
    ),

  correspondenceAddress:
    addressSchema.refine(
      (value) =>
        value.cep.trim() !== "" &&
        value.street.trim() !== "" &&
        value.number.trim() !== "" &&
        value.city.trim() !== "",
      {
        message:
          "Informe um endereço de correspondência.",
      }
    ),

  draft: z
    .object({
      locationAddress:
        addressSchema.optional(),
      correspondenceAddress:
        addressSchema.optional(),
    })
    .optional(),

  nameContact: z
    .string()
    .min(1, "Informe o nome do contato."),
  numberContact: z
    .string()
    .min(1, "Informe o número do contato."),
});

export type UpdateSchemaFormData =
  z.infer<typeof updateClientSchema>;

export type AddressSchemaFormData =
  z.infer<typeof addressSchema>;