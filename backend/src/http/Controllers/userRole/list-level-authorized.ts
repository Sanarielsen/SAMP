import { FastifyRequest, FastifyReply } from 'fastify'

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';
import { makeListUserRoleAuthorizedUseCase } from '@/services/factories/user-role/make-list-user-role-authorized';
import { NonExistUserError } from '@/services/errors/non-exist-user-error';

export async function listUserRoleLevelAuthorized(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListUserRoleAuthorizedUseCase();

  const id = request.user.sub;

  try {

    const userRoles = await useCase.execute({
      userId: id
    })

    return reply.status(200).send(userRoles);
    
  } catch (err) {
    if (err instanceof NonExistUserError
      || err instanceof InvalidCredentialsError
    ) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }
}