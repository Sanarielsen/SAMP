import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makePostOrderUseCase } from '@/services/factories/order/make-post-use-case'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { NonExistUserError } from '@/services/errors/non-exist-user-error'

export async function postOrder(request: FastifyRequest, reply: FastifyReply) {
  const postBodySchema = z.object({
    clientId: z.string(),
    orderTypeId: z.number(),
    description: z.string(),
    observation: z.string().nullable(),
    eventDate: z.coerce.date(),
  })

  const resultBody = postBodySchema.parse(request.body)

  try {
    const orderUseCase = makePostOrderUseCase();

    await orderUseCase.execute({
      userId: request.user.sub,
      order: resultBody
    })

  } catch (err) {
    if (err instanceof ResourceNotFoundError || err instanceof NonExistUserError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
  return reply.status(201).send();
}