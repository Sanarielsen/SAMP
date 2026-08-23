import { PrismaAppointmentRepository } from '@/repositories/prisma/appointment'
import { GetAppointmentUseCase } from '@/services/use-cases/appointment/get'

export function makeGetAppointmentUseCase() {
  const appointmentRepository = new PrismaAppointmentRepository()
  const useCase = new GetAppointmentUseCase(appointmentRepository)

  return useCase
}