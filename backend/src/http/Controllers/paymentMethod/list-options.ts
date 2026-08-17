import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListPaymentMethodOptions } from '@/services/factories/payment-method/make-list-options';


export async function listPaymentMethodOptions(_: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListPaymentMethodOptions();

  const paymentMethods = await useCase.execute()

  return reply.status(200).send(paymentMethods);
}