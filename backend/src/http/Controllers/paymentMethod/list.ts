import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListPaymentMethodsUseCase } from '@/services/factories/payment-method/make-list-use-case';

export async function listPaymentMethods(_: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListPaymentMethodsUseCase();

  const paymentMethods = await useCase.execute()

  return reply.status(200).send(paymentMethods);
}