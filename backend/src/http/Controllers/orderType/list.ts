import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListOptionsOrderTypeUseCase } from '@/services/factories/order-type/make-list-options';


export async function listOrderTypeAsOptions(request: FastifyRequest, reply: FastifyReply) {
  const orderTypeUseCase = makeListOptionsOrderTypeUseCase();

  const order = await orderTypeUseCase.execute()

  return reply.status(200).send(order);
}