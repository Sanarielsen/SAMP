import { FastifyRequest, FastifyReply } from 'fastify'

import { makeDeletePaymentUseCase } from '@/services/factories/payment/make-delete-use-case'

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'

export async function deletePayment(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeDeletePaymentUseCase();

    await useCase.execute({
      id
    })

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
  return reply.status(204).send();
}