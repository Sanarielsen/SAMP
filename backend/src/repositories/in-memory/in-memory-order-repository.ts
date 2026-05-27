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

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find(item => item.id == id)

    if (!order) {
      return null
    }

    return order
  }

  async findManyByClientId(clientId: string): Promise<Order[] | null> {
    const orders = this.items.filter(item => item.clientId == clientId)

    if (!orders) {
      return null
    }

    return orders
  }
}
