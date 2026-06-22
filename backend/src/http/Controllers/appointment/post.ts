import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makePostAppointmentUseCase } from '@/services/factories/appointment/make-post'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { UserNotResponsibleForClientError } from '@/services/errors/non-responsable-user'

export async function postClientAppointment(request: FastifyRequest, reply: FastifyReply) {
  const postBodySchema = z.object({
    clientId: z.string(),
    orderId: z.string().optional(),
    description: z.string(),
    appointmentAt: z.coerce.date(),
  })

  const resultBody = postBodySchema.parse(request.body)

  const idUser = request.user.sub;

  try {
    const useCase = makePostAppointmentUseCase();

    await useCase.execute({
      idUser,
      data: resultBody
    })

  } catch (err) {
    if (err instanceof UserNotResponsibleForClientError) {
      return reply.status(403).send({ message: err.message })
    }
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
  return reply.status(201).send();
}