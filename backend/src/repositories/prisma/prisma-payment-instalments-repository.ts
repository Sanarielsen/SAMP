import { prisma } from "@/lib/prisma";

import { PaymentInstallmentRepository } from "@/repositories/payment-installments-repository";

import { 
  PaymentInstallment, 
  PaymentInstallmentObservation, 
  PaymentInstallmentProof, 
  CreatePaymentInstallmentDTO, 
  UpdatePaymentInstallmentDTO
} from "@shared/types/paymentInstallments";

export class PrismaPaymentInstallmentsRepository implements PaymentInstallmentRepository {
  
  create(data: CreatePaymentInstallmentDTO): Promise<PaymentInstallment> {
    throw new Error("Method not implemented.");
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

  async updateInstallmentPaid(
    data: PaymentInstallmentProof
  ): Promise<PaymentInstallment> {

    return await prisma.paymentInstallment.update({
      where: { id: data.id },
      data: {
        paidAt: data.paidAt,
        updatedAt: new Date(Date.now())
      },
    })
  }

  async updateInstallmenObservation(
    data: PaymentInstallmentObservation
  ): Promise<PaymentInstallment> {

    return await prisma.paymentInstallment.update({
      where: { id: data.id },
      data: {
        observation: data.observation,
        updatedAt: new Date(Date.now())
      },
    })
  }

  delete(id: string): Promise<PaymentInstallment> {
    throw new Error("Method not implemented.");
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
        installment: 'asc'
      }
    })
  }
}