import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { InMemoryPaymentMethodRepository } from "@/repositories/in-memory/in-memory-payment-method-repository";
import { UpdatePaymentMethodMethodUseCase } from "@/services/use-cases/payment-method/update";
import { makePaymentMethod } from "@/services/factories/payment-method/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


let paymentMethodRepository: InMemoryPaymentMethodRepository
let sut: UpdatePaymentMethodMethodUseCase

describe('Update Payment Method Use Case', () => {
  beforeEach(() => {
    paymentMethodRepository = new InMemoryPaymentMethodRepository();
    sut = new UpdatePaymentMethodMethodUseCase(
      paymentMethodRepository
    )
  })

  it('should update an payment method', async () => {
    const newPaymentMethodName = 'Credit'
    
    const newPaymentMethod = await makePaymentMethod( paymentMethodRepository )

    const updatedPaymentMethod = await sut.execute({
      id: newPaymentMethod.id,
      name: newPaymentMethodName
    })

    expect(updatedPaymentMethod.name).toBe(newPaymentMethodName)
  })

  it('should not update a non-existent payment method', async () => {
    await expect(
      sut.execute({
        id: 999,
        name: 'test-name'
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})