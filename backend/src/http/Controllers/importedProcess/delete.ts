import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";

import { makeDeleteImportedProcess } from "@/services/factories/imported-process/make-delete";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export async function deleteImportedProcess(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeDeleteImportedProcess();
    await useCase.execute(id)

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}