import { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetAppointmentUseCase } from '@/services/factories/appointment/make-get';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';

export async function getClientAppointment(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeGetAppointmentUseCase();

    const order = await useCase.execute(id)

    return reply.status(200).send(order);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}