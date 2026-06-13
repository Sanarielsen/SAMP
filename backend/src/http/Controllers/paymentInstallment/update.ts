import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod';

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';
import { makeUpdatePaymentInstallmentUseCase } from '@/services/factories/payment-installment/make-update-payment-installment-use-case';

export async function updatePaymentInstallment(request: FastifyRequest, reply: FastifyReply) {
  const updatePaymentInstallmentBodySchema = z.object({

    installment: z.number().optional(),
    amountInCents: z.number().optional(),
    dueDate: z.coerce.date().optional(),
    paidAt: z.coerce.date().optional(),
    receiptFilePath: z.string().optional(),
    observation: z.string().optional(),
  })

  const resultBody = updatePaymentInstallmentBodySchema.parse(request.body)
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeUpdatePaymentInstallmentUseCase();

    const order = await useCase.execute({
      id,
      ...resultBody
    })

    return reply.status(200).send(order);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}