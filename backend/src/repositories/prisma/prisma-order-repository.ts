import { prisma } from "@/lib/prisma";

import { OrderRepository } from "@/repositories/order-repository";

import { CreateOrderDTO, Order, OrderDetailTable, OrderWithTypeDetailDTO, UpdateOrderDTO } from "@shared/types/orders";
import { OptionsControlledBox } from "@shared/types/values";
import dayjs from "dayjs";


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
  
  async findByIdWithType(id: string): Promise<OrderWithTypeDetailDTO | null> {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        client: true,
        orderType: true
      }
    })

    if (!order) {
      return null
    }

    return {
      id,
      description: order.description,
      observation: order.observation ?? null,
      eventDate: order.eventDate,
      clientId: order.clientId,
      clientName: order.client.legalName,

      orderTypeId: order.orderType.id,
      orderTypeTitle: order.orderType.title,
      orderTypeObservation: order.orderType.observation ?? null
    }
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
        description: order.description,
        eventDate: order.eventDate,
        clientId: order.clientId,
        clientName: order.client.legalName,
      }),
    )

    return formattedOrders
  }
  
  async findManyOptionsByClientId(clientId: string): Promise<OptionsControlledBox[] | null> {
    const orders = await prisma.order.findMany({
      where: {
        clientId
      },
      include: {
        client: true,
        orderType: true,
      },
    })

    return orders.map( (order) => ({
      label: order.orderType.title + ' - ' + dayjs(order.eventDate).format("DD/MM/YYYY HH:mm"),
      value: order.id
    }))
  }
}