import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListAppointmentUseCase } from '@/services/factories/appointment/make-list';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';

export async function listClientAppointments(request: FastifyRequest, reply: FastifyReply) {
  
  const { id: clientId } = request.params as { id: string }

  try {
    const useCase = makeListAppointmentUseCase();

    const appointment = await useCase.execute(clientId)

    return reply.status(200).send(appointment);

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}