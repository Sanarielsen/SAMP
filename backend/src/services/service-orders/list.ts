import { OrderRepository } from "@/repositories/order-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";

import { Order } from "@shared/types/orders";

interface ListOrderUseCaseRequest {
  clientId: string
  userId: string,
}

export class ListOrderUseCase {
  constructor(
    private userRepository: UsersRepository,
    private orderRepository: OrderRepository
  ) {}

  async execute({
    clientId,
    userId
  }: ListOrderUseCaseRequest): Promise<Order[] | null> {
    
    const userLogged = await this.userRepository.findById(userId)

    if (!userLogged) {
      throw new InvalidCredentialsError()
    }

    const order = await this.orderRepository.findManyByClientId(clientId)

    return order
  }
}
