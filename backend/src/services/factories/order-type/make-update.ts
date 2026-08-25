import { PrismaOrderTypeRepository } from '@/repositories/prisma/order-type'
import { UpdateOrderTypeUseCase } from '@/services/use-cases/order-type/update'


export function makeUpdateOrderTypeUseCase() {
  const orderTypeRepository = new PrismaOrderTypeRepository()

  return new UpdateOrderTypeUseCase(
    orderTypeRepository, 
  )
}