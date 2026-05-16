import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeListRepresentativeUseCase } from "@/services/factories/representatives/make-list-use-case";
import { FastifyReply, FastifyRequest } from "fastify";


export async function listRepresentative(request: FastifyRequest, reply: FastifyReply) {
  const listRepresentativeUseCase = makeListRepresentativeUseCase();

  const { id } = request.params as { id: string }
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