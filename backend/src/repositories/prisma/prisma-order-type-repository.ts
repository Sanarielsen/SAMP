import { prisma } from "@/lib/prisma";
import { OrderTypeRepository } from "../order-type-repository";
import { OrderTypeOptions } from "@shared/types/orderType";

export class PrismaOrderTypeRepository implements OrderTypeRepository {
  async findAllOptions(): Promise<OrderTypeOptions[] | null> {
    const orderTypes = await prisma.orderType.findMany();

    const formattedOrderTypes: OrderTypeOptions[] = orderTypes.map(
      order => ({
        label: order.title,
        value: String(order.id),
      }),
    )

    return formattedOrderTypes
  }
}