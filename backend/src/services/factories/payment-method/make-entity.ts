import { 
  InMemoryPaymentMethodRepository
} from '@/repositories/in-memory/payment-method'

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