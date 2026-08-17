import { PrismaPaymentMethodsRepository } from "@/repositories/prisma/prisma-payment-method-repository";
import { ListPaymentMethodOptionsUseCase } from "@/services/service-payment-method/list.options";


export function makeListPaymentMethodOptions() {
  const paymentMethodsRepository = new PrismaPaymentMethodsRepository();
  return new ListPaymentMethodOptionsUseCase(
    paymentMethodsRepository, 
  );
}