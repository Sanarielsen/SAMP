import { FastifyRequest, FastifyReply } from 'fastify'

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';
import { makeListRecentAppointmentUseCase } from '@/services/factories/appointment/make-list-recents';
import { z } from 'zod';

export async function listRecentAppointments(request: FastifyRequest, reply: FastifyReply) {
  
  const { range } = request.params as { range: number }
  const userId = request.user.sub
  
  try {
    const useCase = makeListRecentAppointmentUseCase();
    const appointments = await useCase.execute(userId, range)

    return reply.status(200).send(appointments);

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}