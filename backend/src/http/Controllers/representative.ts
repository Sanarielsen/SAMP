import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeListRepresentativeUseCase } from "@/services/factories/representatives/make-list-use-case";
import { makePostRepresentativeUseCase } from "@/services/factories/representatives/make-post-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";


export async function listRepresentative(request: FastifyRequest, reply: FastifyReply) {
  const listRepresentativeUseCase = makeListRepresentativeUseCase();

  const { id } = request.params as { id: string }
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
    nacionality: z.string().min(1),
    documentRG: z.string().min(8).max(9),
    documentCPF: z.string().min(11).max(12),
    titleJob: z.string().min(1),
    roleJob: z.string().min(1)
  })

  const {
    name,
    nacionality,
    documentRG,
    documentCPF,
    titleJob,
    roleJob
  } = createRepresentativeBodySchema.parse(request.body)

  const postRepresentativeUseCase = makePostRepresentativeUseCase();

  const { id } = request.params as { id: string }

  try {
    await postRepresentativeUseCase.execute({
      idClient: id,
      name,
      nacionality,
      documentRG,
      documentCPF,
      titleJob, 
      roleJob,
      createdAt: new Date(Date.now())
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