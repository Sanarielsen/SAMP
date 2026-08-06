import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";
import { z } from "zod";
import { makeUpdateImportedProcess } from "@/services/factories/imported-process/make-update";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";
	

export async function updateImportedProcess(request: FastifyRequest, reply: FastifyReply) {

  const patchBodySchema = z.object({
    clientId: z.string().optional(),
    processNumber: z.string().optional(),
    processStatus: z.string().optional(),
    holder: z.string().optional(),
    brand: z.string().optional(),
    nature: z.string().optional(),
    presentation: z.string().optional(),
    specification: z.string().optional(),
    updatedAtByMagazine: z.string().optional(),
    filingDate: z.coerce.date().optional(),
    grantDate: z.coerce.date().optional(),
    expirationDate: z.coerce.date().optional(),
  })

  const resultBody = patchBodySchema.parse(request.body)
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeUpdateImportedProcess();

    await useCase.execute({
      ...resultBody,
      id,
      userIdLogged: request.user.sub
    })

    return reply.status(204).send();

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