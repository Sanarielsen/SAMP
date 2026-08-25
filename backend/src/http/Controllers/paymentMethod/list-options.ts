import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListPaymentMethodOptionsUseCase } from '@/services/factories/payment-method/make-list-options';


export async function listPaymentMethodOptions(_: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListPaymentMethodOptionsUseCase();

  const paymentMethods = await useCase.execute()

  return reply.status(200).send(paymentMethods);
}