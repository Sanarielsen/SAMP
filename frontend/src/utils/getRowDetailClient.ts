import type { Client } from "@/features/client/types/clients";
import type { Field } from "@/types/field";
import { formatDate } from "./manageDate";

export const clientFields: Field<Client>[] = [
  {
    title: 'Status',
    get: (c: Client) => c.isActivated ? "Ativo" : "Inativo",
  },
  {
    title: 'Razão Social',
    get: (c: Client) => c.legalName,
  },
  {
    title: 'Nome Fantasia',
    get: (c: Client) => c.tradeName,
  },
  {
    title: 'Protocolo',
    get: (c: Client) => c.protocol,
  },
  {
    title: 'Data de fundacão',
    get: (c: Client) => formatDate(c.dataFundation),
  },
  {
    title: 'Endereco de localidade',
    get: (c: Client) => c.locationAddress,
  },
  {
    title: 'Endereco de correspondência',
    get: (c: Client) => c.correspondenceAddress,
  },
  {
    title: 'Nome de contato',
    get: (c: Client) => c.nameContact,
  },
  {
    title: 'Número do contato',
    get: (c: Client) => c.numberContact,
  },
  {
    title: 'Criado em',
    get: (c: Client) => formatDate(c.createdAt, true),
  },
  {
    title: 'Atualizado em',
    get: (c: Client) => formatDate(c.updatedAt, true),
  },
]