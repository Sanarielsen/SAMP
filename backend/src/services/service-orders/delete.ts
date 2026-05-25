import { OrderRepository } from "@/repositories/order-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { Order } from "@shared/types/orders";


export class DeleteOrderUseCase {
  constructor(
    private ordersRepository: OrderRepository
  ) {}

  async execute(id: string): Promise<Order> {

    const order = await this.ordersRepository.findById(id)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    const DeletedClient =
      await this.ordersRepository.delete(id)

    return DeletedClient
  }
}