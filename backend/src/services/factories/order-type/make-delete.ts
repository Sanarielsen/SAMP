import { PrismaOrderTypeRepository } from '@/repositories/prisma/order-type'
import { DeleteOrderTypeUseCase } from '@/services/use-cases/order-type/delete'


export function makeDeleteOrderType() {
  const orderTypeRepository = new PrismaOrderTypeRepository()

  return new DeleteOrderTypeUseCase(
    orderTypeRepository, 
  )
}