import { PaymentRepository } from "@/repositories/payment";
import { OrderRepository } from "@/repositories/order";

import { InvalidResourceError } from "@/services/errors/invalid-resource-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { CreatePaymentDTO } from "@shared/types/payment";

interface PostPaymentUseCaseResponse {
  id: string
}

export class PostPaymentUseCase {
  constructor(
    private paymentRepository: PaymentRepository,
    private orderRepository: OrderRepository,
  ) {}

  async execute(data: CreatePaymentDTO): Promise<PostPaymentUseCaseResponse> {

    const order = await this.orderRepository.findById(data.orderId);  
  
    if (!order) {
      throw new ResourceNotFoundError();
    }

    if (order.deletedAt !== null) {
      throw new InvalidResourceError();
    }

    const newRegister = await this.paymentRepository.create(data);

    return { id: newRegister.id }
  }
}