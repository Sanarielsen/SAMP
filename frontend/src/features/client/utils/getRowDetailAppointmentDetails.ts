import type { Field } from "@/utils/field";
import { formatDateTimeBrazil } from "@/utils/formatDateTimeBrazil";

import type { DetailAppointmentDTO } from "@shared/types/appointment";

export const appointmentFields: Field<DetailAppointmentDTO>[] = [
  {
    title: 'Descricão',
    get: (field: DetailAppointmentDTO) => field.description,
  },
  {
    title: 'Data da agenda',
    get: (field: DetailAppointmentDTO) => formatDateTimeBrazil(field.appointmentAt)
  },
  {
    title: 'Nome do cliente',
    get: (field: DetailAppointmentDTO) => field.nameClient,
  },
  {
    title: 'Titúlo da ordem',
    get: (field: DetailAppointmentDTO) => field.titleOrder,
  },
  {
    title: 'Criado em',
    get: (field: DetailAppointmentDTO) => formatDateTimeBrazil(field.createdAt)
  },
  {
    title: 'Atualizado em',
    get: (field: DetailAppointmentDTO) => formatDateTimeBrazil(field.updatedAt)
  },
]