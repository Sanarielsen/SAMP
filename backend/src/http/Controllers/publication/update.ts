import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";
import { z } from "zod";

import { makeUpdatePublicationUseCase } from "@/services/factories/publication/make-update";

import { ResourceAlreadyExistsError } from "@/services/errors/resource-already-exists-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
	
	
export async function updatePublication(request: FastifyRequest, reply: FastifyReply) {
    const postBodySchema = z.object({
      clientId: z.string(),
      processTypeId: z.string(),
      processNumber: z.string().optional(),
      holder: z.string().optional(),
      brand: z.string().optional(),
      nature: z.string().optional(),
      presentation: z.string().optional(),
      specification: z.string().optional(),
      publicationDate: z.coerce.date().optional(),
      depositDate: z.coerce.date().optional(),
      grantDate: z.coerce.date().optional(),
  })
  const resultBody = postBodySchema.parse(request.body)
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeUpdatePublicationUseCase();

    const object = await useCase.execute({
      id,
      ...resultBody,
    })

    return reply.status(200).send(object);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    if (err instanceof ResourceAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}