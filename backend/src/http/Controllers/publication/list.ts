import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListPublicationUseCase } from '@/services/factories/publication/make-list';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';


export async function listPublicationDetails(request: FastifyRequest, reply: FastifyReply) {
  
  const { word: search } = request.query as { word: string }
  const userId = request.user.sub

  try {
    const useCase = makeListPublicationUseCase();

    const publications = await useCase.execute(userId, search)

    return reply.status(200).send(publications);

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}