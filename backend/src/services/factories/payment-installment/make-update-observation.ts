import { PrismaPaymentInstallmentsRepository } from "@/repositories/prisma/payment-instalments";
import { UpdatePaymentInstallmentObservationUseCase } from "@/services/use-cases/payment-installment/update-observation";


export function makeUpdatePaymentInstallmentObservationUseCase() {
  const paymentInstallmentsRepository = new PrismaPaymentInstallmentsRepository();
  
  const useCase = new UpdatePaymentInstallmentObservationUseCase(
    paymentInstallmentsRepository,
  );

  return useCase
}