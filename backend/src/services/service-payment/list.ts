import { OrderRepository } from "@/repositories/order-repository";
import { PaymentInstallmentRepository } from "@/repositories/payment-installments-repository";
import { PaymentRepository } from "@/repositories/payment-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";

import { Payment } from "@shared/types/payment";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

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
  }: ListPaymentsUseCaseRequest): Promise<Payment[] | null> {
    
    const orderWillBeUsed = await this.ordersRepository.findById(orderId)

    if (!orderWillBeUsed) {
      throw new ResourceNotFoundError()
    }

    const payments = await this.paymentsRepository.findManyByOrderId(orderId)

    return payments
  }
}
