import { OrderRepository } from "@/repositories/order";
import { UserRepository } from "@/repositories/user";

import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";

import { Order, OrderWithTypeDetailDTO } from "@shared/types/orders";

interface GetOrderDetailUseCaseRequest {
  id: string
}

export class GetOrderDetailUseCase {
  constructor(
    private orderRepository: OrderRepository
  ) {}

  async execute({
    id
  }: GetOrderDetailUseCaseRequest): Promise<OrderWithTypeDetailDTO | null> {

    const order = await this.orderRepository.findByIdWithType(id)

    return order
  }
}
