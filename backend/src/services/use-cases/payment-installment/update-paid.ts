import { PaymentInstallmentRepository } from "@/repositories/payment-installment";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { InvalidResourceError } from "@/services/errors/invalid-resource-error";

import { PaymentInstallment, PaymentInstallmentProof } from "@shared/types/paymentInstallment";


export class UpdatePaymentInstallmentPaidUseCase {
  constructor(
    private paymentInstallmentsRepository: PaymentInstallmentRepository
  ) {}

  async execute( data: PaymentInstallmentProof ): Promise<PaymentInstallment> {
    
    const paymentInstallments = await this.paymentInstallmentsRepository.findById(data.id)

    if (!paymentInstallments) {
      throw new ResourceNotFoundError()
    }

    if (paymentInstallments.deletedAt !== null) {
      throw new InvalidResourceError()
    }

    const updatedPaymentInstallment =
      await this.paymentInstallmentsRepository.updateInstallmentPaid(
        data
      )

    return updatedPaymentInstallment
  }
}