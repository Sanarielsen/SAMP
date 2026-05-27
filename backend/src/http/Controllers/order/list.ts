import { FastifyRequest, FastifyReply } from 'fastify'

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';
import { makeListOrderUseCase } from '@/services/factories/order/make-list-use-case';

export async function listOrder(request: FastifyRequest, reply: FastifyReply) {
  
  const { id: clientId } = request.params as { id: string }
  const { search } = request.query as { search: string }

  try {
    const orderUseCase = makeListOrderUseCase();

    const order = await orderUseCase.execute({
      clientId,
      userId: request.user.sub,
      search
    })

    return reply.status(200).send(order);

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}