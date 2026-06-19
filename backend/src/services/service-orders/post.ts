import { ClientRepository } from "@/repositories/client-repository";
import { OrderRepository } from "@/repositories/order-repository";
import { UserRepository } from "@/repositories/user-repository";

import { NonExistUserError } from "@/services/errors/non-exist-user-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { CreateOrderDTO, Order } from "@shared/types/orders";

interface CreateOrderUseCaseRequest {
  userId: string,
  order: CreateOrderDTO
}

export class CreateOrderUseCase {
  constructor(
    private userRepository: UserRepository,
    private clientRepository: ClientRepository,
    private orderRepository: OrderRepository
  ) {}

  async execute({
    userId,
    order
  }: CreateOrderUseCaseRequest): Promise<Order> {
    
    const userLogged = await this.userRepository.findById(userId)

    if (!userLogged) throw new NonExistUserError();

    const clientExists = await this.clientRepository.findById(order.clientId)

    if (!clientExists) throw new ResourceNotFoundError();

    const newOrder = await this.orderRepository.create({
      clientId: order.clientId,
      orderTypeId: order.orderTypeId,
      description: order.description,
      observation: order.observation,
      eventDate: new Date(Date.now())
    })

    return newOrder
  }
}