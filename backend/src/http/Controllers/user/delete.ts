import { FastifyRequest, FastifyReply } from 'fastify'

import { makeDeleteUser } from '@/services/factories/user/make-delete';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';
import { UnauthorizedUserError } from '@/services/errors/unauthorized-user-error';


export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  
  const { id: userWillBeDeleted } = request.params as { id: string }
  const userLoggedId = request.user.sub

  try {
    const useCase = makeDeleteUser();

    await useCase.execute(
      userLoggedId,
      userWillBeDeleted,
    )

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof UnauthorizedUserError) {
      return reply.status(403).send({ message: err.message })
    }
    if (err instanceof InvalidCredentialsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}