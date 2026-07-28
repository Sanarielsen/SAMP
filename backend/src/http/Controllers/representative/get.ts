import { 
  FastifyReply, 
  FastifyRequest
} from "fastify";

import { makeGetRepresentativeUseCase } from "@/services/factories/representatives/make-get-use-case";


export async function getRepresentative(request: FastifyRequest, reply: FastifyReply) {
  const getRepresentative = makeGetRepresentativeUseCase();

  const { id } = 
    request.params as { id: string }

  const representative = await getRepresentative.execute({
    id
  })

  return reply.status(200).send(representative);
}

