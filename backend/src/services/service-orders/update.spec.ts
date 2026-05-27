import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { UpdateOrderUseCase } from "@/services/service-orders/update";

import { OrderRepository } from "@/repositories/order-repository";

import { InMemoryOrderRepository } from "@/repositories/in-memory/in-memory-order-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

let orderRepository: OrderRepository
let sut: UpdateOrderUseCase

describe('Update Order Use Case', () => {
  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository();
    sut = new UpdateOrderUseCase(orderRepository)
  })

  it('should update the order observation', async () => {

    const createdOrder =
      await orderRepository.create({
        clientId: 'client-1',
        orderTypeId: 1,
        observation: 'Old observation',
        eventDate: new Date(),
      })

    const orderUpdated = await sut.execute({
      id: createdOrder.id,
      observation: 'New observation'
    })

    expect(orderUpdated.observation)
      .toBe('New observation')
  })

  it('should return an error when updating an invalid order', async () => {

    await expect(() =>
      sut.execute({
        id: 'invalid-order',
        observation: 'New observation'
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})