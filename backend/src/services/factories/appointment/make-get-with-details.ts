import { PrismaAppointmentRepository } from '@/repositories/prisma/appointment'
import { GetWithDetailsAppointmentUseCase } from '@/services/use-cases/appointment/get-with-details'

export function makeGetWithDetailsAppointmentUseCase() {
  const appointmentRepository = new PrismaAppointmentRepository()
  const useCase = new GetWithDetailsAppointmentUseCase(appointmentRepository)

  return useCase
}