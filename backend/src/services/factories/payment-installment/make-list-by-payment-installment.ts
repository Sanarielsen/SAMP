import { PrismaPaymentInstallmentsRepository } from "@/repositories/prisma/prisma-payment-instalments-repository";
import { ListByPaymentInstallmentsUseCase } from "@/services/service-payment-installment/get-by-payment";
import { PrismaPaymentsRepository } from "@/repositories/prisma/prisma-payments-repository";

export function makeListByPaymentInstallmentUseCase() {
  const paymentsRepository = new PrismaPaymentsRepository();
  const paymentInstallmentsRepository = new PrismaPaymentInstallmentsRepository();
  
  const useCase = new ListByPaymentInstallmentsUseCase(
    paymentInstallmentsRepository,
    paymentsRepository,
  );

  return useCase
}