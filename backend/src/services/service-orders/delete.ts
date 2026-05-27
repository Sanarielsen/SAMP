import { OrderRepository } from "@/repositories/order-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { Order } from "@shared/types/orders";


export class DeleteOrderUseCase {
  constructor(
    private orderRepository: OrderRepository
  ) {}

  async execute(id: string): Promise<Order> {

    const order = await this.orderRepository.findById(id)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    const DeletedClient =
      await this.orderRepository.delete(id)

    return DeletedClient
  }
}