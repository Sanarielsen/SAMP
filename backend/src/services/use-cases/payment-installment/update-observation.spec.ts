import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { UpdatePaymentInstallmentObservationUseCase } from "./update-observation";
import { InMemoryPaymentInstallmentsRepository } from "@/repositories/in-memory/in-memory-payment-installment-repository";
import { makePaymentInstallment } from "@/services/factories/payment-installment/make-payment-installment-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { InvalidResourceError } from "@/services/errors/invalid-resource-error";

import { PaymentInstallment } from "@shared/types/paymentInstallments";


let paymentInstallments: InMemoryPaymentInstallmentsRepository
let sut: UpdatePaymentInstallmentObservationUseCase
let newPaymentInstallment: PaymentInstallment

describe('Update Observation Installment Use Case', () => {
  beforeEach(async () => {
    paymentInstallments = new InMemoryPaymentInstallmentsRepository()
    sut = new UpdatePaymentInstallmentObservationUseCase(paymentInstallments)

    newPaymentInstallment = await makePaymentInstallment(paymentInstallments)
  })

  it('should update the observation of a valid installment', async () => {
    const updatedPaymentInstallment = await sut.execute({
      id: newPaymentInstallment.id,
      observation: 'test-observation'
    })

    expect(updatedPaymentInstallment).toBeTruthy()
  })

  it('should not update the paid date of an invalid installment', async () => {

    await expect(() =>
      sut.execute({
        id: 'invalid-payment-installment',
        observation: 'test-observation'
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not update the paid date of a deactivated installment', async () => {
  
    await paymentInstallments.delete(newPaymentInstallment.id)

    await expect(() =>
      sut.execute({
        id: newPaymentInstallment.id,
        observation: 'test-observation'
      }),
    ).rejects.toBeInstanceOf(InvalidResourceError)
  })
})