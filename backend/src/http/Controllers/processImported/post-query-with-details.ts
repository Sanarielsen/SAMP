import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";
import { z } from "zod";

import { makePostQueryImportProcessesWithDetails } from "@/services/factories/process-Imported/make-post-query-with-details";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export async function postQueryImportedProcessWithDetails(request: FastifyRequest, reply: FastifyReply) {
  const postBodySchema = z.object({
    categoryId: z.string(),
    historyType: z.string().optional(),
    historyId: z.string().optional(),
  })
  const resultBody = postBodySchema.parse(request.body)

  const { word: search } = request.query as { word: string }
  
  try {
    const useCase = makePostQueryImportProcessesWithDetails();

    const object = await useCase.execute(
      search,
      resultBody
    )

    return reply.status(200).send(object);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}