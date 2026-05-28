import { FastifyRequest, FastifyReply } from 'fastify'

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';
import { makeListOptionsOrderTypeUseCase } from '@/services/factories/order-type/make-list-options-use-case';

export async function listOrderType(request: FastifyRequest, reply: FastifyReply) {
  const orderTypeUseCase = makeListOptionsOrderTypeUseCase();

  const order = await orderTypeUseCase.execute()

  return reply.status(200).send(order);
}