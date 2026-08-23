import { prisma } from "@/lib/prisma";

import { OrderTypeRepository } from "@/repositories/order-type";

import { 
  OrderType, 
  OrderTypeCreateDTO, 
  OrderTypeUpdateDTO 
} from "@shared/types/orderType";
import { OptionsControlledBox } from "@shared/types/values";


export class PrismaOrderTypeRepository implements OrderTypeRepository {
  async create(data: OrderTypeCreateDTO): Promise<OrderType> {
    return await prisma.orderType.create({
      data: {
        ...data,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        deletedAt: null
      }
    })
  }

  async update(data: OrderTypeUpdateDTO): Promise<OrderType> {
    return prisma.orderType.update({
      where: {
        id: data.id
      },
      data: {
        ...data,
        updatedAt: new Date(Date.now())
      }
    })
  }

  async delete(id: number): Promise<void> {
    await prisma.orderType.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date(Date.now())
      }
    })
  }

  async findById(id: number): Promise<OrderType | null> {
    return prisma.orderType.findUnique({
      where: {
        id,
      }
    })
  }

  async findAllActiveAsOptions(): Promise<OptionsControlledBox[] | null> {
    const orderTypes = await prisma.orderType.findMany({
      where: {
        deletedAt: null
      },
      orderBy: {
        order: "asc"
      }
    })

    const formattedOrderTypes: OptionsControlledBox[] = orderTypes.map(
      order => ({
        label: order.title,
        value: String(order.id),
      }),
    )

    return formattedOrderTypes
  }
}