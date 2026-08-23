import { PrismaPaymentMethodsRepository } from '@/repositories/prisma/payment-method'
import { PostPaymentMethodMethodUseCase } from '@/services/use-cases/payment-method/post'


export function makePostPaymentMethodUseCase() {
  const paymentMethodRepository = new PrismaPaymentMethodsRepository()

  return new PostPaymentMethodMethodUseCase(
    paymentMethodRepository, 
  )
}