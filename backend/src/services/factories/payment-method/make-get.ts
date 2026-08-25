import { PrismaPaymentMethodsRepository } from "@/repositories/prisma/payment-method";
import { GetPaymentMethodUseCase } from "@/services/use-cases/payment-method/get";


export function makeGetPaymentMethodUseCase() {
  const paymentMethodsRepository = new PrismaPaymentMethodsRepository();
  return new GetPaymentMethodUseCase(
    paymentMethodsRepository, 
  );
}