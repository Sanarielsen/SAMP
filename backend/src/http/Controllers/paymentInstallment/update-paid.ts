import { FastifyRequest, FastifyReply } from 'fastify'

import { makeUpdatePaymentInstallmentPaidUseCase } from '@/services/factories/payment-installment/make-update-paid-use-case';

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';
import { pumpStreamToFile } from '@/utils/streamFile';

export async function updatePaymentInstallmentAsPaid(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  const parts = request.parts()

  let paidAt: string | null = null
  let proofFilePath: string | null = null

  for await (const part of parts) {

    if (part.type === 'field' && part.fieldname === 'paidAt') {
      paidAt = part.value as string
    }

    if (
      part.type === 'file' &&
      part.fieldname === 'proofPayment' &&
      part.filename &&
      part.filename.trim() !== ''
    ) {
      const fileName = `${Date.now()}-${part.filename}`
      const filePath = `uploads/pdf/${fileName}`

      await pumpStreamToFile(part.file, filePath)

      proofFilePath = filePath
    }
  }

  console.log(proofFilePath)

  try {
    const useCase = makeUpdatePaymentInstallmentPaidUseCase();

    const installment = await useCase.execute({
      id,
      paidAt: paidAt ? new Date(paidAt) : null,
      proofPaymentPath: proofFilePath
    })

    return reply.status(200).send(installment);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}