import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { DeletePaymentUseCase } from "@/services/service-payment/delete";

import { InMemoryPaymentRepository } from "@/repositories/in-memory/in-memory-payment-repository";
import { makePayment } from "@/services/factories/payment/make-payment-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { Payment } from "@shared/types/payment";


let paymentRepository: InMemoryPaymentRepository
let sut: DeletePaymentUseCase
let newPayment: Payment

describe('Delete Payment Use Case', () => {
  beforeEach( async () => {
    paymentRepository = new InMemoryPaymentRepository()
    sut = new DeletePaymentUseCase(paymentRepository)

    newPayment = await makePayment(paymentRepository)
  })

  it('should delete a valid payment', async () => {
    await sut.execute({
      id: newPayment.id,
    })

    const deletedPayment = await paymentRepository.findById(newPayment.id)

    expect(deletedPayment).not.toBeNull()
    expect(deletedPayment!.deletedAt).not.toBeNull()
  })

  it('should not delete an invalid payment', async () => {

    await expect(
      sut.execute({
        id: 'payment-non-exist',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
