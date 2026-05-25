import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { DeleteOrderUseCase } from "@/services/service-orders/delete";

import { OrderRepository } from "@/repositories/order-repository";
import { InMemoryOrderRepository } from "@/repositories/in-memory/in-memory-order-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

let orderRepository: OrderRepository
let sut: DeleteOrderUseCase

describe('Delete Order Use Case', () => {
  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository();
    sut = new DeleteOrderUseCase(orderRepository);
  })

  it('should delete an order from the database', async () => {
    
    const createdOrder = await orderRepository.create({
      clientId: 'client-1',
      orderTypeId: 1,
      eventDate: new Date(Date.now()),
      observation: 'Order test'
    })

    await sut.execute(createdOrder.id)

    const orderAfterExcluided = await 
      orderRepository.findManyByClientId('client-1')

    expect(orderAfterExcluided).toHaveLength(0)
  })

  it('should throw an error when an invalid order id is sent', async () => {

    await expect(() => 
      sut.execute('invalid-id')
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})