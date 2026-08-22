import { PostPaymentUseCase } from "@/services/use-cases/payment/post";

import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";
import { PrismaPaymentsRepository } from "@/repositories/prisma/prisma-payments-repository";

export function makePostPaymentUseCase() {
  const paymentsRepository = new PrismaPaymentsRepository();
  const ordersRepository = new PrismaOrderRepository();
  const useCase = new PostPaymentUseCase(paymentsRepository, ordersRepository);

  return useCase
}