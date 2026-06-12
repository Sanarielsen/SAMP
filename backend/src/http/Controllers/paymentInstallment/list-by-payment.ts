import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListByPaymentInstallmentUseCase } from '@/services/factories/payment-installment/make-list-by-payment-installment';

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';

export async function listPaymentInstallments(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }

  try {
    
    const useCase = makeListByPaymentInstallmentUseCase();

    const paymentInstallment = await useCase.execute({
      paymentId: id
    })

    return reply.status(200).send(paymentInstallment);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}