import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makePostPublicationTransferImportedProcess } from '@/services/factories/publication/make-post-transfer-imported-process'


export async function postPublicationTransferImportedProcess(request: FastifyRequest, reply: FastifyReply) {
  const postBodySchema = z.object({
    clientId: z.string(),
    processHistoricId: z.string(),
    importedProcessId: z.string()
  })

  const resultBody = postBodySchema.parse(request.body)

  try {
    const useCase = makePostPublicationTransferImportedProcess();

    const result = await useCase.execute(resultBody)

    return reply.status(201).send(result);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}