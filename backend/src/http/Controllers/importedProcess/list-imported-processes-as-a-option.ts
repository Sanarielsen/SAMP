import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListImportProcessesAsAOption } from '@/services/factories/imported-process/make-list-imported-processes-as-a-option';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';


export async function listImportedProcessesAsAOption(request: FastifyRequest, reply: FastifyReply) {
  const { id: processHistoricId } = request.params as { id: string }
  const { q: search } = request.query as { q?: string }

  try {
    const useCase = makeListImportProcessesAsAOption();

    const importedProcesses = await useCase.execute(processHistoricId, search)

    return reply.status(200).send(importedProcesses);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}