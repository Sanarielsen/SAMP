import { Order, UpdateOrderDTO } from "@shared/types/orders";
import { OrderRepository } from "@/repositories/order-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export class UpdateOrderUseCase {
  constructor(
    private ordersRepository: OrderRepository
  ) {}

  async execute(data: UpdateOrderDTO): Promise<Order> {

    const order = await this.ordersRepository.findById(data.id)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    const updatedClient =
      await this.ordersRepository.update({
        ...data
      })

    return updatedClient
  }
}