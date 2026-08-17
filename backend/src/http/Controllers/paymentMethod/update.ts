import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";
import { z } from "zod";

import { makeUpdatePaymentMethod } from "@/services/factories/payment-method/make-update";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export async function updatePaymentMethod(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string().optional(),
    order: z.number().optional(),
    observation: z.string().optional(),
  })
  const resultBody = updateBodySchema.parse(request.body)
  
  const { id } = request.params as { id: number }

  try {
    const useCase = makeUpdatePaymentMethod();

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