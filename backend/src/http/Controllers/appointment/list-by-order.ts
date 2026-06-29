import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListAppointmentByOrderUseCase } from '@/services/factories/appointment/make-list-by-order';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';

export async function listAppointmentsByOrder(request: FastifyRequest, reply: FastifyReply) {
  
  const { id: orderId } = request.params as { id: string }

  try {
    const useCase = makeListAppointmentByOrderUseCase();

    const appointment = await useCase.execute(orderId)

    return reply.status(200).send(appointment);

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}