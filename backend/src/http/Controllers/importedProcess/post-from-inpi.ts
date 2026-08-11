import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";
import { z } from "zod";

import { makePostImportedProcessFromINPI } from "@/services/factories/imported-process/make-post-from-inpi";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
	

export async function postImportedProcessFromINPI(request: FastifyRequest, reply: FastifyReply) {
  const postBodySchema = z.object({
    clientId: z.string(),
    processNumber: z.string(),
    processStatus: z.string(),
    processMagazine: z.string(),
    holder: z.string(),
    brand: z.string(),
    nature: z.string(),
    presentation: z.string(),
    niceTitle: z.string(),
    niceStatus: z.string(),
    niceSpecification: z.string(),
    filingDate: z.coerce.date(),
    grantDate: z.coerce.date(),
    expirationDate: z.coerce.date(),
  })

  const resultBody = postBodySchema.parse(request.body)

  try {
    const useCase = makePostImportedProcessFromINPI();

    const object = await useCase.execute({
      ...resultBody,
      userIdLogged: request.user.sub,
    })

    return reply.status(200).send(object);

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