import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { ListPaymentMethodOptionsUseCase } from "@/services/use-cases/payment-method/list.options";

import { InMemoryPaymentMethodRepository } from "@/repositories/in-memory/payment-method";
import { makePaymentMethod } from "@/services/factories/payment-method/make-entity";


let paymentMethodsRepository: InMemoryPaymentMethodRepository
let sut: ListPaymentMethodOptionsUseCase

describe('List Payment Method Options Use Case', () => {
  beforeEach(() => {
    paymentMethodsRepository = new InMemoryPaymentMethodRepository();
    sut = new ListPaymentMethodOptionsUseCase(
      paymentMethodsRepository
    )
  })

  it('should list all payment methods as a option', async () => {

    makePaymentMethod(paymentMethodsRepository)
    makePaymentMethod(paymentMethodsRepository)
    makePaymentMethod(paymentMethodsRepository)

    const paymentMethods = await sut.execute()

    expect(paymentMethods).toHaveLength(3)
  })
})