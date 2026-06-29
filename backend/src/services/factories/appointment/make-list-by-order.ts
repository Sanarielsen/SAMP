import { PrismaAppointmentRepository } from '@/repositories/prisma/prisma-appointment-repository'
import { PrismaOrderRepository } from '@/repositories/prisma/prisma-order-repository'
import { ListAppointmentsByOrderUseCase } from '@/services/service-appointment/list-by-order'

export function makeListAppointmentByOrderUseCase() {
  const appointmentRepository = new PrismaAppointmentRepository()
  const orderRepository = new PrismaOrderRepository()
  const useCase = new ListAppointmentsByOrderUseCase(
    appointmentRepository,
    orderRepository,
  )

  return useCase
}