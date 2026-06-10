import { prisma } from "@/lib/prisma";
import { OrderTypeRepository } from "../order-type-repository";

import { CreatePaymentDTO, Payment } from "@shared/types/payment";
import { PaymentRepository } from "../payment-repository";

export class PrismaPaymentsRepository implements PaymentRepository {

  async create(data: CreatePaymentDTO): Promise<Payment> {
    return await prisma.payment.create({
      data: {
        ...data,
        createdAt: new Date(Date.now()),
        updatedAt: null,
        deletedAt: null
      }
    })
  }

  async createWithInstallments(
    data: CreatePaymentDTO,
  ): Promise<Payment> {

    return prisma.payment.create({
      data: {
        orderId: data.orderId,
        totalAmountInCents: data.totalAmountInCents,
        totalInstallments: data.totalInstallments,
        firstDueDate: data.firstDueDate,
        description: data.description,
        observation: data.observation ?? null,
        createdAt: new Date(Date.now()),
        updatedAt: null,
        deletedAt: null
      },
    })
  }
}