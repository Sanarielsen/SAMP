import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";

import { makeDeleteProcessPublicationUseCase } from "@/services/factories/process-publication/make-delete";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";


export async function deleteProcessPublication(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }
  const userLoggedId = request.user.sub

  try {
    const useCase = makeDeleteProcessPublicationUseCase();

    await useCase.execute(id, userLoggedId)

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof UnauthorizedUserError) {
      return reply.status(403).send({ message: err.message })
    }
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}