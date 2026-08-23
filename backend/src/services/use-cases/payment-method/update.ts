import { PaymentMethodRepository } from "@/repositories/payment-method";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { 
  PaymentMethod,
  PaymentMethodUpdateDTO
} from "@shared/types/paymentMethod";


export class UpdatePaymentMethodMethodUseCase {
  constructor(
    private paymentMethodRepository: PaymentMethodRepository
  ) {}

  async execute(data: PaymentMethodUpdateDTO): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.findById(data.id)
    if (!paymentMethod) throw new ResourceNotFoundError()

    return await this.paymentMethodRepository.update(data)
  }
}