import { PaymentInstallmentRepository } from "@/repositories/payment-installments-repository";
import { PaymentRepository } from "@/repositories/payment-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { PaymentInstallment } from "@shared/types/paymentInstallments";

interface ListByPaymentInstallmentsUseCaseRequest {
  paymentId: string
}

export class ListByPaymentInstallmentsUseCase {
  constructor(
    private paymentInstallmentsRepository: PaymentInstallmentRepository,
    private paymentsRepository: PaymentRepository,
  ) {}

  async execute({
    paymentId
  }: ListByPaymentInstallmentsUseCaseRequest): Promise<PaymentInstallment[] | null> {
    
    const paymentWillBeUsed = await this.paymentsRepository.findById(paymentId)

    if (!paymentWillBeUsed) {
      throw new ResourceNotFoundError()
    }

    const payments = await this.paymentInstallmentsRepository.findManyByPaymentId(paymentId)

    return payments
  }
}
