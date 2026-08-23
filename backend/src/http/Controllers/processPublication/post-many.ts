import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";
import { z } from "zod";

import { makePostManyProcessPublicationsUseCase } from "@/services/factories/process-publication/make-post-many";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";


export async function postManyProcessPublications(request: FastifyRequest, reply: FastifyReply) {
  const publicationSchema = z.object({
    magazineNumber: z.string(),
    publicationDate: z.string(),
    dispatch: z.string(),
    certificate: z.string(),
    description: z.string(),
    complement: z.string(),
  });
  const createManyImportedProcessSchema = z.array(publicationSchema);
  const resultBody = createManyImportedProcessSchema.parse(request.body)
  
  const { id: processId } = request.params as { id: string }
  const userId = request.user.sub

  try {
    const useCase = makePostManyProcessPublicationsUseCase();

    const countInsertedPublications = await useCase.execute({
      createdByUser: userId,
      importedProcessId: processId,
      publications: resultBody
    })

    return reply.status(201).send({
      'publicacoes': countInsertedPublications
    });

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