import { prisma } from "@/lib/prisma";

import { OrderRepository } from "@/repositories/order-repository";

import { CreateOrderDTO, Order } from "@shared/types/orders";


export class PrismaOrderRepository implements OrderRepository {
  async create(data: CreateOrderDTO): Promise<Order> {
    const order = await prisma.order.create({
      data
    })

    return order;
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
      },
    })

    return orders
  }
  
}