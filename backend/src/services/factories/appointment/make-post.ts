import { PrismaClientRepository } from '@/repositories/prisma/client'
import { PrismaOrderRepository } from '@/repositories/prisma/order'
import { PostAppointmentUseCase } from '@/services/use-cases/appointment/post'
import { PrismaAppointmentRepository } from '@/repositories/prisma/appointment'
import { PrismaUserRepository } from '@/repositories/prisma/user'

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