import { PrismaPaymentsRepository } from "@/repositories/prisma/payments";
import { DeletePaymentUseCase } from "@/services/use-cases/payment/delete";


export function makeDeletePaymentUseCase() {
  const paymentsRepository = new PrismaPaymentsRepository();
  const useCase = new DeletePaymentUseCase(paymentsRepository);

  return useCase
}