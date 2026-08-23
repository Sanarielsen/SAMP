import { 
  FastifyRequest,
  FastifyReply
} from 'fastify'

import { makeGetPaymentMethodUseCase } from '@/services/factories/payment-method/make-get';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';


export async function getPaymentMethod(request: FastifyRequest, reply: FastifyReply) {

  const { id } = request.params as { id: string }
  
  try {
    const useCase = makeGetPaymentMethodUseCase();

    const object = await useCase.execute(Number(id))

    return reply.status(200).send(object);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}