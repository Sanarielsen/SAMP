import { PaymentInstallmentRepository } from "@/repositories/payment-installments-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { InvalidResourceError } from "@/services/errors/invalid-resource-error";

import { 
  PaymentInstallment, 
  PaymentInstallmentObservation 
} from "@shared/types/paymentInstallments";


export class UpdatePaymentInstallmentObservationUseCase {
  constructor(
    private paymentInstallmentsRepository: PaymentInstallmentRepository
  ) {}

  async execute( data: PaymentInstallmentObservation ): Promise<PaymentInstallment> {
    
    const paymentInstallments = await this.paymentInstallmentsRepository.findById(data.id)

    if (!paymentInstallments) {
      throw new ResourceNotFoundError()
    }

    if (paymentInstallments.deletedAt !== null) {
      throw new InvalidResourceError()
    }

    const updatedPaymentInstallment =
      await this.paymentInstallmentsRepository.updateInstallmenObservation(
        data
      )

    return updatedPaymentInstallment
  }
}