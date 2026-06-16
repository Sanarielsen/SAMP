import { prisma } from "@/lib/prisma";

import { PaymentInstallmentRepository } from "@/repositories/payment-installments-repository";

import { 
  CreatePaymentInstallmentDTO, 
  PaymentInstallment, 
  UpdatePaymentInstallmentDTO
} from "@shared/types/paymentInstallments";

export class PrismaPaymentInstallmentsRepository implements PaymentInstallmentRepository {
  create(data: CreatePaymentInstallmentDTO): Promise<PaymentInstallment> {
    throw new Error("Method not implemented.");
  }

  async update(data: UpdatePaymentInstallmentDTO): Promise<PaymentInstallment> {
    const { id, ...updateData } = data;
    
    return prisma.paymentInstallment.update({
      where: {
        id,
      },
      data: {
        ...updateData,
        updatedAt: new Date(Date.now())
      }
    })
  }

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

  async findById(id: string): Promise<PaymentInstallment | null> {
    return await prisma.paymentInstallment.findUnique({
      where: {
        id
      }
    })
  }

  async findManyByPaymentId(paymentId: string): Promise<PaymentInstallment[]> {
    return await prisma.paymentInstallment.findMany({
      where: {
        paymentId
      },
      orderBy: {
        installment: 'asc'  // Only sort by installment number
      }
    })
  }
}