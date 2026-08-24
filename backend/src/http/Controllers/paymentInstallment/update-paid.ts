import { 
  FastifyRequest, 
  FastifyReply 
} from 'fastify'
import { z } from 'zod';

import { makeUpdatePaymentInstallmentPaidUseCase } from '@/services/factories/payment-installment/make-update-paid-use-case';

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';



export async function updatePaymentInstallmentAsPaid(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const patchBodySchema = z.object({
    paidAt: z.coerce.date().nullable()
  })

  const resultBody = patchBodySchema.parse(request.body)
  
  const { id } = request.params as { id: string }

  //TODO: Verify with client is really important save the comprovants
  // const parts = request.parts()

  // let paidAt: string | null = null
  // let proof: PaymentInstallmentProof | null = null

  // for await (const part of parts) {
  //   if (part.type === 'field' && part.fieldname === 'paidAt') {
  //     paidAt = part.value as string
  //   }
    
  //   if (
  //     part.type === 'file' &&
  //     part.fieldname === 'proofPayment' &&
  //     part.filename &&
  //     part.filename.trim() !== ''
  //   ) {
  //     proof = {
  //       file: await streamToBuffer(part.file),
  //       name: part.fieldname
  //     }
  //   }
  // }

  try {
    const useCase = makeUpdatePaymentInstallmentPaidUseCase()

    const installment = await useCase.execute({
      id,
      paidAt: resultBody.paidAt
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