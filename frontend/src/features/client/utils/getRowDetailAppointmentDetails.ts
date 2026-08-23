import type { Field } from "@/types/field";
import { formatDate } from "@/utils/manageDate";


import type { DetailAppointmentDTO } from "@shared/types/appointment";

export const appointmentFields: Field<DetailAppointmentDTO>[] = [
  {
    title: 'Descricão',
    get: (field: DetailAppointmentDTO) => field.description,
  },
  {
    title: 'Data da agenda',
    get: (field: DetailAppointmentDTO) => formatDate(field.appointmentAt)
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
    get: (field: DetailAppointmentDTO) => formatDate(field.createdAt)
  },
  {
    title: 'Atualizado em',
    get: (field: DetailAppointmentDTO) => formatDate(field.updatedAt)
  },
]