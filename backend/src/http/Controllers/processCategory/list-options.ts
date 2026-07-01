import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListProcessCategoryAsAOptionsUseCase } from '@/services/factories/process-category/make-list-options';

export async function listProcessCategoryAsAOptions(_: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListProcessCategoryAsAOptionsUseCase();

  const categories = await useCase.execute()

  return reply.status(200).send(categories);
}