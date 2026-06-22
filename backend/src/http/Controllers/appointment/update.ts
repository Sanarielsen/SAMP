import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod';

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';
import { makeUpdateAppointmentUseCase } from '@/services/factories/appointment/make-update';

export async function updateClientAppointment(request: FastifyRequest, reply: FastifyReply) {
  const updateAppointmentBodySchema = z.object({
    clientId: z.string().optional(),
    orderId: z.string().optional().nullable(),
    description: z.string().optional(),
    appointmentAt: z.coerce.date().optional(),
  })

  const resultBody = updateAppointmentBodySchema.parse(request.body)

  const { id } = request.params as { id: string }

  try {
    const useCase = makeUpdateAppointmentUseCase();

    const appointment = await useCase.execute({
      id,
      ...resultBody,
    })

    return reply.status(200).send(appointment);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}