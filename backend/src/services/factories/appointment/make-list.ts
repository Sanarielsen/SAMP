import { PrismaClientRepository } from '@/repositories/prisma/prisma-client-repository'
import { PrismaAppointmentRepository } from '@/repositories/prisma/prisma-appointment-repository'
import { ListAppointmentUseCase } from '@/services/service-appointment/list'

export function makeListAppointmentUseCase() {
  const appointmentRepository = new PrismaAppointmentRepository()
  const clientRepository = new PrismaClientRepository()
  const useCase = new ListAppointmentUseCase(
    appointmentRepository,
    clientRepository,
  )

  return useCase
}