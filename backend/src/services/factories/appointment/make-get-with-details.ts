import { PrismaAppointmentRepository } from '@/repositories/prisma/prisma-appointment-repository'
import { GetWithDetailsAppointmentUseCase } from '@/services/use-cases/appointment/get-with-details'

export function makeGetWithDetailsAppointmentUseCase() {
  const appointmentRepository = new PrismaAppointmentRepository()
  const useCase = new GetWithDetailsAppointmentUseCase(appointmentRepository)

  return useCase
}