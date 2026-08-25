import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";

import { makeDeleteProcessPublicationUseCase } from "@/services/factories/process-publication/make-delete";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export async function deleteProcessPublication(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeDeleteProcessPublicationUseCase();

    await useCase.execute(id)

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}