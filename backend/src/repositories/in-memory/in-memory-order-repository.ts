import { OrderRepository } from "@/repositories/order-repository";

import { CreateOrderDTO, Order, OrderDetailTable, OrderWithTypeDetailDTO, UpdateOrderDTO } from "@shared/types/orders";
import { OptionsControlledBox } from "@shared/types/values";


export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = []

  async create(data: CreateOrderDTO): Promise<Order> {
    const order: Order = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(Date.now()),
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

async findByIdWithType(
  id: string,
): Promise<OrderWithTypeDetailDTO | null> {

  const order =
    this.items.find(
      item => item.id === id,
    )

    if (!order) {
      return null
    }

    const client =
      this.clients.find(
        client => client.id === order.clientId,
      )

    const orderType =
      this.orderTypes.find(
        type => type.id === order.orderTypeId,
      )

    if (!client || !orderType) {
      return null
    }

    return {
      id: order.id,

      description:
        order.description,

      observation:
        order.observation ?? null,

      eventDate:
        order.eventDate,

      clientId:
        order.clientId,

      clientName:
        client.legalName,

      orderTypeId:
        orderType.id,

      orderTypeTitle:
        orderType.title,

      orderTypeObservation:
        orderType.observation ?? null,
    }
  }

  async findManyByClientId(clientId: string, search: string): Promise<OrderDetailTable[] | null> {
    const orders = this.items.filter(item => 
      item.clientId == clientId && item.deletedAt == null && item.observation?.includes(search)
    )

    return orders
  }

  async findManyOptionsByClientId(): Promise<OptionsControlledBox[] | null> {
    throw new Error('Method not implemented')
  }
}
