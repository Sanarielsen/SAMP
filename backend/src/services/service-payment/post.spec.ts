import { 
  beforeEach,
  describe,
  expect,
  it
} from "vitest";
import { PostPaymentUseCase } from "@/services/service-payment/post";

import { InMemoryOrderRepository } from "@/repositories/in-memory/in-memory-order-repository";
import { InMemoryPaymentRepository } from "@/repositories/in-memory/in-memory-payment-repository";
import { makeOrder } from "@/services/factories/order/make-order-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { InvalidResourceError } from "@/services/errors/invalid-resource-error";

import { Order } from "@shared/types/orders";

let paymentRepository: InMemoryPaymentRepository
let orderRepository: InMemoryOrderRepository
let sut: PostPaymentUseCase
let newOrder: Order

describe('Post Payment Use Case', () => {
  beforeEach( async () => {
    paymentRepository = new InMemoryPaymentRepository
    orderRepository = new InMemoryOrderRepository
    sut = new PostPaymentUseCase(paymentRepository, orderRepository)

    newOrder = await makeOrder(orderRepository)
  })

  it('should create a payment', async () => {

    const response = await sut.execute({
      orderId: newOrder.id,
      totalInstallments: 5,
      description: 'Test order',
      observation: 'Test observation'
    })

    expect(response).toEqual({
      id: expect.any(String),
    })
  })

  it('should create a payment for a valid order', async () => {

    const newOrder = await makeOrder(orderRepository)

    const newPayment = await paymentRepository.create({
      orderId: newOrder.id,
      totalInstallments: 5,
      description: 'Test order',
      observation: 'Test observation'
    })

    expect(newPayment).toBeDefined()
  })

  it('should not create a payment for a non-existent order', async () => {

    await expect(() => sut.execute({
      orderId: 'order-non-exist',
      totalInstallments: 5,
      description: 'Test order',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not create a payment for a non-activated order', async () => {

    newOrder.deletedAt = new Date()

    await expect(() => sut.execute({
      orderId: newOrder.id,
      totalInstallments: 5,
      description: 'Test order',
    })).rejects.toBeInstanceOf(InvalidResourceError)
  })
})