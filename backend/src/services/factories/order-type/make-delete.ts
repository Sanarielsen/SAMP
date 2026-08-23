import { PrismaOrderTypeRepository } from '@/repositories/prisma/order-type'
import { DeleteOrderTypeUseCase } from '@/services/use-cases/order-type/delete'


export function makeDeleteOrderTypeUseCase() {
  const orderTypeRepository = new PrismaOrderTypeRepository()

  return new DeleteOrderTypeUseCase(
    orderTypeRepository, 
  )
}