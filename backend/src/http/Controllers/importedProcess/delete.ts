import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";

import { makeDeleteImportedProcessUseCase } from "@/services/factories/imported-process/make-delete";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";


export async function deleteImportedProcess(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }
  const userLoggedId = request.user.sub

  try {
    const useCase = makeDeleteImportedProcessUseCase();
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