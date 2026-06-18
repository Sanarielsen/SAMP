import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod';

import { makeUpdatePaymentInstallmentPaidUseCase } from '@/services/factories/payment-installment/make-update-paid-use-case';

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';
import { pumpStreamToFile } from '@/utils/streamFile';

export async function updatePaymentInstallmentAsPaid(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  const parts = request.parts()

  let paidAt: string = ''
  let proofFilePath: string = ''

  for await (const part of parts) {

    if (part.type === 'field' && part.fieldname === 'paidAt') {
      paidAt = part.value as string
    }

    if (part.type === 'file' && part.fieldname === 'proofPayment') {
      const fileName = `${Date.now()}-${part.filename}`
      const filePath = `uploads/pdf/${fileName}`
      await pumpStreamToFile(part.file, filePath)
      proofFilePath = filePath
    }
  }

  try {
    const useCase = makeUpdatePaymentInstallmentPaidUseCase();

    const order = await useCase.execute({
      id,
      paidAt: new Date(paidAt),
      proofPaymentPath: proofFilePath
    })

    return reply.status(200).send(order);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}