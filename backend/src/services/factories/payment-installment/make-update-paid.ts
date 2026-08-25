import { PrismaPaymentInstallmentsRepository } from "@/repositories/prisma/payment-instalments";
import { UpdatePaymentInstallmentPaidUseCase } from "@/services/use-cases/payment-installment/update-paid";


export function makeUpdatePaymentInstallmentPaidUseCase() {
  const paymentInstallmentsRepository = new PrismaPaymentInstallmentsRepository();
  
  const useCase = new UpdatePaymentInstallmentPaidUseCase(
    paymentInstallmentsRepository,
  );

  return useCase
}