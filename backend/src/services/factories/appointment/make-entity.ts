import { 
  InMemoryAppointmentRepository 
} from '@/repositories/in-memory/in-memory-appointment-repository'

import { CreateAppointmentDTO } from '@shared/types/appointment'


export async function makeAppointment(
  repository: InMemoryAppointmentRepository,
  override: Partial<CreateAppointmentDTO> = {},
) {

  return repository.create({
    userId: 'user-test',
    clientId: 'client-test',
    description: 'Appointment test',
    appointmentAt: new Date(new Date().getDate() + 5),

    ...override,
  })
}