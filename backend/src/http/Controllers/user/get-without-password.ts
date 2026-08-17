import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";

import { makeGetUserProfileUseCase } from "@/services/factories/user/make-get";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export async function getUserWithoutPassword(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeGetUserProfileUseCase();

    const object = await useCase.execute({
      userId: id
    })

    return reply.status(200).send(object);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}