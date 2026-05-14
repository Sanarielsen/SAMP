import type { UpdateSchemaFormData } from "@/features/client/schema/updateClientSchema";

//Mock List Clients => /clients
export const MOCK_CLIENTS = [
  { id: 1, name: "Samuel Henrique" },
  { id: 2, name: "Abilio Correa" },
  { id: 3, name: "Alves Junior" },
  { id: 4, name: "Danillo Bosco" },
  { id: 5, name: "Monica Craveiro" },
  { id: 6, name: "Pachi Parra" },
  { id: 7, name: "Laisa Grijo" },
];

export const mockClient:
  UpdateSchemaFormData = {

  legalName:
    "Empresa Exemplo LTDA",

  tradeName:
    "Empresa Exemplo",

  protocol:
    "111.222.333-44",

  fundationDate:
    "10/05/2026",

  type: 1,

  locationAddress: {
    cep: "01001-000",
    street: "Praça da Sé",
    number: "100",
    district: "Sé",
    city: "São Paulo",
    state: "SP",
    country: "Brasil",
    complement: "Sala 10",
  },

  correspondenceAddress: {
    cep: "20040-020",
    street: "Rua da Assembleia",
    number: "50",
    district: "Centro",
    city: "Rio de Janeiro",
    state: "RJ",
    country: "Brasil",
    complement: "",
  },

  nameContact:
    "Samuel Henrique",

  numberContact:
    "(11) 91212-2121",
};

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