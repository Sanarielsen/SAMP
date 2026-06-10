import { 
  FastifyReply, 
  FastifyRequest 
} from 'fastify'
import { z } from 'zod'

import { makePostPaymentWithInstallmentsUseCase } from '@/services/factories/payment-installment/make-payment-installments-use-case'


export async function postPaymentWithPayments(
  request: FastifyRequest,
  reply: FastifyReply,
) {

  const bodySchema = z.object({
    orderId: z.string(),
    totalInstallments: z.number().min(1),
    totalAmountInCents: z.number().positive(),
    firstDueDate: z.coerce.date(),
    method: z.string().min(1),
    description: z.string().min(1),
    observation: z.string().nullable().optional(),
  })

  const body = bodySchema.parse(request.body)

  const useCase = makePostPaymentWithInstallmentsUseCase();

  // try {
  //   const result2 = await useCase.execute(body)
  // } catch (error) {
  //   console.log(error)
  // }
  const result = await useCase.execute(body)
  
  return reply.status(201).send(result)
}