import { 
  FastifyReply, 
  FastifyRequest
} from "fastify";
import { 
  z
} from "zod";

import { makeUpdateRepresentativeUseCase } from "@/services/factories/representatives/make-update-use-case";


export async function updateRepresentative(request: FastifyRequest, reply: FastifyReply) {
  const updateRepresentativeBodySchema = z.object({
    name: z.string().min(1).optional(),
    nationality: z.string().min(1).optional(),
    documentRG: z.string().min(8).max(9).optional(),
    documentCPF: z.string().min(11).max(12).optional(),
    titleJob: z.string().min(1).optional(),
    roleJob: z.string().min(1).optional(),
    clientId: z.string().min(1)
  })

  const { id } = request.params as { id: string }

  const data = updateRepresentativeBodySchema.parse(
    request.body,
  )

  const updateRepresentativeUseCase =
      makeUpdateRepresentativeUseCase()

  const representative = await updateRepresentativeUseCase.execute({
    id: id,
    ...data,
  })

  return reply.status(200).send(representative)
}