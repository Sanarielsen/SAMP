import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeGetRepresentativeUseCase } from "@/services/factories/representatives/make-get-use-case";
import { makeListRepresentativeUseCase } from "@/services/factories/representatives/make-list-use-case";
import { makePostRepresentativeUseCase } from "@/services/factories/representatives/make-post-use-case";
import { makeUpdateRepresentativeUseCase } from "@/services/factories/representatives/make-update-use-case";
import { makeDeleteRepresentativeUseCase } from "@/services/factories/representatives/make-delete-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";


export async function listRepresentative(request: FastifyRequest, reply: FastifyReply) {
  const listRepresentativeUseCase = makeListRepresentativeUseCase();

  const id = request.user.sub;

  const { search } = request.query as { search: string }

  try {
    const representatives = await listRepresentativeUseCase.execute({
      idUser: id,
      search
    })

    return reply.status(200).send(representatives);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({
        message: err.message,
      })
    }
  }
}

export async function postRepresentative(request: FastifyRequest, reply: FastifyReply) {

  const createRepresentativeBodySchema = z.object({
    name: z.string().min(1),
    nationality: z.string().min(1),
    documentRG: z.string().min(8).max(9),
    documentCPF: z.string().min(11).max(12),
    titleJob: z.string().min(1),
    roleJob: z.string().min(1),
    clientId: z.string().min(1)
  })

  const {
    name,
    nationality,
    documentRG,
    documentCPF,
    titleJob,
    roleJob,
    clientId
  } = createRepresentativeBodySchema.parse(request.body)

  const postRepresentativeUseCase = makePostRepresentativeUseCase();

  try {
    await postRepresentativeUseCase.execute({
      clientId,
      name,
      nationality,
      documentRG,
      documentCPF,
      titleJob, 
      roleJob
    })
  } catch (err) {
    if (err instanceof ZodError) {
      return reply.status(400).send({
        message: 'Validation error.',
        issues: err.flatten().fieldErrors,
      })
    }

    throw err;
  }
}

export async function getRepresentative(request: FastifyRequest, reply: FastifyReply) {
  const getRepresentative = makeGetRepresentativeUseCase();

  const { id } = 
    request.params as { id: string }

  const representative = await getRepresentative.execute({
    id
  })

  return reply.status(200).send(representative);
}

export async function updateRepresentative(request: FastifyRequest, reply: FastifyReply) {
  const updateRepresentativeBodySchema = z.object({
    name: z.string().min(1).optional(),
    nationality: z.string().min(1).optional(),
    documentRG: z.string().min(8).max(9).optional(),
    documentCPF: z.string().min(11).max(12).optional(),
    titleJob: z.string().min(1).optional(),
    roleJob: z.string().min(1).optional()
  })

  const { clientId, idRepresentative } = request.params as { clientId: string, idRepresentative: string }

  const data = updateRepresentativeBodySchema.parse(
    request.body,
  )

  const updateRepresentativeUseCase =
      makeUpdateRepresentativeUseCase()

  const representative = await updateRepresentativeUseCase.execute({
    id: idRepresentative,
    clientId,
    ...data,
  })

  return reply.status(200).send(representative)
}

export async function deleteRepresentative(request: FastifyRequest, reply: FastifyReply) {

  const paramsDeleteSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsDeleteSchema.parse(request.params)

  const deleteClientUseCase = makeDeleteRepresentativeUseCase();

  await deleteClientUseCase.execute({ id })

  return reply.status(204).send()
}