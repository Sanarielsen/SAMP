import { PrismaPaymentMethodsRepository } from "@/repositories/prisma/payment-method";
import { ListPaymentMethodOptionsUseCase } from "@/services/use-cases/payment-method/list.options";


export function makeListPaymentMethodOptionsUseCase() {
  const paymentMethodsRepository = new PrismaPaymentMethodsRepository();
  return new ListPaymentMethodOptionsUseCase(
    paymentMethodsRepository, 
  );
}