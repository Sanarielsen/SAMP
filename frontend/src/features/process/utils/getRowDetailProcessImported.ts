import type { Field } from "@/utils/field";
import { formatDateTimeBrazil } from "@/utils/formatDateTimeBrazil";

import type { DetailsProcessImportedDTO } from "@shared/types/processImported";


export const processImportedFields: Field<DetailsProcessImportedDTO>[] = [
  {
    title: 'Número do processo',
    get: (field: DetailsProcessImportedDTO) => field.processNumber,
  },
  {
    title: 'Títular',
    get: (field: DetailsProcessImportedDTO) => field.holder,
  },
  {
    title: 'Tipo do processo',
    get: (field: DetailsProcessImportedDTO) => field.processTypeName
  },
  {
    title: 'Criado em',
    get: (field: DetailsProcessImportedDTO) => formatDateTimeBrazil(field.createdAt)
  },
]