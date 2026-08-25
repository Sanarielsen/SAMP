import { PrismaPaymentMethodsRepository } from "@/repositories/prisma/payment-method";
import { ListPaymentMethodsUseCase } from "@/services/use-cases/payment-method/list";


export function makeListPaymentMethodsUseCase() {
  const paymentMethodsRepository = new PrismaPaymentMethodsRepository();

  const useCase = new ListPaymentMethodsUseCase(
    paymentMethodsRepository, 
  );
  
  return useCase
}