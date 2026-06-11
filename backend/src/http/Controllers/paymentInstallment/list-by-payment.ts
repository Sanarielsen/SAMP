import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListByPaymentInstallmentUseCase } from '@/services/factories/payment-installment/make-list-by-payment-installment';

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';

export async function getPaymentInstallments(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeListByPaymentInstallmentUseCase();

    const paymentInstallment = await useCase.execute({
      paymentId: id
    })

    return reply.status(200).send(paymentInstallment);

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}