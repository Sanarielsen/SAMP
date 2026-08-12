import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";

import { makeProcessPublicationFromINPIUseCase } from "@/services/factories/process-publication/make-list-from-inpi";
import { INPIUnavailableError } from "@/services/errors/inpi-unavailable-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";


export async function listProcessPublicationsFromINPI(request: FastifyRequest, reply: FastifyReply) {
  
  const { processNumber } = request.params as { processNumber: string }
  const userId = request.user.sub

  try {
    const useCase = makeProcessPublicationFromINPIUseCase();

    const object = await useCase.execute(processNumber, userId)

    return reply.status(200).send(object);

  } catch (err) {
    if (err instanceof UnauthorizedUserError) {
      return reply.status(403).send({ message: err.message })
    }
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    if (err instanceof INPIUnavailableError) {
      return reply.status(503).send({ message: err.message })
    }

    throw err
  }
}