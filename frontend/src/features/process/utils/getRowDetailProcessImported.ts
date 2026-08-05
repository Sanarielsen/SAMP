import type { Field } from "@/utils/field";
import { formatDateTimeBrazil } from "@/utils/formatDateTimeBrazil";

import type { ImportedProcess } from "@shared/types/importedProcess";


export const processImportedFields: Field<ImportedProcess>[] = [
  {
    title: 'Número do processo',
    get: (field: ImportedProcess) => field.processNumber,
  },
  {
    title: 'Titular',
    get: (field: ImportedProcess) => field.holder,
  },
  // {
  //   title: 'Procurador',
  //   get: (field: ImportedProcess) => field.attorney,
  // },
  {
    title: 'Apresentação',
    get: (field: ImportedProcess) => field.presentation,
  },
  {
    title: 'Natureza',
    get: (field: ImportedProcess) => field.nature,
  },
  // {
  //   title: 'Nome da marca',
  //   get: (field: ImportedProcess) => field.markName,
  // },
  // {
  //   title: 'NCL',
  //   get: (field: ImportedProcess) => field.ncl,
  // },
  {
    title: 'Especificação',
    get: (field: ImportedProcess) => field.specification,
  },
  // {
  //   title: 'Especificação traduzida',
  //   get: (field: ImportedProcess) => field.translatedSpecification,
  // },
  // {
  //   title: 'Registro internacional',
  //   get: (field: ImportedProcess) => field.internationalRegistrationNumber,
  // },
  // {
  //   title: 'CFE',
  //   get: (field: ImportedProcess) => field.cfe,
  // },
  {
    title: 'Data de depósito',
    get: (field: ImportedProcess) => formatDateTimeBrazil(field.filingDate),
  },
  {
    title: 'Data de recebimento',
    get: (field: ImportedProcess) => formatDateTimeBrazil(field.grantDate),
  },
  {
    title: 'Data de concessão',
    get: (field: ImportedProcess) => formatDateTimeBrazil(field.expirationDate),
  },
  {
    title: 'Criado em',
    get: (field: ImportedProcess) => formatDateTimeBrazil(field.createdAt),
  },
]