import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";
import { 
  z
} from "zod";

import { makeDeleteRepresentativeUseCase } from "@/services/factories/representatives/make-delete-use-case";


export async function deleteRepresentative(request: FastifyRequest, reply: FastifyReply) {

  const paramsDeleteSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsDeleteSchema.parse(request.params)

  const deleteClientUseCase = makeDeleteRepresentativeUseCase();

  await deleteClientUseCase.execute({ id })

  return reply.status(204).send()
}