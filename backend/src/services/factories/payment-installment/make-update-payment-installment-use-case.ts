import { PrismaPaymentInstallmentsRepository } from "@/repositories/prisma/prisma-payment-instalments-repository";
import { UpdatePaymentInstallmentUseCase } from "@/services/use-cases/payment-installment/update";

export function makeUpdatePaymentInstallmentUseCase() {
  const paymentInstallmentsRepository = new PrismaPaymentInstallmentsRepository();
  
  const useCase = new UpdatePaymentInstallmentUseCase(
    paymentInstallmentsRepository,
  );

  return useCase
}