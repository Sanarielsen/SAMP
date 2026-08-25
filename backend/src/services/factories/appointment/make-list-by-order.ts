import { PrismaAppointmentRepository } from '@/repositories/prisma/appointment'
import { PrismaOrderRepository } from '@/repositories/prisma/order'
import { ListAppointmentsByOrderUseCase } from '@/services/use-cases/appointment/list-by-order'


export function makeListAppointmentByOrderUseCase() {
  const appointmentRepository = new PrismaAppointmentRepository()
  const orderRepository = new PrismaOrderRepository()
  const useCase = new ListAppointmentsByOrderUseCase(
    appointmentRepository,
    orderRepository,
  )

  return useCase
}