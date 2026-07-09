import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListImportProcessesAsAOption } from '@/services/factories/process-Imported/make-list-imported-processes-as-a-option';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';


export async function listImportedProcessesAsAOption(request: FastifyRequest, reply: FastifyReply) {
  const { id: processHistoricId } = request.params as { id: string }

  try {
    const useCase = makeListImportProcessesAsAOption();

    const importedProcesses = await useCase.execute(processHistoricId)

    return reply.status(200).send(importedProcesses);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}