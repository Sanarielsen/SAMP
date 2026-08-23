import { 
  FastifyRequest, 
  FastifyReply 
} from 'fastify'
import { z } from 'zod';

import { makeUpdatePaymentInstallmentObservationUseCase } from '@/services/factories/payment-installment/make-update-observation';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';


export async function updatePaymentInstallmentObservation(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const patchBodySchema = z.object({
    observation: z.string().nullable()
  })
  const resultBody = patchBodySchema.parse(request.body)
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeUpdatePaymentInstallmentObservationUseCase()

    const installment = await useCase.execute({
      id,
      observation: resultBody.observation
    })

    return reply.status(200).send(installment)

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: err.message
      })
    }
    throw err
  }
}