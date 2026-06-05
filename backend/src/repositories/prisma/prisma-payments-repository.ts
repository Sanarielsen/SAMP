import { prisma } from "@/lib/prisma";

import { PaymentRepository } from "@/repositories/payment-repository";

import { 
  CreatePaymentDTO, 
  CreatePaymentWithInstallmentsDTO, 
  Payment, 
  PaymentDetailDTO 
} from "@shared/types/payment";

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
    data: CreatePaymentWithInstallmentsDTO,
  ): Promise<Payment> {

    return prisma.payment.create({
      data: {
        orderId: data.orderId,
        totalInstallments: data.totalInstallments,
        firstDueDate: data.firstDueDate,
        observation: data.observation ?? null,
        createdAt: new Date(Date.now()),
        updatedAt: null,
        deletedAt: null
      },
    })
  }

  async delete(id: string): Promise<Payment> {
    return await prisma.payment.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date(Date.now())
      },
    })
  }

  async findById(id: string): Promise<Payment | null> {
    return prisma.payment.findUnique({
      where: {
        id
      }
    })
  }

  async findManyByOrderId(orderId: string): Promise<PaymentDetailDTO[] | null> {
    const payments = await prisma.payment.findMany({
      where: {
        orderId,
        deletedAt: null
      },
      include: {
        paymentInstallments: true
      },
    })

    return payments.map(payment => ({
      id: payment.id,
      totalInstallments: payment.totalInstallments,
      totalAmountInCents:
        payment.paymentInstallments.reduce(
          (sum, installment) =>
            sum + installment.amountInCents,
          0,
        ),
      lastDueDate:
        payment.paymentInstallments.length > 0
          ? payment.paymentInstallments.reduce((latest, installment) =>
              installment.dueDate > latest
                ? installment.dueDate
                : latest,
            payment.paymentInstallments[0].dueDate)
          : null,
      observation: payment.observation,
      installments: payment.paymentInstallments,
      createdAt: payment.createdAt,
      updatedAt: payment.deletedAt,
      deletedAt: payment.deletedAt,
    }))
  }
}