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
    totalInstallments: z.number().min(1),
    totalAmountInCents: z.number().positive(),
    firstDueDate: z.coerce.date(),
    methodId: z.string(),
    observation: z.string().nullable().optional(),
  })

  const { id } = request.params as { id: string }

  console.log("AAAAAAAAAAAAAAAAA")

  const body = bodySchema.parse(request.body)

  const useCase = makePostPaymentWithInstallmentsUseCase();

  const result = await useCase.execute({
    idOrder: id,
    newPayment: body
  })
  
  return reply.status(201).send(result)
}