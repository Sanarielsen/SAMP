import { 
  InMemoryPaymentMethodRepository
} from '@/repositories/in-memory/in-memory-payment-method-repository'

import { PaymentMethod } from '@shared/types/paymentMethod'


export async function makePaymentMethod(
  paymentMethodsRepository: InMemoryPaymentMethodRepository,
  override: Partial<PaymentMethod> = {},
) {

  return paymentMethodsRepository.create({
    name: 'payment-method-test',
    order: 1,

    ...override,
  })
}