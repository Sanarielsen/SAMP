import type { Field } from "@/utils/field";
import { formatDateTimeBrazil } from "@/utils/formatDateTimeBrazil";

import type { DetailsProcessHistoryDTO } from "@shared/types/processHistoric";


export const processHistoryFields: Field<DetailsProcessHistoryDTO>[] = [
  {
    title: 'Descricão',
    get: (field: DetailsProcessHistoryDTO) => field.categoryName,
  },
    {
    title: 'Número da revista',
    get: (field: DetailsProcessHistoryDTO) => field.numberMagazine,
  },
  {
    title: 'Nome do arquivo',
    get: (field: DetailsProcessHistoryDTO) => field.fileName,
  },
  {
    title: 'Criado em',
    get: (field: DetailsProcessHistoryDTO) => formatDateTimeBrazil(field.createdAt)
  },
]