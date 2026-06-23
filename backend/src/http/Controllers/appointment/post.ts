import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makePostAppointmentUseCase } from '@/services/factories/appointment/make-post'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'

export async function postAppointment(request: FastifyRequest, reply: FastifyReply) {
  const postBodySchema = z.object({
    userId: z.string(),
    clientId: z.string(),
    orderId: z.string().optional(),
    description: z.string(),
    appointmentAt: z.coerce.date(),
  })

  const resultBody = postBodySchema.parse(request.body)

  try {
    const useCase = makePostAppointmentUseCase();

    await useCase.execute(resultBody)

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
  return reply.status(201).send();
}