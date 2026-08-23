import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";
import { z } from "zod";

import { makeUpdateOrderTypeUseCase } from "@/services/factories/order-type/make-update";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export async function updateOrderType(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    order: z.number().optional(),
    observation: z.string().optional(),
  })
  const resultBody = updateBodySchema.parse(request.body)
  
  const { id } = request.params as { id: number }

  try {
    const useCase = makeUpdateOrderTypeUseCase();

    await useCase.execute({
      id: Number(id),
      ...resultBody
    })

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}