import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod';

import { makeGetUserProfileUseCase } from '@/services/factories/make-get-user-profile-use-case';
import { makeUpdateUserProfileUseCase } from '@/services/factories/make-update-user-profile-use-case';

import { EmailInvalidError } from '@/services/errors/email-invalid-error';
import { NonExistUserError } from '@/services/errors/non-exist-user-error';
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase();

  const profile = await getUserProfile.execute({
    userId: request.user.sub
  })

  return reply.status(200).send({
    ...profile,
    password_hash: undefined
  });
}

export async function updateProfile(request: FastifyRequest, reply: FastifyReply) {
  const updateUserProfileBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    roleId: z.string().optional(),
  })
  
  const resultBody = updateUserProfileBodySchema.parse(request.body)
  
  try {
    const userUseCase = makeUpdateUserProfileUseCase();
    
    await userUseCase.execute({
      ...resultBody,
      id: request.user.sub
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof NonExistUserError 
      || err instanceof UserAlreadyExistsError 
      || err instanceof EmailInvalidError
    ) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}