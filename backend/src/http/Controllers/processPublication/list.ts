import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";

import { makeListProcessPublicationUseCase } from "@/services/factories/process-publication/make-list";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export async function listProcessPublications(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeListProcessPublicationUseCase();

    const object = await useCase.execute(id)

    return reply.status(200).send(object);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}