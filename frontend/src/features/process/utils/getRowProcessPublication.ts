import type { Field } from "@/utils/field";

import type { ProcessPublication } from "@shared/types/processPublication";


export const processPublicationFields: Field<ProcessPublication>[] = [
  {
    title: 'Revista',
    get: (pp: ProcessPublication) => pp.magazineNumber,
  },
  {
    title: 'Data de publicação',
    get: (pp: ProcessPublication) => new Date(pp.publicationDate).toLocaleDateString(),
  },
  {
    title: 'Despacho',
    get: (pp: ProcessPublication) => pp.dispatch,
  },
  {
    title: 'Certificado',
    get: (pp: ProcessPublication) => pp.certificate,
  },
  {
    title: 'Inteiro Teor',
    get: (pp: ProcessPublication) => pp.description,
  },
  {
    title: 'Complemento do despacho',
    get: (pp: ProcessPublication) => pp.complement,
  },
  {
    title: 'Criado por',
    get: (pp: ProcessPublication) => pp.createdByUser,
  },
  {
    title: 'Atualizado por',
    get: (pp: ProcessPublication) => pp.updatedByUser,
  },
  {
    title: 'Criado em',
    get: (pp: ProcessPublication) => new Date(pp.createdAt).toLocaleDateString(),
  },
  {
    title: 'Atualizado em',
    get: (pp: ProcessPublication) => new Date(pp.updatedAt).toLocaleDateString(),
  },
]