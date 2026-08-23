import { InMemoryOrderRepository }
  from '@/repositories/in-memory/order'

import { CreateOrderDTO } from '@shared/types/orders'


export async function makeOrder(
  orderRepository: InMemoryOrderRepository,
  override: Partial<CreateOrderDTO> = {},
) {

  return orderRepository.create({
    clientId: 'client-test',
    orderTypeId: 1,
    description: 'description test',
    observation: null,
    eventDate: new Date(),

    ...override,
  })
}