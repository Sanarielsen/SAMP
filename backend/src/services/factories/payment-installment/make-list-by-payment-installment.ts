import { PrismaPaymentInstallmentsRepository } from "@/repositories/prisma/payment-instalments";
import { PrismaPaymentsRepository } from "@/repositories/prisma/payments";

import { ListByPaymentInstallmentsUseCase } from "@/services/use-cases/payment-installment/get-by-payment";


export function makeListByPaymentInstallmentUseCase() {
  const paymentsRepository = new PrismaPaymentsRepository();
  const paymentInstallmentsRepository = new PrismaPaymentInstallmentsRepository();
  
  const useCase = new ListByPaymentInstallmentsUseCase(
    paymentInstallmentsRepository,
    paymentsRepository,
  );

  return useCase
}