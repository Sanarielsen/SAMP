import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListProcessHistoricAsAOptionsUseCase } from '@/services/factories/process-historic/make-list-as-a-option';


export async function listProcessHistoricAsAOptions(_: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListProcessHistoricAsAOptionsUseCase();

  const categories = await useCase.execute()

  return reply.status(200).send(categories);
}