import { PrismaPaymentMethodsRepository } from '@/repositories/prisma/payment-method'
import { UpdatePaymentMethodMethodUseCase } from '@/services/use-cases/payment-method/update'


export function makeUpdatePaymentMethodUseCase() {
  const paymentMethodRepository = new PrismaPaymentMethodsRepository()

  return new UpdatePaymentMethodMethodUseCase(
    paymentMethodRepository, 
  )
}