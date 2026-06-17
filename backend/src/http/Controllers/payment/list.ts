import { FastifyRequest, FastifyReply } from 'fastify'

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';
import { makeListPaymentUseCase } from '@/services/factories/payment/make-list-payment-use-case';

export async function getOrderPayments(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const orderUseCase = makeListPaymentUseCase();

    const order = await orderUseCase.execute({
      orderId: id
    })

    return reply.status(200).send(order);

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}