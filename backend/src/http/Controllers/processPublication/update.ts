import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";
import { z } from "zod";

import { makeUpdateProcessPublicationUseCase } from "@/services/factories/process-publication/make-update";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";


export async function updateProcessPublication(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    importedProcessId: z.string().optional(),
    magazineNumber: z.string().optional(),
    dispatch: z.string().optional(),
    certificate: z.string().optional(),
    publicationDate: z.coerce.date().optional(),
    description: z.string().optional(),
    complement: z.string().optional(),
  })
  const resultBody = updateBodySchema.parse(request.body)
  
  const { id } = request.params as { id: string }
  const userId = request.user.sub

  try {
    const useCase = makeUpdateProcessPublicationUseCase();

    await useCase.execute({
      id,
      updatedByUser: userId,
      ...resultBody
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