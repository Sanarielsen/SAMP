import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";
import { 
  z, 
  ZodError
} from "zod";

import { makePostRepresentativeUseCase } from "@/services/factories/representatives/make-post-use-case";


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