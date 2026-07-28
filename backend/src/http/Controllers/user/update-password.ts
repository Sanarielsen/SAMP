import { 
	  FastifyReply, 
	  FastifyRequest 
	} from "fastify";
import { z } from "zod";

import { makeUpdateUserPasswordUseCase } from "@/services/factories/user/make-change-password";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";
	

export async function updateUserPassword(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    password: z.string(),
    confirm: z.string(),
  })

  const resultBody = bodySchema.parse(request.body)
  
  const { id } = request.params as { id: string }
  const userId = request.user.sub

  try {
    const useCase = makeUpdateUserPasswordUseCase();

    await useCase.execute({
      id,
      userLoggedId: userId,
      ...resultBody,
    })

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: err.message })
    }
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    if (err instanceof UnauthorizedUserError) {
      return reply.status(403).send({ message: err.message })
    }

    throw err
  }
}