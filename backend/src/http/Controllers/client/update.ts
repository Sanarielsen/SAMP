import { 
  FastifyRequest, 
  FastifyReply 
} from 'fastify'
import { 
  z,
} from 'zod';

import { makeUpdateClientUseCase } from '@/services/factories/client/make-update';


export async function updateClient(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateClientBodySchema = z.object({
    legalName: z.string().optional(),
    tradeName: z.string().optional(),
    type: z.number().optional(),
    protocol: z.string().optional(),
    dataFundation: z.coerce.date().optional(),
    locationAddress: z.string().optional(),
    correspondenceAddress: z.string().optional(),
    nameContact: z.string().optional(),
    numberContact: z.string().optional(),
    isActivated: z.boolean().optional(),
    responsibleById: z.string().optional(),
  })

  const { id } = request.params as { id: string }

  const data = updateClientBodySchema.parse(
    request.body,
  )

  const updateClientUseCase =
    makeUpdateClientUseCase()

  const client = await updateClientUseCase.execute({
    id: id,
    ...data,
  })

  return reply.status(200).send(client)
}