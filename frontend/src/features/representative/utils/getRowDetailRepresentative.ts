import { formatDocument } from "@/utils/formatDocument";
import type { Field } from "@/utils/field";
import type { RepresentativeDetailsDTO } from "@shared/types/representative";

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
    get: (c: RepresentativeDetailsDTO) => new Date(c.createdAt).toLocaleDateString(),
  },
  {
    title: 'Atualizado em',
    get: (c: RepresentativeDetailsDTO) => c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : ""
  },
]