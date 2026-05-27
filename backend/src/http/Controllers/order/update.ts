import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod';

import { makeUpdateOrderUseCase } from '@/services/factories/order/make-update-use-case';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';

export async function updateOrder(request: FastifyRequest, reply: FastifyReply) {
  const updateOrderBodySchema = z.object({
    clientId: z.string().optional(),
    orderTypeId: z.number().optional(),
    description: z.string().optional(),
    observation: z.string().optional(),
    eventDate: z.coerce.date().optional(),
  })

  const resultBody = updateOrderBodySchema.parse(request.body)
  
  const { id } = request.params as { id: string }

  try {
    const orderUseCase = makeUpdateOrderUseCase();

    const order = await orderUseCase.execute({
      ...resultBody,
      id
    })

    return reply.status(200).send(order);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}