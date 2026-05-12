import { ResourceAlreadyExistsError } from '@/services/errors/resource-already-exists-error';
import { makeCreateClientUseCase } from '@/services/factories/make-create-client-use-case';
import { makeGetClientProfileUseCase } from '@/services/factories/make-get-client-use-case'
import { makeListClientUseCase } from '@/services/factories/make-list-client-use-case';
import { makeUpdateClientUseCase } from '@/services/factories/make-update-client-use-case';
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

export async function listClient(request: FastifyRequest, reply: FastifyReply) {
  const listClient = makeListClientUseCase();

  const { idUser } = request.params as { idUser: string }

  const clients = await listClient.execute({
    responsibleById: idUser
  })

  return reply.status(200).send(clients);
}

export async function updateClient(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateClientBodySchema = z.object({
    legalName: z.string().optional(),
    tradeName: z.string().optional(),
    type: z.number().optional(),
    protocol: z.string().optional(),
    dataFundation: z.coerce.date().optional(),
    locationAddress: z.string().optional(),
    correspondenceAddress: z.string().optional(),
    nameContact: z.string().optional(),
    numberContact: z.string().optional(),
    isActivated: z.boolean().optional(),
    responsibleById: z.string().optional(),
  })

  const { id } = request.params as { id: string }

  const data = updateClientBodySchema.parse(
    request.body,
  )

  const updateClientUseCase =
    makeUpdateClientUseCase()

  const client = await updateClientUseCase.execute({
    id: id,
    ...data,
  })

  return reply.status(200).send(client)
}