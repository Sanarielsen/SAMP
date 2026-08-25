import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { ListPaymentMethodsUseCase } from "@/services/use-cases/payment-method/list";

import { InMemoryPaymentMethodRepository } from "@/repositories/in-memory/payment-method";
import { makePaymentMethod } from "@/services/factories/payment-method/make-entity";

import { PaymentMethod } from "@shared/types/paymentMethod";

let paymentMethodsRepository: InMemoryPaymentMethodRepository
let sut: ListPaymentMethodsUseCase
let newPaymentMethod: PaymentMethod


describe('List Payment Method Use Case', () => {
  beforeEach( async () => {
    paymentMethodsRepository = new InMemoryPaymentMethodRepository()
    sut = new ListPaymentMethodsUseCase(paymentMethodsRepository)

    newPaymentMethod = await makePaymentMethod(paymentMethodsRepository)
    await makePaymentMethod(paymentMethodsRepository)
    await makePaymentMethod(paymentMethodsRepository)
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