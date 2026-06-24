import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListWithOptionsUserUseCase } from '@/services/factories/user/make-list-options';

export async function listUsersWithOptions(_: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListWithOptionsUserUseCase();

  const usersWithOptions = await useCase.execute()

  return reply.status(200).send(usersWithOptions);
}