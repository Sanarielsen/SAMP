import { 
  InMemoryPaymentRepository 
} from '@/repositories/in-memory/in-memory-payment-repository'
import { CreatePaymentDTO, CreatePaymentWithInstallmentsDTO } from '@shared/types/payment'

import { CreatePaymentInstallmentDTO } from '@shared/types/paymentInstallments'

export async function makePayment(
  repository: InMemoryPaymentRepository,
  override: Partial<CreatePaymentDTO> = {},
) {

  return repository.create({
    orderId: 'order-test',
    totalAmountInCents: 500000,
    totalInstallments: 3,
    firstDueDate: new Date(Date.now()),
    observation: 'observation-test',
    
    ...override,
  })
}