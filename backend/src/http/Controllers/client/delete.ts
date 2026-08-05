import { 
  FastifyRequest, 
  FastifyReply 
} from 'fastify'
import { 
  z,
} from 'zod';

import { makeChangeStatusClientUseCase } from '@/services/factories/client/make-change-status';


export async function updateClientStatus(
  request: FastifyRequest,
  reply: FastifyReply,
) {  
  const { id } = request.params as { id: string }

  const bodySchema = z.object({
    isActivated: z.boolean(),
  })

  const { isActivated } = bodySchema.parse(
    request.body,
  )

  const useCase = makeChangeStatusClientUseCase()

  const client = await useCase.execute({
    id,
    isActivated,
  })

  return reply.status(200).send(client)
}