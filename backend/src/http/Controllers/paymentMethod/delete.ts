import { 
  FastifyRequest,
  FastifyReply
} from 'fastify'

import { makeDeletePaymentMethod } from '@/services/factories/payment-method/make-delete';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';


export async function deletePaymentMethod(request: FastifyRequest, reply: FastifyReply) {

  const { id } = request.params as { id: string }
  
  try {
    const useCase = makeDeletePaymentMethod();

    await useCase.execute(Number(id))

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}