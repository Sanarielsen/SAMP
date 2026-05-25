import { OrderRepository } from "@/repositories/order-repository";

import { CreateOrderDTO, Order } from "@shared/types/orders";


export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = []

  async create(data: CreateOrderDTO): Promise<Order> {
    const order: Order = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(Date.now()),
      updatedAt: null,
      deletedAt: null
    }

    this.items.push(order)

    return order
  }
}
