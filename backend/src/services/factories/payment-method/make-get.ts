import { PrismaPaymentMethodsRepository } from "@/repositories/prisma/prisma-payment-method-repository";
import { GetPaymentMethodUseCase } from "@/services/use-cases/payment-method/get";


export function makeGetPaymentMethod() {
  const paymentMethodsRepository = new PrismaPaymentMethodsRepository();
  return new GetPaymentMethodUseCase(
    paymentMethodsRepository, 
  );
}