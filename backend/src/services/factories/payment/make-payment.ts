import { PrismaOrderRepository } from "@/repositories/prisma/order";
import { PrismaPaymentsRepository } from "@/repositories/prisma/payments";
import { PostPaymentUseCase } from "@/services/use-cases/payment/post";


export function makePostPaymentUseCase() {
  const paymentsRepository = new PrismaPaymentsRepository();
  const ordersRepository = new PrismaOrderRepository();
  const useCase = new PostPaymentUseCase(paymentsRepository, ordersRepository);

  return useCase
}