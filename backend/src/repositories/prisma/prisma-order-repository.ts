import { prisma } from "@/lib/prisma";

import { OrderRepository } from "@/repositories/order-repository";

import { CreateOrderDTO, Order, OrderDetailTable, UpdateOrderDTO } from "@shared/types/orders";


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

  async findManyByClientId(clientId: string, search: string): Promise<OrderDetailTable[] | null> {
    const orders = await prisma.order.findMany({
      where: {
        clientId,
        deletedAt: null,
        OR: [
          {
            observation: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            client: {
              legalName: {
                contains: search,
                mode: 'insensitive'
              },
              tradeName: {
                contains: search,
                mode: 'insensitive'
              }
            }
          },
          {
            orderType: {
              title: {
                contains: search,
                mode: 'insensitive'
              },
              descripton: {
                contains: search,
                mode: 'insensitive'
              }
            }
          }
        ],
      },
      include: {
        orderType: {
          select: {
            id: true,
            title: true
          }
        },
        client: {
          select: {
            id: true,
            legalName: true
          }
        }
      }
    })

    const formattedOrders: OrderDetailTable[] = orders.map(
      order => ({
        id: order.id,
        orderTypeId: order.orderTypeId,
        orderTypeTitle: order.orderType.title,
        description: order.observation,
        eventDate: order.eventDate,
        clientId: order.clientId,
        clientName: order.client.legalName,
      }),
    )

    return formattedOrders
  }
  
}