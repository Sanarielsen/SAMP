import { OrderRepository } from "@/repositories/order-repository";

import { CreateOrderDTO, Order, UpdateOrderDTO } from "@shared/types/orders";


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

  async update(data: UpdateOrderDTO): Promise<Order> {
    const order = this.items.findIndex(order => {
      return order.id === data.id
    })

    const updatedOrder = {
      ...this.items[order],
      ...data,
      updatedAt: new Date(),
    }

    this.items[order] = updatedOrder

    return updatedOrder
  }

  async delete(id: string): Promise<Order> {
    
    const order = this.items.findIndex(order => {
      return order.id === id
    })

    const disabledOrder = {
      ...this.items[order],
      deletedAt: new Date(),
    }

    this.items[order] = disabledOrder

    return disabledOrder
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find(item => item.id == id)

    if (!order) {
      return null
    }

    return order
  }

  async findManyByClientId(clientId: string): Promise<Order[] | null> {
    const orders = this.items.filter(item => 
      item.clientId == clientId && item.deletedAt == null
    )

    if (!orders) {
      return null
    }

    return orders
  }
}
