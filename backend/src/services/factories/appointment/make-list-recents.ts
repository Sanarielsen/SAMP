import { PrismaAppointmentRepository } from '@/repositories/prisma/prisma-appointment-repository'
import { ListRecentAppointmentsUseCase } from '@/services/service-appointment/list-recents'

export function makeListRecentAppointmentUseCase() {
  const appointmentRepository = new PrismaAppointmentRepository()
  const useCase = new ListRecentAppointmentsUseCase(appointmentRepository)

  return useCase
}