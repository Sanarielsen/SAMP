import { 
  InMemoryPaymentRepository 
} from '@/repositories/in-memory/payment'

import { CreatePaymentDTO } from '@shared/types/payment'


export async function makePayment(
  repository: InMemoryPaymentRepository,
  override: Partial<CreatePaymentDTO> = {},
) {

  return repository.create({
    orderId: 'order-test',
    totalInstallments: 3,
    firstDueDate: new Date(Date.now()),
    observation: 'observation-test',
    
    ...override,
  })
}