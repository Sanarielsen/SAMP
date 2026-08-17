import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { PaymentInstallmentRepository } from "@/repositories/payment-installments-repository";

import { 
  PaymentInstallment,
  UpdatePaymentInstallmentDTO
} from "@shared/types/paymentInstallments";


export class UpdatePaymentInstallmentUseCase {
  constructor(
    private paymentInstallmentsRepository: PaymentInstallmentRepository
  ) {}

  async execute(data: UpdatePaymentInstallmentDTO): Promise<PaymentInstallment> {

    const paymentInstallment = await this.paymentInstallmentsRepository.findById(data.id)

    if (!paymentInstallment) {
      throw new ResourceNotFoundError()
    }

    const updatedPaymentInstallment =
      await this.paymentInstallmentsRepository.update({
        ...data
      })

    return updatedPaymentInstallment
  }
}
