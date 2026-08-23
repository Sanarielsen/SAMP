import { PrismaPaymentMethodsRepository } from "@/repositories/prisma/payment-method";
import { DeletePaymentMethodUseCase } from "@/services/use-cases/payment-method/delete";


export function makeDeletePaymentMethodUseCase() {
  const paymentMethodsRepository = new PrismaPaymentMethodsRepository();
  return new DeletePaymentMethodUseCase(
    paymentMethodsRepository, 
  );
}