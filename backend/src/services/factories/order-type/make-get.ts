import { PrismaOrderTypeRepository } from '@/repositories/prisma/order-type'
import { GetOrderTypeUseCase } from '@/services/service-order-type/get'


export function makeGetOrderType() {
  const orderTypeRepository = new PrismaOrderTypeRepository()

  return new GetOrderTypeUseCase(
    orderTypeRepository, 
  )
}