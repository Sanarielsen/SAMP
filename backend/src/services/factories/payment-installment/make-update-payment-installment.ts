import { PrismaPaymentInstallmentsRepository } from "@/repositories/prisma/payment-instalments";
import { UpdatePaymentInstallmentUseCase } from "@/services/use-cases/payment-installment/update";


export function makeUpdatePaymentInstallmentUseCase() {
  const paymentInstallmentsRepository = new PrismaPaymentInstallmentsRepository();
  
  const useCase = new UpdatePaymentInstallmentUseCase(
    paymentInstallmentsRepository,
  );

  return useCase
}