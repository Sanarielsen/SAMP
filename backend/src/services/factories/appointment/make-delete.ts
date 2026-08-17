import { PrismaAppointmentRepository } from '@/repositories/prisma/prisma-appointment-repository'
import { DeleteAppointmentUseCase } from '@/services/use-cases/appointment/delete'

export function makeDeleteAppointmentUseCase() {
  const appointmentRepository = new PrismaAppointmentRepository()
  const useCase = new DeleteAppointmentUseCase(appointmentRepository)

  return useCase
}