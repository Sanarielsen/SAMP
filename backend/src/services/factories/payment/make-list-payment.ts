import { PrismaOrderRepository } from "@/repositories/prisma/order";
import { PrismaPaymentsRepository } from "@/repositories/prisma/payments";
import { ListPaymentsUseCase } from "@/services/use-cases/payment/list";


export function makeListPaymentUseCase() {
  const paymentsRepository = new PrismaPaymentsRepository();
  const ordersRepository = new PrismaOrderRepository();
  const useCase = new ListPaymentsUseCase(paymentsRepository, ordersRepository);

  return useCase
}