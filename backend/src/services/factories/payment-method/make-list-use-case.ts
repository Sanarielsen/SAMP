import { PrismaPaymentMethodsRepository } from "@/repositories/prisma/prisma-payment-method-repository";
import { ListPaymentMethodsUseCase } from "@/services/service-payment-method/list";

export function makeListPaymentMethodsUseCase() {
  const paymentMethodsRepository = new PrismaPaymentMethodsRepository();

  const useCase = new ListPaymentMethodsUseCase(
    paymentMethodsRepository, 
  );
  
  return useCase
}