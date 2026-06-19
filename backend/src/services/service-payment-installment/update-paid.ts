import { PaymentInstallmentRepository } from "@/repositories/payment-installments-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { InvalidResourceError } from "@/services/errors/invalid-resource-error";

import { PaymentInstallment } from "@shared/types/paymentInstallments";


interface UpdatePaymentInstallmentPaidUseCaseRequest {
  id: string,
  paidAt: Date | null,
  proofPaymentPath: string | null
}

export class UpdatePaymentInstallmentPaidUseCase {
  constructor(
    private paymentInstallmentsRepository: PaymentInstallmentRepository
  ) {}

  async execute({
    id,
    paidAt,
    proofPaymentPath
  }: UpdatePaymentInstallmentPaidUseCaseRequest): Promise<PaymentInstallment> {
    
    const paymentInstallments = await this.paymentInstallmentsRepository.findById(id)

    if (!paymentInstallments) {
      throw new ResourceNotFoundError()
    }

    if (paymentInstallments.deletedAt !== null) {
      throw new InvalidResourceError()
    }

    const updatedPaymentInstallment =
      await this.paymentInstallmentsRepository.updateInstallmentPaid(
        id, 
        paidAt,
        proofPaymentPath
      )

    return updatedPaymentInstallment
  }
}