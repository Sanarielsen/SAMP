import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { NonExistUserError } from '@/services/errors/non-exist-user-error'
import { makePostPaymentUseCase } from '@/services/factories/payment/make-payment-use-case'

export async function postPayment(request: FastifyRequest, reply: FastifyReply) {
  const postBodySchema = z.object({
    orderId: z.string(),
    totalInstallments:  z.number(),
    description: z.string(),
    observation: z.string().optional()
  })

  const resultBody = postBodySchema.parse(request.body)

  try {
    const useCase = makePostPaymentUseCase();

    await useCase.execute({
      orderId: resultBody.orderId,
      totalInstallments: resultBody.totalInstallments,
      description: resultBody.description,
      observation: resultBody.observation
    })

  } catch (err) {
    if (err instanceof ResourceNotFoundError || err instanceof NonExistUserError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
  return reply.status(201).send();
}