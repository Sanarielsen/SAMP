import { 
  InMemoryPaymentMethodsRepository
} from '@/repositories/in-memory/in-memory-payment-methods-repository'

import { CreatePaymentMethodDTO, PaymentMethod } from '@shared/types/paymentMethod'

export async function makePaymentMethod(
  paymentMethodsRepository: InMemoryPaymentMethodsRepository,
  override: Partial<PaymentMethod> = {},
) {

  return paymentMethodsRepository.create({
    name: 'Method Test',
    order: 1,

    ...override,
  })
}