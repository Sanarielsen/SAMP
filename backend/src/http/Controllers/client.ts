import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/services/errors/user-already-exists'
import { makeNewClientUseCase } from '@/services/factories/make-new-client-use-case'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { UserNotFoundError } from '@/services/errors/user-not-found-error'

export async function newClient(request: FastifyRequest, reply: FastifyReply) {
  const newClientBodySchema = z.object({
    idUser: z.string(),
    legalName: z.string(),
    tradeName: z.string(),
    type: z.number(),
    protocol: z.string(),
    dataFundation: z.coerce.date(),
    locationAddress: z.string(),
    correspondenceAddress: z.string(),
    nameContact: z.string(),
    numberContact: z.string()
  })

  const {
    idUser,
    legalName,
    tradeName,
    type,
    protocol,
    dataFundation,
    locationAddress,
    correspondenceAddress,
    nameContact,
    numberContact
  } = newClientBodySchema.parse(request.body)

  try {

    const newClientUseCase = makeNewClientUseCase();

    await newClientUseCase.execute({
      idUser,
      legalName,
      tradeName,
      type,
      protocol,
      dataFundation,
      locationAddress,
      correspondenceAddress,
      nameContact,
      numberContact
    })
  } catch (err) {

    if (err instanceof UserNotFoundError) {
    return reply.status(404).send({
      message: err.message
    })
  }

    if (err instanceof ResourceNotFoundError) {
    return reply.status(404).send({
      message: err.message
    })
  }

    throw err
  }
  return reply.status(201).send();
}