import { 
  FastifyRequest, 
  FastifyReply
} from 'fastify'
import { z } from 'zod';

import { makeUpdateUserProfileUseCase } from '@/services/factories/user/make-update';

import { EmailInvalidError } from '@/services/errors/email-invalid-error';
import { NonExistUserError } from '@/services/errors/non-exist-user-error';
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists';


export async function updateUser(request: FastifyRequest, reply: FastifyReply) {

  const patchBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    roleId: z.string().optional(),
  })
  
  const resultBody = patchBodySchema.parse(request.body)

  const { id } = request.params as { id: string }
  
  try {
    const userUseCase = makeUpdateUserProfileUseCase();
    
    await userUseCase.execute({
      ...resultBody,
      id,
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