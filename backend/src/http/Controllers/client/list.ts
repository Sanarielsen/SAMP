import { 
  FastifyRequest, 
  FastifyReply
} from 'fastify'

import { makeListClientUseCase } from '@/services/factories/client/make-list';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';


export async function listClient(request: FastifyRequest, reply: FastifyReply) {
  const listClient = makeListClientUseCase();

  const { id } = request.params as { id: string }
  const { word: search } = request.query as { word: string }

  try {
    const clients = await listClient.execute({
      responsibleById: id,
      search
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

