import { 
  InMemoryPaymentInstallmentsRepository 
} from '@/repositories/in-memory/in-memory-payment-installment-repository'

import { CreatePaymentInstallmentDTO } from '@shared/types/paymentInstallments'

export async function makePaymentInstallment(
  paymentInstallmentRepository: InMemoryPaymentInstallmentsRepository,
  override: Partial<CreatePaymentInstallmentDTO> = {},
) {

  return paymentInstallmentRepository.create({
    paymentId: 'payment-test',
    installment: 5,
    amountInCents: 500000,
    dueDate: new Date(Date.now()),
    method: 'PIX',

    ...override,
  })
}