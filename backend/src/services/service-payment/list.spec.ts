import { InMemoryOrderRepository } from "@/repositories/in-memory/in-memory-order-repository";
import { InMemoryPaymentRepository } from "@/repositories/in-memory/in-memory-payment-repository";
import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { ListPaymentsUseCase } from "@/services/service-payment/list";

import { makeOrder } from "@/services/factories/order/make-order-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { Order } from "@shared/types/orders";

let paymentsRepository: InMemoryPaymentRepository
let ordersRepository: InMemoryOrderRepository
let sut: ListPaymentsUseCase
let newOrder: Order

describe('List Payments Use Case', () => {
  beforeEach( async () => {
    paymentsRepository = new InMemoryPaymentRepository();
    ordersRepository = new InMemoryOrderRepository();
    sut = new ListPaymentsUseCase(paymentsRepository, ordersRepository)

    newOrder = await makeOrder(ordersRepository)
  })

  it('should list payments for a valid order', async () => {
    const payments = await sut.execute({
      orderId: newOrder.id,
    })

    expect(payments).toBeTruthy()
  })

  it('should not list payments for an invalid order', async () => {

    await expect(() =>
      sut.execute({
        orderId: 'invalid-order'
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})


