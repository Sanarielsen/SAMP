import { PrismaPaymentsRepository } from "@/repositories/prisma/prisma-payments-repository";
import { DeletePaymentUseCase } from "@/services/service-payment/delete";

export function makeDeletePaymentUseCase() {
  const paymentsRepository = new PrismaPaymentsRepository();
  const useCase = new DeletePaymentUseCase(paymentsRepository);

  return useCase
}