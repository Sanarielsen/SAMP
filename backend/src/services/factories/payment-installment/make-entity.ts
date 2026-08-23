import { 
  InMemoryPaymentInstallmentsRepository 
} from '@/repositories/in-memory/payment-installment'

import { CreatePaymentInstallmentDTO } from '@shared/types/paymentInstallment'


export async function makePaymentInstallment(
  paymentInstallmentRepository: InMemoryPaymentInstallmentsRepository,
  override: Partial<CreatePaymentInstallmentDTO> = {},
) {

  return paymentInstallmentRepository.create({
    paymentId: 'payment-test',
    installment: 5,
    amountInCents: 500000,
    dueDate: new Date(Date.now()),
    methodId: 1,

    ...override,
  })
}