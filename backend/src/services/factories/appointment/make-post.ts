import { PrismaClientRepository } from '@/repositories/prisma/prisma-client-repository'
import { PrismaOrderRepository } from '@/repositories/prisma/prisma-order-repository'
import { PostAppointmentUseCase } from '@/services/service-appointment/post'
import { PrismaAppointmentRepository } from '@/repositories/prisma/prisma-appointment-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export function makePostAppointmentUseCase() {
  const appointmentRepository = new PrismaAppointmentRepository()
  const clientRepository = new PrismaClientRepository()
  const userRepository = new PrismaUserRepository()
  const orderRepository = new PrismaOrderRepository()
  const useCase = new PostAppointmentUseCase(
    appointmentRepository,
    clientRepository,
    userRepository,
    orderRepository
  )

  return useCase
}