import { PrismaPaymentMethodsRepository } from '@/repositories/prisma/prisma-payment-method-repository'
import { UpdatePaymentMethodMethodUseCase } from '@/services/use-cases/payment-method/update'


export function makeUpdatePaymentMethod() {
  const paymentMethodRepository = new PrismaPaymentMethodsRepository()

  return new UpdatePaymentMethodMethodUseCase(
    paymentMethodRepository, 
  )
}