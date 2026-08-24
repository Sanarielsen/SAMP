import { prisma } from "@/lib/prisma";

import { PaymentMethodRepository } from "@/repositories/payment-method-repository";

import { 
  PaymentMethod,
  PaymentMethodCreateDTO,
  PaymentMethodUpdateDTO, 
} from "@shared/types/paymentMethod";
import { OptionsControlledBox } from "@shared/types/values";


export class PrismaPaymentMethodsRepository implements PaymentMethodRepository {
  async create(data: PaymentMethodCreateDTO): Promise<PaymentMethod> {
    return await prisma.paymentMethod.create({
      data
    })
  }

  async update(data: PaymentMethodUpdateDTO): Promise<PaymentMethod> {
    return await prisma.paymentMethod.update({
      where: {
        id: data.id
      },
      data
    })
  }

  async delete(id: number): Promise<void> {
    await prisma.paymentMethod.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date(Date.now())
      }
    })
  }

  async findById(id: number): Promise<PaymentMethod | null> {
    return prisma.paymentMethod.findUnique({
      where: {
        id
      }
    })
  }

  async findManyActive(): Promise<PaymentMethod[]> {
    return prisma.paymentMethod.findMany({
      where: {
        deletedAt: null
      }
    })
  }

  async findManyOptions(): Promise<OptionsControlledBox[]> {
    const paymentMethods = await prisma.paymentMethod.findMany({
      where: {
        deletedAt: null
      },
      orderBy: {
        order: "asc"
      }
    })

    return paymentMethods.map((item) => ({
      label: item.name,
      value: item.id
    }))
  }
}
