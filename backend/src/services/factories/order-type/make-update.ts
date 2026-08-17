import { PrismaOrderTypeRepository } from '@/repositories/prisma/order-type'
import { UpdateOrderTypeUseCase } from '@/services/service-order-type/update'


export function makeUpdateOrderType() {
  const orderTypeRepository = new PrismaOrderTypeRepository()

  return new UpdateOrderTypeUseCase(
    orderTypeRepository, 
  )
}