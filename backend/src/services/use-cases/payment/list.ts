import { OrderRepository } from "@/repositories/order-repository";
import { PaymentRepository } from "@/repositories/payment-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { PaymentDetailDTO } from "@shared/types/payment";


interface ListPaymentsUseCaseRequest {
  orderId: string
}

export class ListPaymentsUseCase {
  constructor(
    private paymentsRepository: PaymentRepository,
    private ordersRepository: OrderRepository
  ) {}

  async execute({
    orderId
  }: ListPaymentsUseCaseRequest): Promise<PaymentDetailDTO[] | null> {
    const orderWillBeUsed = await this.ordersRepository.findById(orderId)

    if (!orderWillBeUsed) {
      throw new ResourceNotFoundError()
    }

    const payments = await this.paymentsRepository.findManyByOrderId(orderId)

    return payments
  }
}
