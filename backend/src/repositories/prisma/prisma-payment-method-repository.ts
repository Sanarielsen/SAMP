import { prisma } from "@/lib/prisma";
import { PaymentMethodRepository } from "@/repositories/payment-method-repository";
import { CreatePaymentMethodDTO, PaymentMethod } from "@shared/types/paymentMethod";


export class PrismaPaymentMethodsRepository implements PaymentMethodRepository {
  create(data: CreatePaymentMethodDTO): Promise<PaymentMethod> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<PaymentMethod> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<PaymentMethod | null> {
    throw new Error("Method not implemented.");
  }
  findManyActive(): Promise<PaymentMethod[]> {
    return prisma.paymentMethod.findMany({
      where: {
        deletedAt: null
      }
    })
  }
}
