import { PrismaPaymentInstallmentsRepository } from "@/repositories/prisma/prisma-payment-instalments-repository";
import { UpdatePaymentInstallmentObservationUseCase } from "@/services/use-cases/payment-installment/update-observation";


export function makeUpdatePaymentInstallmentObservation() {
  const paymentInstallmentsRepository = new PrismaPaymentInstallmentsRepository();
  
  const useCase = new UpdatePaymentInstallmentObservationUseCase(
    paymentInstallmentsRepository,
  );

  return useCase
}