import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod';

import { makeUpdatePaymentInstallmentPaidUseCase } from '@/services/factories/payment-installment/make-update-paid-use-case';

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';

export async function updatePaymentInstallmentAsPaid(request: FastifyRequest, reply: FastifyReply) {
  const updatePaymentInstallmentPaidBodySchema = z.object({
    paidAt: z.coerce.date().nullable(),
  })

  const resultBody = updatePaymentInstallmentPaidBodySchema.parse(request.body)
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeUpdatePaymentInstallmentPaidUseCase();

    const order = await useCase.execute({
      id,
      paidAt: resultBody.paidAt
    })

    return reply.status(200).send(order);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}