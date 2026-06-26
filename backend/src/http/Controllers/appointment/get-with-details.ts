import { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetWithDetailsAppointmentUseCase } from '@/services/factories/appointment/make-get-with-details';

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';


export async function getAppoimentWithDetails(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeGetWithDetailsAppointmentUseCase();

    const appointment = await useCase.execute(id)

    return reply.status(200).send(appointment);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}