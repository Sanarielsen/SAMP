import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";
import { makeGetProcessPublicationUseCase } from "@/services/factories/process-publication/make-get";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export async function getProcessPublication(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeGetProcessPublicationUseCase();

    const object = await useCase.execute(id)

    return reply.status(200).send(object);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}