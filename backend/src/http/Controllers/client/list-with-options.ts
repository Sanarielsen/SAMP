import { 
  FastifyRequest, 
  FastifyReply 
} from 'fastify'

import { makeListClientWithOptionsUseCase } from '@/services/factories/client/make-list-with-options';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';


export async function listClientWithOptions(request: FastifyRequest, reply: FastifyReply) {
  const listClientWithOptions = makeListClientWithOptionsUseCase();

  const id = request.user.sub;

  try {
    const clients = await listClientWithOptions.execute({
      responsibleById: id
    })

    return reply.status(200).send(clients);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({
        message: err.message,
      })
    }
  }

}