import { ResourceAlreadyExistsError } from '@/services/errors/resource-already-exists-error';
import { makeCreateClientUseCase } from '@/services/factories/make-create-client-use-case';
import { makeGetClientProfileUseCase } from '@/services/factories/make-get-client-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z, ZodError } from 'zod';

export async function getClient(request: FastifyRequest, reply: FastifyReply) {
  const getClientProfile = makeGetClientProfileUseCase();

  const { id } = request.params as { id: string }

  const profile = await getClientProfile.execute({
    clientId: id
  })

  return reply.status(200).send({
    client: {
      ...profile,
      password_hash: undefined
    }
  });
}

export async function postClient(request: FastifyRequest, reply: FastifyReply) {
  const createClientBodySchema = z.object({
    legalName: z.string().min(1),
    tradeName: z.string().min(1),
    type: z.number().min(1),
    protocol: z.string().min(11).max(15),
    dataFundation: z.coerce.date(),
    locationAddress: z.string().min(1),
    correspondenceAddress: z.string().min(1),
    nameContact: z.string().min(1),
    numberContact: z.string().min(1),
    isActivated: z.boolean(),
  })

  const { 
    legalName,
    tradeName,
    type,
    protocol,
    dataFundation,
    locationAddress,
    correspondenceAddress,
    nameContact,
    numberContact,
    isActivated
  } = createClientBodySchema.parse(request.body)

  const createClientProfile = makeCreateClientUseCase();

  try {
    await createClientProfile.execute({
      idUser: request.user.sub,
      legalName,
      tradeName,
      type,
      protocol,
      dataFundation,
      locationAddress,
      correspondenceAddress,
      nameContact,
      numberContact,
      isActivated,   
    })
  } catch (err) {
    if (err instanceof ZodError) {
      return reply.status(400).send({
        message: 'Validation error.',
        issues: err.flatten().fieldErrors,
      })
    }
    if (err instanceof ResourceAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err;
  }

  return reply.status(201).send({ message: "Cliente adicionado com sucesso." });
}