import { PaymentMethodRepository } from "@/repositories/payment-method-repository";

import { PaymentMethod } from "@shared/types/paymentMethod";

export class ListPaymentMethodsUseCase {
  constructor(
    private paymentMethodsRepository: PaymentMethodRepository,
  ) {}

  async execute(): Promise<PaymentMethod[] | null> {

    const paymentMethods = await this.paymentMethodsRepository.findManyActive()

    return paymentMethods
  }
}
