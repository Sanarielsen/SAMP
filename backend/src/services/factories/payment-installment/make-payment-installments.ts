import { PrismaOrderRepository } from "@/repositories/prisma/order";
import { PrismaPaymentsRepository } from "@/repositories/prisma/payments";
import { PrismaPaymentInstallmentsRepository } from "@/repositories/prisma/payment-instalments";
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