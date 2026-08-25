import { 
  FastifyRequest, 
  FastifyReply 
} from 'fastify'
import { z } from 'zod';

import { makeCreateOrderTypeUseCase } from '@/services/factories/order-type/make-create';


export async function createOrderType(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    order: z.number().min(1),
    observation: z.string().optional(),
  })

  const resultBody = createBodySchema.parse(request.body)

  const useCase = makeCreateOrderTypeUseCase();

  try {
    await useCase.execute(resultBody)

    return reply.status(201).send();
  } catch (err) {
    throw err;
  }
}