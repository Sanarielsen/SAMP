import { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetOrderUseCase } from '@/services/factories/order/make-get-use-case';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';

export async function getOrder(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const orderUseCase = makeGetOrderUseCase();

    const order = await orderUseCase.execute({
      id,
      userId: request.user.sub
    })

    return reply.status(200).send(order);

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}