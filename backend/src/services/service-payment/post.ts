import { PaymentRepository } from "@/repositories/payment-repository";
import { OrderRepository } from "@/repositories/order-repository";

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

    if (order.deletedAt) {
      throw new InvalidResourceError();
    }

    const newRegister = await this.paymentRepository.create(data);

    //Cria as linhas baseado na quantidade de parcelas.

    return { id: newRegister.id }
  }
}