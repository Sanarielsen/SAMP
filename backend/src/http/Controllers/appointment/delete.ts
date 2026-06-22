import { FastifyRequest, FastifyReply } from 'fastify'

import { makeDeleteAppointmentUseCase } from '@/services/factories/appointment/make-delete';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';


export async function deleteAppointment(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeDeleteAppointmentUseCase();

    await useCase.execute(id)

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}