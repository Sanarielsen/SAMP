import { 
  FastifyRequest,
  FastifyReply
} from 'fastify'

import { makeGetOrderType } from '@/services/factories/order-type/make-get';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';


export async function getOrderType(request: FastifyRequest, reply: FastifyReply) {

  const { id } = request.params as { id: string }
  
  try {
    const useCase = makeGetOrderType();

    const orderType = await useCase.execute(Number(id))

    return reply.status(201).send(orderType);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}