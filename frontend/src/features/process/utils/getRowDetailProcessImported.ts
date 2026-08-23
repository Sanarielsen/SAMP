import type { Field } from "@/types/field";
import { formatDate } from "@/utils/manageDate";

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
  {
    title: 'Apresentação',
    get: (field: ImportedProcess) => field.presentation,
  },
  {
    title: 'Natureza',
    get: (field: ImportedProcess) => field.nature,
  },
  {
    title: 'Classe nice',
    get: (field: ImportedProcess) => field.niceTitle,
  },
  {
    title: 'Status da classe:',
    get: (field: ImportedProcess) => field.niceStatus,
  },
  {
    title: 'Especificação',
    get: (field: ImportedProcess) => field.niceSpecification,
  },
  {
    title: 'Data de depósito',
    get: (field: ImportedProcess) => formatDate(field.filingDate),
  },
  {
    title: 'Data de recebimento',
    get: (field: ImportedProcess) => formatDate(field.grantDate),
  },
  {
    title: 'Data de concessão',
    get: (field: ImportedProcess) => formatDate(field.expirationDate),
  },
  {
    title: 'Criado em',
    get: (field: ImportedProcess) => formatDate(field.createdAt),
  },
]