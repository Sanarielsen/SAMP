import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { DeletePaymentMethodUseCase } from "@/services/service-payment-method/delete";

import { InMemoryPaymentMethodRepository } from "@/repositories/in-memory/in-memory-payment-method-repository";
import { makePaymentMethod } from "@/services/factories/payment-method/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


let paymentMethodsRepository: InMemoryPaymentMethodRepository
let sut: DeletePaymentMethodUseCase

describe('Delete Payment Method Use Case', () => {
  beforeEach(() => {
    paymentMethodsRepository = new InMemoryPaymentMethodRepository();
    sut = new DeletePaymentMethodUseCase(
      paymentMethodsRepository
    )
  })

  it('should delete payment method', async () => {

    const newPaymentMethod = await makePaymentMethod(paymentMethodsRepository)
    
    await sut.execute(newPaymentMethod.id)

    expect(paymentMethodsRepository.items[0]).not.toBe(null)
  })

  it('should not delete an non-existent payment method', async () => {

    await expect(
      sut.execute(
        999
      ),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})