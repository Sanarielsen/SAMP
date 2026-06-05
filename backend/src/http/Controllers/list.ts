import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListUserUseCase } from '@/services/factories/make-user-use-case';

export async function listUsersWithSearch(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListUserUseCase();

  const id = request.user.sub;
  const { word: search } = request.query as { word: string }

  const users = await useCase.execute({
    id,
    search
  })

  return reply.status(200).send(users);
}