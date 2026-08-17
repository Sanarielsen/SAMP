import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";
import { z } from "zod";

import { makePostPaymentMethod } from "@/services/factories/payment-method/make-post";


export async function postPaymentMethod(request: FastifyRequest, reply: FastifyReply) {
  const postBodySchema = z.object({
    name: z.string(),
    order: z.number(),
    observation: z.string().optional(),
  })
  const resultBody = postBodySchema.parse(request.body)
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makePostPaymentMethod();
    useCase.execute(resultBody)

    return reply.status(201).send();

  } catch (err) {
    throw err
  }
}