import { PostPaymentUseCase } from "@/services/use-cases/payment/post";

import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";
import { PrismaPaymentsRepository } from "@/repositories/prisma/prisma-payments-repository";
import { ListPaymentsUseCase } from "@/services/use-cases/payment/list";

export function makeListPaymentUseCase() {
  const paymentsRepository = new PrismaPaymentsRepository();
  const ordersRepository = new PrismaOrderRepository();
  const useCase = new ListPaymentsUseCase(paymentsRepository, ordersRepository);

  return useCase
}