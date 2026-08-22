import { PrismaPaymentMethodsRepository } from '@/repositories/prisma/prisma-payment-method-repository'
import { PostPaymentMethodMethodUseCase } from '@/services/use-cases/payment-method/post'


export function makePostPaymentMethod() {
  const paymentMethodRepository = new PrismaPaymentMethodsRepository()

  return new PostPaymentMethodMethodUseCase(
    paymentMethodRepository, 
  )
}