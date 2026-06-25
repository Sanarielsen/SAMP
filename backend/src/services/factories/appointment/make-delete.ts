import { PrismaAppointmentRepository } from '@/repositories/prisma/prisma-appointment-repository'
import { DeleteAppointmentUseCase } from '@/services/service-appointment/delete'

export function makeDeleteAppointmentUseCase() {
  const appointmentRepository = new PrismaAppointmentRepository()
  const useCase = new DeleteAppointmentUseCase(appointmentRepository)

  return useCase
}