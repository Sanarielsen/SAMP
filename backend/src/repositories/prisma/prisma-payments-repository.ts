import { prisma } from "@/lib/prisma";

import { PaymentRepository } from "@/repositories/payment-repository";

import { CreatePaymentDTO, Payment } from "@shared/types/payment";

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
        observation: data.observation ?? null,
        createdAt: new Date(Date.now()),
        updatedAt: null,
        deletedAt: null
      },
    })
  }

  async findManyByOrderId(orderId: string): Promise<Payment[] | null> {
    return prisma.payment.findMany({
      where: {
        orderId
      }
    })
  }
}