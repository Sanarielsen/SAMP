import { PaymentMethodRepository } from "@/repositories/payment-method";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export class DeletePaymentMethodUseCase {
  constructor(
    private paymentMethodsRepository: PaymentMethodRepository,
  ) {}

  async execute(id: number): Promise<void> {

    const paymentMethod = await this.paymentMethodsRepository.findById(id)
    if (!paymentMethod) throw new ResourceNotFoundError();

    await this.paymentMethodsRepository.delete(id)
  }
}
