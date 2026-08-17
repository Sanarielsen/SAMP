import { PaymentMethodRepository } from "@/repositories/payment-method-repository";
import { PaymentMethodCreateDTO, PaymentMethod } from "@shared/types/paymentMethod";


export class PostPaymentMethodMethodUseCase {
  constructor(
    private paymentMethodRepository: PaymentMethodRepository
  ) {}

  async execute(data: PaymentMethodCreateDTO): Promise<PaymentMethod> {
    return await this.paymentMethodRepository.create(data)
  }
}