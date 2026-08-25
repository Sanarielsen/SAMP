import { PrismaClientRepository } from '@/repositories/prisma/client'
import { PrismaAppointmentRepository } from '@/repositories/prisma/appointment'
import { ListAppointmentUseCase } from '@/services/use-cases/appointment/list'

export function makeListAppointmentUseCase() {
  const appointmentRepository = new PrismaAppointmentRepository()
  const clientRepository = new PrismaClientRepository()
  const useCase = new ListAppointmentUseCase(
    appointmentRepository,
    clientRepository,
  )

  return useCase
}