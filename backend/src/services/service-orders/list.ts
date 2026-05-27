import { OrderRepository } from "@/repositories/order-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";

import { OrderDetailTable } from "@shared/types/orders";

interface ListOrderUseCaseRequest {
  search: string,
  clientId: string
  userId: string,
}

export class ListOrderUseCase {
  constructor(
    private userRepository: UsersRepository,
    private orderRepository: OrderRepository
  ) {}

  async execute({
    search,
    clientId,
    userId
  }: ListOrderUseCaseRequest): Promise<OrderDetailTable[] | null> {
    
    const userLogged = await this.userRepository.findById(userId)

    if (!userLogged) {
      throw new InvalidCredentialsError()
    }

    const order = await this.orderRepository.findManyByClientId(clientId, search)

    return order
  }
}
