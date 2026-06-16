import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { ListPaymentMethodsUseCase } from "@/services/service-payment-method/list";

import { InMemoryPaymentMethodsRepository } from "@/repositories/in-memory/in-memory-payment-methods-repository";
import { makePaymentMethod } from "@/services/factories/payment-method/make-entity";

import { PaymentMethod } from "@shared/types/paymentMethod";

let paymentMethodsRepository: InMemoryPaymentMethodsRepository
let sut: ListPaymentMethodsUseCase
let newPaymentMethod: PaymentMethod

describe('List Payment Method Use Case', () => {
  beforeEach( async () => {
    paymentMethodsRepository = new InMemoryPaymentMethodsRepository()
    sut = new ListPaymentMethodsUseCase(paymentMethodsRepository)

    newPaymentMethod = await makePaymentMethod(paymentMethodsRepository)
  })

  it('should list all active payment methods', async () => {
    const paymentMethods = await sut.execute()

    expect(paymentMethods).toHaveLength(3)
  })

  it('should not list excluded payment methods', async () => {
    await paymentMethodsRepository.delete(newPaymentMethod.id)

    const paymentMethods = await sut.execute()

    expect(paymentMethods).toHaveLength(2)
  })
})