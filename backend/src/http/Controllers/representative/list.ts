import { 
  FastifyReply, 
  FastifyRequest
} from "fastify";

import { makeListRepresentativeUseCase } from "@/services/factories/representatives/make-list";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export async function listRepresentative(request: FastifyRequest, reply: FastifyReply) {
  const listRepresentativeUseCase = makeListRepresentativeUseCase();

  const id = request.user.sub;

  const { search } = request.query as { search: string }

  try {
    const representatives = await listRepresentativeUseCase.execute({
      idUser: id,
      search
    })

    return reply.status(200).send(representatives);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({
        message: err.message,
      })
    }
  }
}