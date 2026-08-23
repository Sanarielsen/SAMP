import { formatDocument } from "@/utils/formatDocument";
import type { Field } from "@/types/field";
import type { RepresentativeDetailsDTO } from "@shared/types/representative";
import { formatDate } from "@/utils/manageDate";

export const representativeFields: Field<RepresentativeDetailsDTO>[] = [
  {
    title: 'Nome',
    get: (c: RepresentativeDetailsDTO) => c.name,
  },
  {
    title: 'Nacionalidade',
    get: (c: RepresentativeDetailsDTO) => c.nationality,
  },
  {
    title: 'RG',
    get: (c: RepresentativeDetailsDTO) => formatDocument(c.documentRG),
  },
  {
    title: 'CPF',
    get: (c: RepresentativeDetailsDTO) => formatDocument(c.documentCPF),
  },
  {
    title: 'Profissão',
    get: (c: RepresentativeDetailsDTO) => c.titleJob,
  },
  {
    title: 'Cargo',
    get: (c: RepresentativeDetailsDTO) => c.roleJob,
  },
  {
    title: 'Criado em',
    get: (c: RepresentativeDetailsDTO) => formatDate(c.createdAt, true)
  },
  {
    title: 'Atualizado em',
    get: (c: RepresentativeDetailsDTO) => c.updatedAt ? formatDate(c.updatedAt, true) : ""
  },
]