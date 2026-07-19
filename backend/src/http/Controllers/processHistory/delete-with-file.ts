import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";

import { makeDeleteProcessHistoryWithFileUseCase } from "@/services/factories/process-history/make-delete-with-file";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export async function deleteProcessHistoryWithFile(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeDeleteProcessHistoryWithFileUseCase();

    const object = await useCase.execute(id)

    return reply.status(204).send();

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    throw err
  }
}