import { PaymentMethodRepository } from "@/repositories/payment-method";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { PaymentMethod } from "@shared/types/paymentMethod";


export class GetPaymentMethodUseCase {
  constructor(
    private paymentMethodsRepository: PaymentMethodRepository,
  ) {}

  async execute(id: number): Promise<PaymentMethod> {

    const paymentMethod = await this.paymentMethodsRepository.findById(id)
    if (!paymentMethod) throw new ResourceNotFoundError();

    return paymentMethod
  }
}
