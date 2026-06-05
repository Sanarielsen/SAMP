import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { UpdatePaymentInstallmentUseCase } from "@/services/service-payment-installment/update";

import { InMemoryPaymentInstallmentsRepository } from "@/repositories/in-memory/in-memory-payment-installment-repository";
import { makePaymentInstallment } from "@/services/factories/payment-installment/make-payment-installment-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { PaymentInstallment } from "@shared/types/paymentInstallments";


let paymentInstallmentsRepository: InMemoryPaymentInstallmentsRepository
let sut: UpdatePaymentInstallmentUseCase
let newPaymentInstallment: PaymentInstallment

describe('Update Payment Installment Use Case', () => {
  beforeEach( async () => {
    paymentInstallmentsRepository = new InMemoryPaymentInstallmentsRepository();
    sut = new UpdatePaymentInstallmentUseCase(paymentInstallmentsRepository)

    newPaymentInstallment = await makePaymentInstallment(paymentInstallmentsRepository)
  })

  it('should update a valid payment installment', async () => {

    const paymentInstallmentUpdated = await sut.execute({
      id: newPaymentInstallment.id,
      paymentId: newPaymentInstallment.paymentId,
      amountInCents: 3000
    })

    expect(paymentInstallmentUpdated.amountInCents)
      .toBe(3000)
  })

  it('should not update an invalid payment installment', async () => {
    await expect(() =>
      sut.execute({
        id: 'invalid-payment-installment',
        paymentId: newPaymentInstallment.paymentId,
        amountInCents: 50
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})