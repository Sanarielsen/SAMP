import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { GetPaymentMethodUseCase } from "@/services/service-payment-method/get";

import { InMemoryPaymentMethodRepository } from "@/repositories/in-memory/in-memory-payment-method-repository";
import { makePaymentMethod } from "@/services/factories/payment-method/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


let paymentMethodsRepository: InMemoryPaymentMethodRepository
let sut: GetPaymentMethodUseCase

describe('Get Payment Method Use Case', () => {
  beforeEach(() => {
    paymentMethodsRepository = new InMemoryPaymentMethodRepository();
    sut = new GetPaymentMethodUseCase(
      paymentMethodsRepository
    )
  })

  it('should get payment method', async () => {

    const newPaymentMethod = await makePaymentMethod(paymentMethodsRepository)
    const paymentMethod = await sut.execute(newPaymentMethod.id)

    expect(paymentMethod.name).toBe('payment-method-test')
  })

  it('should not get an non-existent payment method', async () => {

    await expect(
      sut.execute(
        999
      ),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})