import { 
  FastifyRequest, 
  FastifyReply 
} from 'fastify'

import { makeGetClientProfileUseCase } from '@/services/factories/client/make-get';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';


export async function getClient(request: FastifyRequest, reply: FastifyReply) {
  const getClientProfile = makeGetClientProfileUseCase();

  const { id } = request.params as { id: string }

  try {
    const client = await getClientProfile.execute({
      clientId: id
    })

    return reply.status(200).send(client);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({
        message: err.message,
      })
    }
  }
}