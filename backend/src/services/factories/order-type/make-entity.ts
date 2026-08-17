import { InMemoryOrderTypeRepository } from '@/repositories/in-memory/order-type'

import { OrderTypeCreateDTO } from '@shared/types/orderType'


export async function makeOrderType(
  paymentMethodsRepository: InMemoryOrderTypeRepository,
  override: Partial<OrderTypeCreateDTO> = {},
) {

  return paymentMethodsRepository.create({
    title: 'title-test',
    order: 1,
    description: 'description-test',

    ...override,
  })
}