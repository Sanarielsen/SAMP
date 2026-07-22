import type { Field } from "@/utils/field";
import { formatDateTimeBrazil } from "@/utils/formatDateTimeBrazil";

import type { ProcessHistoryDetailDTO } from "@shared/types/processHistory";


export const processHistoryFields: Field<ProcessHistoryDetailDTO>[] = [
  {
    title: 'Descricão',
    get: (field: ProcessHistoryDetailDTO) => field.categoryName,
  },
    {
    title: 'Número da revista',
    get: (field: ProcessHistoryDetailDTO) => field.numberMagazine,
  },
  {
    title: 'Nome do arquivo',
    get: (field: ProcessHistoryDetailDTO) => field.fileName,
  },
  {
    title: 'Criado em',
    get: (field: ProcessHistoryDetailDTO) => formatDateTimeBrazil(field.createdAt)
  },
]