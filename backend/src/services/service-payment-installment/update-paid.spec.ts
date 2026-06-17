import { InMemoryPaymentInstallmentsRepository } from "@/repositories/in-memory/in-memory-payment-installment-repository";
import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { PaymentInstallment } from "@shared/types/paymentInstallments";
import { makePaymentInstallment } from "../factories/payment-installment/make-payment-installment-entity";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { InvalidResourceError } from "../errors/invalid-resource-error";
import { UpdatePaymentInstallmentPaidUseCase } from "./update-paid";

let paymentInstallments: InMemoryPaymentInstallmentsRepository
let sut: UpdatePaymentInstallmentPaidUseCase
let newPaymentInstallment: PaymentInstallment

describe('Update Paid Installment Use Case', () => {
  beforeEach(async () => {
    paymentInstallments = new InMemoryPaymentInstallmentsRepository()
    sut = new UpdatePaymentInstallmentPaidUseCase(paymentInstallments)

    newPaymentInstallment = await makePaymentInstallment(paymentInstallments)
  })

  it('should update the paid date of a valid installment', async () => {
    const updatedPaymentInstallment = await sut.execute({
      id: newPaymentInstallment.id,
      paidAt: new Date(Date.now())
    })

    expect(updatedPaymentInstallment).toBeTruthy()
  })

  it('should not update the paid date of an invalid installment', async () => {

    await expect(() =>
      sut.execute({
        id: 'invalid-payment-installment',
        paidAt: new Date(Date.now())
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not update the paid date of a deactivated installment', async () => {
  
    await paymentInstallments.delete(newPaymentInstallment.id)

    await expect(() =>
      sut.execute({
        id: newPaymentInstallment.id,
        paidAt: new Date(Date.now())
      }),
    ).rejects.toBeInstanceOf(InvalidResourceError)
  })
})