import type { UpdateSchemaFormData } from "@/features/client/schema/updateClientSchema";

export const emptyClient:
  UpdateSchemaFormData = {

  legalName: "",
  tradeName: "",
  protocol: "",
  fundationDate: "",

  type: 0,

  locationAddress: {
    cep: "",
    street: "",
    number: "",
    district: "",
    city: "",
    state: "",
    country: "",
    complement: "",
  },

  correspondenceAddress: {
    cep: "",
    street: "",
    number: "",
    district: "",
    city: "",
    state: "",
    country: "",
    complement: "",
  },

  nameContact: "",
  numberContact: "",

  draft: {
    locationAddress: undefined,
    correspondenceAddress: undefined,
  },
};