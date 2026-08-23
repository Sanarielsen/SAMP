import { 
  FastifyReply, 
  FastifyRequest
} from "fastify";

import { makeGetRepresentativeOfClientsUseCase } from "@/services/factories/representatives/make-get-of-clients";


export async function getRepresentativeOfClients(request: FastifyRequest, reply: FastifyReply) {
  const getRepresentativeOfClients = makeGetRepresentativeOfClientsUseCase();

  const { id } = 
    request.params as { id: string }

  const representative = await getRepresentativeOfClients.execute({
    id
  })

  return reply.status(200).send(representative);
}