import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListOrderWithOptionsUseCase } from '@/services/factories/order/make-list-with-options';

export async function listOrdersWithOptions(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListOrderWithOptionsUseCase();

  const { id: clientId } = request.params as { id: string }

  const ordersWithOptions = await useCase.execute(clientId)

  return reply.status(200).send(ordersWithOptions);
}