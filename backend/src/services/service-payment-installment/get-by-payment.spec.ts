import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { ListByPaymentInstallmentsUseCase } from "@/services/service-payment-installment/get-by-payment";

import { InMemoryPaymentInstallmentsRepository } from "@/repositories/in-memory/in-memory-payment-installment-repository";
import { InMemoryPaymentRepository } from "@/repositories/in-memory/in-memory-payment-repository";

import { makePayment } from "@/services/factories/payment/make-payment-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { Payment } from "@shared/types/payment";

let paymentInstallmentsRepository: InMemoryPaymentInstallmentsRepository
let paymentsRepository: InMemoryPaymentRepository
let sut: ListByPaymentInstallmentsUseCase
let newPayment: Payment

describe('List By Payment - Payment Installments Use Case', () => {
  beforeEach( async () => {
    paymentInstallmentsRepository = new InMemoryPaymentInstallmentsRepository()
    paymentsRepository = new InMemoryPaymentRepository()
    sut = new ListByPaymentInstallmentsUseCase(
      paymentInstallmentsRepository,
      paymentsRepository
    )

    newPayment = await makePayment(paymentsRepository);
  })

  it('should list all instalments for a valid order', async () => {
    const paymentInstallments = await sut.execute({
      paymentId: newPayment.id,
    })

    expect(paymentInstallments).toBeTruthy()
  })

  it('should not list all instalments for an invalid order', async () => {

    await expect(() =>
      sut.execute({
        paymentId: 'invalid-payment2'
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})