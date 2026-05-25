import { prisma } from "@/lib/prisma";

import { OrderRepository } from "@/repositories/order-repository";

import { CreateOrderDTO, Order, UpdateOrderDTO } from "@shared/types/orders";


export class PrismaOrderRepository implements OrderRepository {
  async create(data: CreateOrderDTO): Promise<Order> {
    const order = await prisma.order.create({
      data
    })
    
    return order;
  }

  update(data: Partial<UpdateOrderDTO>): Promise<Order> {
    return prisma.order.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  delete(id: string): Promise<Order> {
    return prisma.order.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date(Date.now())
      }
    })
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    })

    return order
  }

  async findManyByClientId(clientId: string): Promise<Order[] | null> {
    const orders = await prisma.order.findMany({
      where: {
        clientId,
        deletedAt: null
      },
    })

    return orders
  }
  
}