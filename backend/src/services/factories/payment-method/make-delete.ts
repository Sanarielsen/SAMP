import { PrismaPaymentMethodsRepository } from "@/repositories/prisma/prisma-payment-method-repository";
import { DeletePaymentMethodUseCase } from "@/services/service-payment-method/delete";


export function makeDeletePaymentMethod() {
  const paymentMethodsRepository = new PrismaPaymentMethodsRepository();
  return new DeletePaymentMethodUseCase(
    paymentMethodsRepository, 
  );
}