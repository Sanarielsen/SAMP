import { FastifyRequest, FastifyReply } from 'fastify'

import { makeDeleteOrderUseCase } from '@/services/factories/order/make-delete-use-case';

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';

export async function deleteOrder(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const orderUseCase = makeDeleteOrderUseCase();

    await orderUseCase.execute(id)

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}