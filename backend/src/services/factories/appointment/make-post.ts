import { PrismaClientRepository } from '@/repositories/prisma/prisma-client-repository'
import { PrismaOrderRepository } from '@/repositories/prisma/prisma-order-repository'
import { PostAppointmentUseCase } from '@/services/service-appointment/post'
import { PrismaAppointmentRepository } from '@/repositories/prisma/prisma-appointment-repository'

export function makePostAppointmentUseCase() {
  const appointmentRepository = new PrismaAppointmentRepository()
  const clientRepository = new PrismaClientRepository()
  const orderRepository = new PrismaOrderRepository()
  const useCase = new PostAppointmentUseCase(
    appointmentRepository,
    clientRepository, 
    orderRepository
  )

  return useCase
}