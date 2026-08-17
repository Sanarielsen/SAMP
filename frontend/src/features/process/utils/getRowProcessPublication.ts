import type { Field } from "@/utils/field";
import { formatDate } from "@/utils/formatDateCode";

import type { ProcessPublicationDetails } from "@shared/types/processPublication";


export const processPublicationFields: Field<ProcessPublicationDetails>[] = [
  {
    title: 'Revista',
    get: (pp: ProcessPublicationDetails) => pp.magazineNumber,
  },
  {
    title: 'Data de publicação',
    get: (pp: ProcessPublicationDetails) => formatDate(pp.publicationDate),
  },
  {
    title: 'Despacho',
    get: (pp: ProcessPublicationDetails) => pp.dispatch,
  },
  {
    title: 'Certificado',
    get: (pp: ProcessPublicationDetails) => pp.certificate,
  },
  {
    title: 'Inteiro Teor',
    get: (pp: ProcessPublicationDetails) => pp.description,
  },
  {
    title: 'Complemento do despacho',
    get: (pp: ProcessPublicationDetails) => pp.complement,
  },
  {
    title: 'Criado por',
    get: (pp: ProcessPublicationDetails) => pp.createdBy,
  },
  {
    title: 'Atualizado por',
    get: (pp: ProcessPublicationDetails) => pp.updatedBy,
  },
  {
    title: 'Criado em',
    get: (pp: ProcessPublicationDetails) => formatDate(pp.createdAt),
  },
  {
    title: 'Atualizado em',
    get: (pp: ProcessPublicationDetails) => formatDate(pp.updatedAt),
  },
]