import { PaymentMethodRepository } from "@/repositories/payment-method-repository";

import { OptionsControlledBox } from "@shared/types/values";


export class ListPaymentMethodOptionsUseCase {
  constructor(
    private paymentMethodsRepository: PaymentMethodRepository,
  ) {}

  async execute(): Promise<OptionsControlledBox[]> {

    return await this.paymentMethodsRepository.findManyOptions();
  }
}
