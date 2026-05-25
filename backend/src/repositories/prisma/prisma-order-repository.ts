import { prisma } from "@/lib/prisma";

import { OrderRepository } from "@/repositories/order-repository";

import { CreateOrderDTO, Order } from "@shared/types/orders";


export class PrismaOrderRepository implements OrderRepository {
  async create(data: CreateOrderDTO): Promise<Order> {
    const client = await prisma.order.create({
      data
    })

    return client;
  }
  
}