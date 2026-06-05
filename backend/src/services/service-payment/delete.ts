import { PaymentRepository } from "@/repositories/payment-repository"

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error"

interface DeletePaymentUseCaseRequest {
  id: string
}

export class DeletePaymentUseCase {
  constructor(
    private paymentRepository: PaymentRepository
  ) {}

  async execute({
    id
  }: DeletePaymentUseCaseRequest): Promise<void> {

    const payment = await this.paymentRepository.findById(id)
    
    if (!payment) {
      throw new ResourceNotFoundError()
    }

    await this.paymentRepository.delete(id)
  }
}
