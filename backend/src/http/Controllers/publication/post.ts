import { 
    FastifyReply, 
    FastifyRequest 
  } from "fastify";
import { z } from "zod";

import { ResourceAlreadyExistsError } from "@/services/errors/resource-already-exists-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { makePostPublicationUseCase } from "@/services/factories/publication/make-post";
	

export async function postPublication(request: FastifyRequest, reply: FastifyReply) {
  const postBodySchema = z.object({
    clientId: z.string(),
    processTypeId: z.string(),
    processNumber: z.string(),
    holder: z.string(),
    brand: z.string(),
    nature: z.string(),
    presentation: z.string(),
    specification: z.string(),
    publicationDate: z.coerce.date(),
    depositDate: z.coerce.date(),
    grantDate: z.coerce.date(),
  })

  const resultBody = postBodySchema.parse(request.body)
  
  try {
    const useCase = makePostPublicationUseCase();

    const object = await useCase.execute(resultBody)

    return reply.status(201).send(object);

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