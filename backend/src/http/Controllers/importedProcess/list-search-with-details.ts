import { FastifyRequest, FastifyReply } from 'fastify'

import { makeListImportProcessesAsAOption } from '@/services/factories/imported-process/make-list-imported-processes-as-a-option';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';
import { makeListImportProcessesDetailsWithSearchUseCase } from '@/services/factories/imported-process/make-list-details-with-search';


export async function listImportedProcessDetailsWithSearch(request: FastifyRequest, reply: FastifyReply) {
  const { search } = request.query as { search: string }

  const userLoggedId = request.user.sub

  try {
    const useCase = makeListImportProcessesDetailsWithSearchUseCase();

    const importedProcesses = await useCase.execute(search, userLoggedId)

    return reply.status(200).send(importedProcesses);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}