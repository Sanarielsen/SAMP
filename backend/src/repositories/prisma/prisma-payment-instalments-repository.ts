import { prisma } from "@/lib/prisma";
import { PaymentInstallmentRepository } from "@/repositories/payment-installments-repository";
import { CreatePaymentInstallmentDTO } from "@shared/types/paymentInstallments";

export class PrismaPaymentInstallmentsRepository implements PaymentInstallmentRepository {

  async createMany(data: CreatePaymentInstallmentDTO[]): Promise<void> {
    await prisma.paymentInstallment.createMany({
      data: data.map(item => ({
        ...item,

        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      })),
    })
  }
}