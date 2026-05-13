import type { Field } from "@/utils/field";
import type { Client } from "../types/clients";

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
    get: (c: Client) => new Date(c.dataFundation).toLocaleDateString(),
  },
  {
    title: 'Endereco de localidade',
    get: (c: Client) => c.locationAddress,
  },
  {
    title: 'Endereco de correspondencia',
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
    get: (c: Client) => new Date(c.createdAt).toLocaleDateString(),
  },
  {
    title: 'Atualizado em',
    get: (c: Client) => new Date(c.updatedAt).toLocaleDateString(),
  },
]