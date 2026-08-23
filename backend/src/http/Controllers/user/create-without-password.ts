import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeCreateUserWithoutPasswordUseCase } from '@/services/factories/user/make-user-without-password'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'


export async function postUserWithoutPassword(request: FastifyRequest, reply: FastifyReply) {
  const postBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    roleId: z.string()
  })

  const bodySchema = postBodySchema.parse(request.body)

  try {
    const useCase = makeCreateUserWithoutPasswordUseCase();

    await useCase.execute(bodySchema)

    return reply.status(201).send();
  } catch (err) {
    if (err instanceof UserAlreadyExistsError
      || err instanceof ResourceNotFoundError
    ) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}