import { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetOrderDetailUseCase } from '@/services/factories/order/make-get-detail-use-case';

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';


export async function getOrderDetails(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeGetOrderDetailUseCase();

    const order = await useCase.execute({
      id
    })

    return reply.status(200).send(order);

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}