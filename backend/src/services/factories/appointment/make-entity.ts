import { 
  InMemoryAppointmentRepository 
} from '@/repositories/in-memory/in-memory-appointment-repository'

import { Appointment } from '@shared/types/appointment'
import dayjs from 'dayjs'


export async function makeAppointment(
  repository: InMemoryAppointmentRepository,
  override: Partial<Appointment> = {},
) {

  return repository.create({
    clientId: 'client-test',
    description: 'Appointment test',
    appointmentAt: dayjs().add(5, "day").toDate(),

    ...override,
  })
}