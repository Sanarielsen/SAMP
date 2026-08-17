import { PostPaymentUseCase } from "@/services/use-cases/payment/post";

import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository";
import { PrismaPaymentsRepository } from "@/repositories/prisma/prisma-payments-repository";
import { PrismaPaymentInstallmentsRepository } from "@/repositories/prisma/prisma-payment-instalments-repository";
import { PostPaymentWithInstallmentsUseCase } from "@/services/use-cases/payment/post-with-installments";

export function makePostPaymentWithInstallmentsUseCase() {
  const paymentsRepository = new PrismaPaymentsRepository();
  const paymentInstallmentsRepository = new PrismaPaymentInstallmentsRepository();
  const ordersRepository = new PrismaOrderRepository();
  
  const useCase = new PostPaymentWithInstallmentsUseCase(
    paymentsRepository, 
    paymentInstallmentsRepository, 
    ordersRepository
  );

  return useCase
}